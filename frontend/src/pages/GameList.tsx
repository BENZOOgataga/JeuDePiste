import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gameService, Game } from '../services/gameService';

const GameList: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    try {
      const data = await gameService.getAllGames();
      setGames(data);
    } catch (err) {
      setError('Erreur lors du chargement des jeux');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <h1>Jeux de Piste Disponibles</h1>
      
      {games.length === 0 ? (
        <div className="card">
          <p>Aucun jeu disponible pour le moment.</p>
        </div>
      ) : (
        <div className="grid">
          {games.map((game) => (
            <div key={game.id} className="card">
              <h3>{game.title}</h3>
              <p>{game.description || 'Aucune description disponible'}</p>
              
              <div style={{ marginTop: '1rem' }}>
                <span className={`badge ${game.isActive ? 'active' : 'inactive'}`}>
                  {game.isActive ? 'Actif' : 'Inactif'}
                </span>
                <span style={{ marginLeft: '10px', color: '#7f8c8d' }}>
                  {game.riddles?.length || 0} énigme(s)
                </span>
                <span style={{ marginLeft: '10px', color: '#7f8c8d' }}>
                  {game._count?.participations || 0} participant(s)
                </span>
              </div>

              <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#7f8c8d' }}>
                Créé par: {game.creator.username}
              </div>

              <Link to={`/games/${game.id}`}>
                <button className="primary" style={{ marginTop: '1rem', width: '100%' }}>
                  Voir les détails
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GameList;
