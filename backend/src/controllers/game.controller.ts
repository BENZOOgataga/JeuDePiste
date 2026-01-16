import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.middleware';
import { validationResult } from 'express-validator';

const prisma = new PrismaClient();

export const getAllGames = async (req: AuthRequest, res: Response) => {
  try {
    const games = await prisma.game.findMany({
      include: {
        creator: {
          select: {
            id: true,
            username: true
          }
        },
        riddles: {
          select: {
            id: true,
            title: true,
            order: true
          },
          orderBy: {
            order: 'asc'
          }
        },
        _count: {
          select: {
            participations: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des jeux' });
  }
};

export const getGameById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const game = await prisma.game.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            id: true,
            username: true
          }
        },
        riddles: {
          orderBy: {
            order: 'asc'
          }
        },
        participations: {
          include: {
            user: {
              select: {
                id: true,
                username: true
              }
            }
          }
        }
      }
    });

    if (!game) {
      return res.status(404).json({ error: 'Jeu non trouvé' });
    }

    res.json(game);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du jeu' });
  }
};

export const createGame = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, startDate, endDate } = req.body;

    const game = await prisma.game.create({
      data: {
        title,
        description,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        creatorId: req.user!.id
      },
      include: {
        creator: {
          select: {
            id: true,
            username: true
          }
        }
      }
    });

    res.status(201).json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la création du jeu' });
  }
};

export const updateGame = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, isActive, startDate, endDate } = req.body;

    const game = await prisma.game.update({
      where: { id },
      data: {
        title,
        description,
        isActive,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined
      },
      include: {
        creator: {
          select: {
            id: true,
            username: true
          }
        }
      }
    });

    res.json(game);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du jeu' });
  }
};

export const deleteGame = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.game.delete({
      where: { id }
    });

    res.json({ message: 'Jeu supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du jeu' });
  }
};
