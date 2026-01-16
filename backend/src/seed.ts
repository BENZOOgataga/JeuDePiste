import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Démarrage du seed de la base de données...');

  // Créer un admin
  const hashedAdminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@jeudepiste.com' },
    update: {},
    create: {
      email: 'admin@jeudepiste.com',
      username: 'admin',
      password: hashedAdminPassword,
      role: 'ADMIN'
    }
  });

  console.log('✅ Admin créé:', admin.username);

  // Créer des participants
  const hashedUserPassword = await bcrypt.hash('user123', 10);
  const user1 = await prisma.user.upsert({
    where: { email: 'user1@example.com' },
    update: {},
    create: {
      email: 'user1@example.com',
      username: 'joueur1',
      password: hashedUserPassword,
      role: 'PARTICIPANT'
    }
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'user2@example.com' },
    update: {},
    create: {
      email: 'user2@example.com',
      username: 'joueur2',
      password: hashedUserPassword,
      role: 'PARTICIPANT'
    }
  });

  console.log('✅ Participants créés');

  // Créer un jeu de piste exemple
  const game = await prisma.game.create({
    data: {
      title: 'Découverte de Paris',
      description: 'Un parcours touristique dans les lieux emblématiques de Paris',
      isActive: true,
      creatorId: admin.id
    }
  });

  console.log('✅ Jeu créé:', game.title);

  // Créer des énigmes
  const riddles = await prisma.riddle.createMany({
    data: [
      {
        gameId: game.id,
        title: 'La Dame de Fer',
        question: 'Quel est le nom de ce monument emblématique de Paris, construit pour l\'Exposition universelle de 1889 ?',
        answer: 'Tour Eiffel',
        hint: 'Elle mesure 330 mètres de haut',
        latitude: 48.8584,
        longitude: 2.2945,
        radius: 200,
        order: 1,
        points: 10
      },
      {
        gameId: game.id,
        title: 'Le Musée le plus visité',
        question: 'Quel musée parisien abrite la Joconde ?',
        answer: 'Louvre',
        hint: 'C\'est une ancienne résidence royale',
        latitude: 48.8606,
        longitude: 2.3376,
        radius: 150,
        order: 2,
        points: 15
      },
      {
        gameId: game.id,
        title: 'La Cathédrale',
        question: 'Quelle célèbre cathédrale gothique se trouve sur l\'île de la Cité ?',
        answer: 'Notre-Dame',
        hint: 'Victor Hugo lui a consacré un roman',
        latitude: 48.8530,
        longitude: 2.3499,
        radius: 100,
        order: 3,
        points: 20
      }
    ]
  });

  console.log('✅ Énigmes créées');

  console.log('✨ Seed terminé avec succès !');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
