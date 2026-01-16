import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <div className="card" style={{ marginTop: '2rem', textAlign: 'center' }}>
        <h1>🗺️ Bienvenue sur Jeu de Piste</h1>
        <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
          Découvrez des aventures géolocalisées et résolvez des énigmes passionnantes !
        </p>
      </div>

      <div className="grid" style={{ marginTop: '3rem' }}>
        <div className="card">
          <h3>📍 Géolocalisation</h3>
          <p>
            Utilisez votre position GPS pour découvrir et résoudre des énigmes dans le monde réel.
          </p>
        </div>

        <div className="card">
          <h3>🧩 Énigmes</h3>
          <p>
            Résolvez des énigmes captivantes à chaque étape de votre parcours.
          </p>
        </div>

        <div className="card">
          <h3>🏆 Compétition</h3>
          <p>
            Gagnez des points et comparez vos scores avec d'autres joueurs.
          </p>
        </div>
      </div>

      <div className="card" style={{ marginTop: '3rem', textAlign: 'center' }}>
        <h2>Commencez votre aventure</h2>
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/games">
            <button className="primary">Découvrir les jeux</button>
          </Link>
          <Link to="/register">
            <button className="secondary">S'inscrire</button>
          </Link>
        </div>
      </div>

      <div className="card" style={{ marginTop: '2rem' }}>
        <h2>Comment ça marche ?</h2>
        <ol style={{ lineHeight: '2', marginTop: '1rem' }}>
          <li>Inscrivez-vous et connectez-vous à votre compte</li>
          <li>Parcourez les jeux de piste disponibles</li>
          <li>Démarrez une participation à un jeu</li>
          <li>Rendez-vous aux différents points géolocalisés</li>
          <li>Résolvez les énigmes pour gagner des points</li>
          <li>Complétez le parcours et consultez votre score !</li>
        </ol>
      </div>
    </div>
  );
};

export default Home;
