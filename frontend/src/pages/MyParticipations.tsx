import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { participationService, Participation } from '../services/gameService';
import { authService } from '../services/authService';

const MyParticipations: React.FC = () => {
  const [participations, setParticipations] = useState<Participation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = authService.getStoredUser();

  useEffect(() => {
    if (user) {
      loadParticipations();
    }
  }, [user]);

  const loadParticipations = async () => {
    try {
      const data = await participationService.getUserParticipations(user!.id);
      setParticipations(data);
    } catch (err) {
      setError('Erreur lors du chargement des participations');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <h1>Mes Participations</h1>

      {participations.length === 0 ? (
        <div className="card">
          <p>Vous n'avez participé à aucun jeu pour le moment.</p>
          <Link to="/games">
            <button className="primary" style={{ marginTop: '1rem' }}>
              Découvrir les jeux
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid">
          {participations.map((participation) => (
            <div key={participation.id} className="card">
              <h3>{participation.game?.title}</h3>
              <p>{participation.game?.description}</p>

              <div style={{ marginTop: '1rem' }}>
                <span className={`status ${participation.status.replace('_', '-')}`}>
                  {participation.status === 'in_progress' ? 'En cours' : 
                   participation.status === 'completed' ? 'Terminé' : 'Abandonné'}
                </span>
              </div>

              <div className="score" style={{ fontSize: '1.5rem', margin: '1rem 0' }}>
                {participation.score} points
              </div>

              <div style={{ fontSize: '0.875rem', color: '#7f8c8d' }}>
                <div>Démarré le: {new Date(participation.startedAt).toLocaleDateString()}</div>
                {participation.completedAt && (
                  <div>Terminé le: {new Date(participation.completedAt).toLocaleDateString()}</div>
                )}
                <div style={{ marginTop: '0.5rem' }}>
                  Réponses correctes: {participation.answers?.filter(a => a.isCorrect).length || 0}
                  {' / '}
                  {participation.game?.riddles?.length || 0}
                </div>
              </div>

              {participation.status === 'in_progress' && (
                <Link to={`/play/${participation.id}`}>
                  <button className="primary" style={{ marginTop: '1rem', width: '100%' }}>
                    Continuer
                  </button>
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyParticipations;
