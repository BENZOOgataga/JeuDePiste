import api from './api';

export interface Game {
  id: string;
  title: string;
  description?: string;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  creator: {
    id: string;
    username: string;
  };
  riddles?: Riddle[];
  _count?: {
    participations: number;
  };
}

export interface Riddle {
  id: string;
  title: string;
  question: string;
  answer: string;
  hint?: string;
  latitude: number;
  longitude: number;
  radius: number;
  order: number;
  points: number;
  gameId: string;
}

export interface Participation {
  id: string;
  status: string;
  score: number;
  startedAt: string;
  completedAt?: string;
  userId: string;
  gameId: string;
  game?: Game;
  answers?: Answer[];
}

export interface Answer {
  id: string;
  answer: string;
  isCorrect: boolean;
  latitude?: number;
  longitude?: number;
  answeredAt: string;
  riddleId: string;
  riddle?: Riddle;
}

export const gameService = {
  getAllGames: async (): Promise<Game[]> => {
    const response = await api.get('/games');
    return response.data;
  },

  getGameById: async (id: string): Promise<Game> => {
    const response = await api.get(`/games/${id}`);
    return response.data;
  },

  createGame: async (data: Partial<Game>): Promise<Game> => {
    const response = await api.post('/games', data);
    return response.data;
  },

  updateGame: async (id: string, data: Partial<Game>): Promise<Game> => {
    const response = await api.put(`/games/${id}`, data);
    return response.data;
  },

  deleteGame: async (id: string): Promise<void> => {
    await api.delete(`/games/${id}`);
  }
};

export const riddleService = {
  getRiddlesByGame: async (gameId: string): Promise<Riddle[]> => {
    const response = await api.get(`/riddles/game/${gameId}`);
    return response.data;
  },

  createRiddle: async (data: Partial<Riddle>): Promise<Riddle> => {
    const response = await api.post('/riddles', data);
    return response.data;
  },

  updateRiddle: async (id: string, data: Partial<Riddle>): Promise<Riddle> => {
    const response = await api.put(`/riddles/${id}`, data);
    return response.data;
  },

  deleteRiddle: async (id: string): Promise<void> => {
    await api.delete(`/riddles/${id}`);
  },

  validateAnswer: async (riddleId: string, data: any) => {
    const response = await api.post(`/riddles/${riddleId}/validate`, data);
    return response.data;
  }
};

export const participationService = {
  getUserParticipations: async (userId: string): Promise<Participation[]> => {
    const response = await api.get(`/participations/user/${userId}`);
    return response.data;
  },

  getParticipationById: async (id: string): Promise<Participation> => {
    const response = await api.get(`/participations/${id}`);
    return response.data;
  },

  startParticipation: async (gameId: string): Promise<Participation> => {
    const response = await api.post('/participations', { gameId });
    return response.data;
  },

  completeParticipation: async (id: string): Promise<Participation> => {
    const response = await api.put(`/participations/${id}/complete`, {});
    return response.data;
  }
};
