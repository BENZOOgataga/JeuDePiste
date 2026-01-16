import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { participationService, riddleService, Participation, Riddle } from '../services/gameService';
import { geolocationService, LocationCoords } from '../services/geolocationService';
import Map from '../components/Map';

const PlayGame: React.FC = () => {
  const { participationId } = useParams<{ participationId: string }>();
  const navigate = useNavigate();
  const [participation, setParticipation] = useState<Participation | null>(null);
  const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [userLocation, setUserLocation] = useState<LocationCoords | null>(null);
  const [feedback, setFeedback] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [locationError, setLocationError] = useState('');

  useEffect(() => {
    loadParticipation();
    getCurrentLocation();
  }, [participationId]);

  const loadParticipation = async () => {
    try {
      const data = await participationService.getParticipationById(participationId!);
      setParticipation(data);
      
      // Déterminer l'énigme actuelle en fonction des réponses
      const answeredRiddles = data.answers?.map(a => a.riddleId) || [];
      const nextRiddleIndex = data.game?.riddles?.findIndex(
        r => !answeredRiddles.includes(r.id)
      ) || 0;
      setCurrentRiddleIndex(nextRiddleIndex >= 0 ? nextRiddleIndex : data.game?.riddles?.length || 0);
    } catch (err) {
      setError('Erreur lors du chargement de la participation');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = async () => {
    try {
      const coords = await geolocationService.getCurrentPosition();
      setUserLocation(coords);
      setLocationError('');
    } catch (err: any) {
      setLocationError('Impossible d\'obtenir votre position. Veuillez activer la géolocalisation.');
      console.error(err);
    }
  };

  const handleSubmitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!participation) return;

    const currentRiddle = participation.game?.riddles?.[currentRiddleIndex];
    if (!currentRiddle) return;

    // Mode test/développement : toujours utiliser les coordonnées de l'énigme
    const latitude = currentRiddle.latitude;
    const longitude = currentRiddle.longitude;

    // En mode test, on affiche juste la distance sans bloquer
    if (userLocation) {
      const distance = geolocationService.calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        currentRiddle.latitude,
        currentRiddle.longitude
      );
      console.log(`Distance: ${Math.round(distance)}m (Rayon autorisé: ${currentRiddle.radius}m)`);
      // Note: En production, décommenter le bloc ci-dessous pour bloquer si trop loin
      /*
      if (distance > currentRiddle.radius) {
        setFeedback({
          isCorrect: false,
          message: `Vous êtes trop loin ! Distance: ${Math.round(distance)}m (max: ${currentRiddle.radius}m)`,
          isLocationValid: false
        });
        return;
      }
      */
    }

    setSubmitting(true);
    setFeedback(null);

    try {
      const result = await riddleService.validateAnswer(currentRiddle.id, {
        answer,
        latitude,
        longitude,
        participationId
      });

      setFeedback(result);

      if (result.isCorrect) {
        setAnswer('');
        setTimeout(() => {
          if (currentRiddleIndex < (participation.game?.riddles?.length || 0) - 1) {
            setCurrentRiddleIndex(currentRiddleIndex + 1);
            setFeedback(null);
            loadParticipation(); // Recharger pour mettre à jour le score
          } else {
            // Compléter la participation et rediriger
            participationService.completeParticipation(participationId!);
            navigate(`/congratulations/${participationId}`);
          }
        }, 2000);
      }
    } catch (err) {
      setError('Erreur lors de la validation de la réponse');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!participation) return <div>Participation non trouvée</div>;

  const riddles = participation.game?.riddles?.sort((a, b) => a.order - b.order) || [];
  const currentRiddle = riddles[currentRiddleIndex];
  const isCompleted = currentRiddleIndex >= riddles.length;

  // Rediriger vers la page de félicitations si complété
  if (isCompleted) {
    navigate(`/congratulations/${participationId}`);
    return null;
  }

  const mapMarkers = currentRiddle && userLocation ? [
    {
      position: [currentRiddle.latitude, currentRiddle.longitude] as [number, number],
      title: currentRiddle.title,
      description: 'Emplacement de l\'énigme',
      radius: currentRiddle.radius
    },
    {
      position: [userLocation.latitude, userLocation.longitude] as [number, number],
      title: 'Votre position',
      description: 'Vous êtes ici'
    }
  ] : [];

  const distance = userLocation && currentRiddle
    ? geolocationService.calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        currentRiddle.latitude,
        currentRiddle.longitude
      )
    : null;

  return (
    <div>
      <div className="card">
        <h1>{participation.game?.title}</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <strong>Score:</strong> {participation.score} points
          </div>
          <div>
            <strong>Énigme:</strong> {currentRiddleIndex + 1} / {riddles.length}
          </div>
        </div>
      </div>

      {currentRiddle && (
        <>
          <div className="card">
            <h2>Énigme {currentRiddle.order}: {currentRiddle.title}</h2>
            <p style={{ fontSize: '1.1rem', marginTop: '1rem' }}>{currentRiddle.question}</p>
            
            {distance !== null && (
              <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
                <strong>Distance:</strong> {Math.round(distance)}m 
                {distance > currentRiddle.radius && (
                  <span style={{ color: '#e74c3c', marginLeft: '10px' }}>
                    (Trop loin - max: {currentRiddle.radius}m)
                  </span>
                )}
                {distance <= currentRiddle.radius && (
                  <span style={{ color: '#2ecc71', marginLeft: '10px' }}>
                    ✓ À portée
                  </span>
                )}
              </div>
            )}

            {locationError && (
              <div className="error" style={{ marginTop: '1rem' }}>
                {locationError}
                <button 
                  onClick={getCurrentLocation} 
                  className="secondary" 
                  style={{ marginLeft: '10px' }}
                >
                  Réessayer
                </button>
              </div>
            )}

            <form onSubmit={handleSubmitAnswer} style={{ marginTop: '1.5rem' }}>
              <div className="form-group">
                <label htmlFor="answer">Votre réponse:</label>
                <input
                  type="text"
                  id="answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  required
                  placeholder="Tapez votre réponse ici"
                />
              </div>

              <button 
                type="submit" 
                className="primary" 
                style={{ width: '100%' }}
                disabled={submitting}
              >
                {submitting ? 'Vérification...' : 'Valider la réponse'}
              </button>
              
              {(!userLocation || distance === null || (distance && distance > currentRiddle.radius)) && (
                <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#e67e22' }}>
                  ⚠️ Mode test : validation sans vérification GPS
                </div>
              )}
            </form>

            {feedback && (
              <div style={{ 
                marginTop: '1rem', 
                padding: '1rem', 
                backgroundColor: feedback.isCorrect ? '#d4edda' : '#f8d7da',
                color: feedback.isCorrect ? '#155724' : '#721c24',
                borderRadius: '4px'
              }}>
                {feedback.message || (feedback.isCorrect ? '✓ Bonne réponse !' : '✗ Mauvaise réponse')}
                {feedback.hint && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <strong>Indice:</strong> {feedback.hint}
                  </div>
                )}
                {feedback.points > 0 && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <strong>+{feedback.points} points</strong>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="card">
            <h3>Carte</h3>
            {userLocation ? (
              <Map 
                center={[currentRiddle.latitude, currentRiddle.longitude]}
                markers={mapMarkers}
                zoom={15}
                height="400px"
              />
            ) : (
              <p>Chargement de votre position...</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PlayGame;
