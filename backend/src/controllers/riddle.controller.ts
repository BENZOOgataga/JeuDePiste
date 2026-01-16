import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.middleware';
import { validationResult } from 'express-validator';

const prisma = new PrismaClient();

// Fonction pour calculer la distance entre deux points GPS (formule de Haversine)
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // Rayon de la Terre en mètres
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance en mètres
}

export const getRiddlesByGame = async (req: AuthRequest, res: Response) => {
  try {
    const { gameId } = req.params;

    const riddles = await prisma.riddle.findMany({
      where: { gameId },
      orderBy: { order: 'asc' }
    });

    res.json(riddles);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des énigmes' });
  }
};

export const getRiddleById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const riddle = await prisma.riddle.findUnique({
      where: { id },
      include: {
        game: {
          select: {
            id: true,
            title: true
          }
        }
      }
    });

    if (!riddle) {
      return res.status(404).json({ error: 'Énigme non trouvée' });
    }

    res.json(riddle);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'énigme' });
  }
};

export const createRiddle = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { gameId, title, question, answer, hint, latitude, longitude, radius, order, points } = req.body;

    const riddle = await prisma.riddle.create({
      data: {
        gameId,
        title,
        question,
        answer,
        hint,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        radius: radius || 100,
        order: parseInt(order),
        points: points || 10
      }
    });

    res.status(201).json(riddle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la création de l\'énigme' });
  }
};

export const updateRiddle = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, question, answer, hint, latitude, longitude, radius, order, points } = req.body;

    const riddle = await prisma.riddle.update({
      where: { id },
      data: {
        title,
        question,
        answer,
        hint,
        latitude: latitude ? parseFloat(latitude) : undefined,
        longitude: longitude ? parseFloat(longitude) : undefined,
        radius,
        order: order ? parseInt(order) : undefined,
        points
      }
    });

    res.json(riddle);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'énigme' });
  }
};

export const deleteRiddle = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.riddle.delete({
      where: { id }
    });

    res.json({ message: 'Énigme supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'énigme' });
  }
};

export const validateAnswer = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { answer, latitude, longitude, participationId } = req.body;

    const riddle = await prisma.riddle.findUnique({
      where: { id }
    });

    if (!riddle) {
      return res.status(404).json({ error: 'Énigme non trouvée' });
    }

    // Vérifier la réponse (insensible à la casse)
    const isAnswerCorrect = answer.toLowerCase().trim() === riddle.answer.toLowerCase().trim();

    // Vérifier la géolocalisation si des coordonnées sont fournies
    let isLocationValid = true;
    let distance = null;

    if (latitude && longitude) {
      distance = calculateDistance(riddle.latitude, riddle.longitude, latitude, longitude);
      isLocationValid = distance <= riddle.radius;
    }

    const isCorrect = isAnswerCorrect && isLocationValid;

    // Enregistrer la réponse
    const answerRecord = await prisma.answer.create({
      data: {
        participationId,
        riddleId: id,
        answer,
        isCorrect,
        latitude: latitude || null,
        longitude: longitude || null
      }
    });

    // Si correct, mettre à jour le score de la participation
    if (isCorrect) {
      await prisma.participation.update({
        where: { id: participationId },
        data: {
          score: {
            increment: riddle.points
          }
        }
      });
    }

    res.json({
      isCorrect,
      isAnswerCorrect,
      isLocationValid,
      distance,
      points: isCorrect ? riddle.points : 0,
      hint: !isAnswerCorrect && riddle.hint ? riddle.hint : null
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la validation de la réponse' });
  }
};
