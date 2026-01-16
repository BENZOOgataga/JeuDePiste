import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gameService, participationService, Game } from '../services/gameService';
import { authService } from '../services/authService';
import Map from '../components/Map';

const GameDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [starting, setStarting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadGame = async () => {
    try {
      const data = await gameService.getGameById(id!);
      setGame(data);
    } catch (err) {
      setError('Erreur lors du chargement du jeu');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartGame = async () => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }

    setStarting(true);
    try {
      const participation = await participationService.startParticipation(id!);
      navigate(`/play/${participation.id}`);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erreur lors du démarrage du jeu');
    } finally {
      setStarting(false);
    }
  };

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!game) return <div>Jeu non trouvé</div>;

  const mapMarkers = game.riddles?.map((riddle) => ({
    position: [riddle.latitude, riddle.longitude] as [number, number],
    title: riddle.title,
    description: `Énigme ${riddle.order}`,
    radius: riddle.radius
  })) || [];

  const centerPosition: [number, number] = mapMarkers.length > 0 
    ? mapMarkers[0].position 
    : [48.8566, 2.3522]; // Paris par défaut

  return (
    <div>
      <div className="card">
        <h1>{game.title}</h1>
        <p>{game.description}</p>
        
        <div style={{ marginTop: '1rem' }}>
          <span className={`badge ${game.isActive ? 'active' : 'inactive'}`}>
            {game.isActive ? 'Actif' : 'Inactif'}
          </span>
          <span style={{ marginLeft: '10px', color: '#7f8c8d' }}>
            Créé par: {game.creator.username}
          </span>
        </div>

        {game.isActive && (
          <button 
            className="primary" 
            style={{ marginTop: '1.5rem', width: '100%' }}
            onClick={handleStartGame}
            disabled={starting}
          >
            {starting ? 'Démarrage...' : 'Commencer ce jeu'}
          </button>
        )}
      </div>

      <div className="card">
        <h2>Carte du parcours</h2>
        <Map 
          center={centerPosition}
          markers={mapMarkers}
          zoom={12}
          height="500px"
        />
      </div>

      <div className="card">
        <h2>Énigmes ({game.riddles?.length || 0})</h2>
        {game.riddles && game.riddles.length > 0 ? (
          <div>
            {game.riddles.sort((a, b) => a.order - b.order).map((riddle) => (
              <div key={riddle.id} style={{ 
                padding: '1rem', 
                marginBottom: '1rem', 
                backgroundColor: '#f8f9fa', 
                borderRadius: '4px' 
              }}>
                <h3>Énigme {riddle.order}: {riddle.title}</h3>
                <p style={{ color: '#7f8c8d' }}>Points: {riddle.points}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Aucune énigme pour le moment.</p>
        )}
      </div>
    </div>
  );
};

export default GameDetail;
