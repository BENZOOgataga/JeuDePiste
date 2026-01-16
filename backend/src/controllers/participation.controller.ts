import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.middleware';

const prisma = new PrismaClient();

export const getUserParticipations = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.params;

    // Vérifier si l'utilisateur consulte ses propres participations
    if (req.user?.id !== userId && req.user?.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Accès refusé' });
    }

    const participations = await prisma.participation.findMany({
      where: { userId },
      include: {
        game: {
          select: {
            id: true,
            title: true,
            description: true,
            riddles: {
              select: {
                id: true
              }
            }
          }
        },
        answers: {
          select: {
            isCorrect: true,
            answeredAt: true
          }
        }
      },
      orderBy: {
        startedAt: 'desc'
      }
    });

    res.json(participations);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des participations' });
  }
};

export const getGameParticipations = async (req: AuthRequest, res: Response) => {
  try {
    const { gameId } = req.params;

    const participations = await prisma.participation.findMany({
      where: { gameId },
      include: {
        user: {
          select: {
            id: true,
            username: true
          }
        },
        answers: {
          select: {
            isCorrect: true,
            answeredAt: true
          }
        }
      },
      orderBy: {
        score: 'desc'
      }
    });

    res.json(participations);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des participations' });
  }
};

export const getParticipationById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const participation = await prisma.participation.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true
          }
        },
        game: {
          include: {
            riddles: {
              orderBy: {
                order: 'asc'
              }
            }
          }
        },
        answers: {
          include: {
            riddle: {
              select: {
                id: true,
                title: true,
                order: true
              }
            }
          }
        }
      }
    });

    if (!participation) {
      return res.status(404).json({ error: 'Participation non trouvée' });
    }

    // Vérifier les permissions
    if (participation.userId !== req.user?.id && req.user?.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Accès refusé' });
    }

    res.json(participation);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de la participation' });
  }
};

export const startParticipation = async (req: AuthRequest, res: Response) => {
  try {
    const { gameId } = req.body;

    // Vérifier si l'utilisateur participe déjà à ce jeu
    const existing = await prisma.participation.findUnique({
      where: {
        userId_gameId: {
          userId: req.user!.id,
          gameId
        }
      }
    });

    if (existing) {
      return res.status(400).json({ error: 'Vous participez déjà à ce jeu' });
    }

    const participation = await prisma.participation.create({
      data: {
        userId: req.user!.id,
        gameId
      },
      include: {
        game: {
          include: {
            riddles: {
              orderBy: {
                order: 'asc'
              }
            }
          }
        }
      }
    });

    res.status(201).json(participation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors du démarrage de la participation' });
  }
};

export const completeParticipation = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const participation = await prisma.participation.findUnique({
      where: { id }
    });

    if (!participation) {
      return res.status(404).json({ error: 'Participation non trouvée' });
    }

    if (participation.userId !== req.user?.id) {
      return res.status(403).json({ error: 'Accès refusé' });
    }

    const updated = await prisma.participation.update({
      where: { id },
      data: {
        status: 'completed',
        completedAt: new Date()
      }
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la complétion de la participation' });
  }
};
