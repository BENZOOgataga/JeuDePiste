import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { participationService, Participation } from '../services/gameService';

const Congratulations: React.FC = () => {
  const { participationId } = useParams<{ participationId: string }>();
  const navigate = useNavigate();
  const [participation, setParticipation] = useState<Participation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadParticipation();
  }, [participationId]);

  const loadParticipation = async () => {
    try {
      const data = await participationService.getParticipationById(participationId!);
      setParticipation(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Chargement...</div>;
  if (!participation) return <div>Participation non trouvée</div>;

  const totalRiddles = participation.game?.riddles?.length || 0;
  const answeredRiddles = participation.answers?.length || 0;

  return (
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem' }}>
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🎉</div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#2ecc71' }}>
          Félicitations !
        </h1>
        <h2 style={{ marginBottom: '2rem', color: '#555' }}>
          Vous avez terminé le jeu !
        </h2>
        
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '2rem', 
          borderRadius: '8px',
          marginBottom: '2rem'
        }}>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#3498db', marginBottom: '0.5rem' }}>
            {participation.score}
          </div>
          <div style={{ fontSize: '1.2rem', color: '#666' }}>points</div>
        </div>

        <div style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
          <p>
            Vous avez résolu <strong>{answeredRiddles}</strong> énigme(s) sur <strong>{totalRiddles}</strong>
          </p>
          <p style={{ marginTop: '1rem' }}>
            Jeu: <strong>{participation.game?.title}</strong>
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            onClick={() => navigate('/games')}
            className="primary"
            style={{ minWidth: '150px' }}
          >
            Découvrir d'autres jeux
          </button>
          <button 
            onClick={() => navigate('/my-participations')}
            className="secondary"
            style={{ minWidth: '150px' }}
          >
            Mes participations
          </button>
        </div>

        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#fff3cd', borderRadius: '4px' }}>
          <p style={{ margin: 0, color: '#856404' }}>
            💡 <strong>Astuce:</strong> Partagez votre score avec vos amis et défiez-les !
          </p>
        </div>
      </div>
    </div>
  );
};

export default Congratulations;
