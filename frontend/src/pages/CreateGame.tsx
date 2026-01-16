import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gameService, riddleService, Game, Riddle } from '../services/gameService';

interface RiddleForm {
  title: string;
  question: string;
  answer: string;
  hint: string;
  latitude: string;
  longitude: string;
  radius: string;
  points: string;
}

const CreateGame: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [riddles, setRiddles] = useState<RiddleForm[]>([{
    title: '',
    question: '',
    answer: '',
    hint: '',
    latitude: '',
    longitude: '',
    radius: '100',
    points: '10'
  }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const addRiddle = () => {
    setRiddles([...riddles, {
      title: '',
      question: '',
      answer: '',
      hint: '',
      latitude: '',
      longitude: '',
      radius: '100',
      points: '10'
    }]);
  };

  const removeRiddle = (index: number) => {
    setRiddles(riddles.filter((_, i) => i !== index));
  };

  const updateRiddle = (index: number, field: keyof RiddleForm, value: string) => {
    const newRiddles = [...riddles];
    newRiddles[index][field] = value;
    setRiddles(newRiddles);
  };

  const getCurrentLocation = async (index: number) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          updateRiddle(index, 'latitude', position.coords.latitude.toString());
          updateRiddle(index, 'longitude', position.coords.longitude.toString());
        },
        (error) => {
          alert('Erreur lors de la récupération de la position');
        }
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Créer le jeu
      const game = await gameService.createGame({
        title,
        description
      });

      // Créer les énigmes
      for (let i = 0; i < riddles.length; i++) {
        const riddle = riddles[i];
        await riddleService.createRiddle({
          gameId: game.id,
          title: riddle.title,
          question: riddle.question,
          answer: riddle.answer,
          hint: riddle.hint || undefined,
          latitude: parseFloat(riddle.latitude),
          longitude: parseFloat(riddle.longitude),
          radius: parseFloat(riddle.radius),
          order: i + 1,
          points: parseInt(riddle.points)
        });
      }

      alert('Jeu créé avec succès !');
      navigate('/admin');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erreur lors de la création du jeu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Créer un Jeu de Piste</h1>

      <form onSubmit={handleSubmit}>
        <div className="card">
          <h2>Informations du Jeu</h2>
          
          {error && <div className="error">{error}</div>}

          <div className="form-group">
            <label htmlFor="title">Titre du jeu *</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2>Énigmes</h2>
            <button type="button" className="primary" onClick={addRiddle}>
              + Ajouter une énigme
            </button>
          </div>

          {riddles.map((riddle, index) => (
            <div key={index} style={{ 
              marginBottom: '2rem', 
              padding: '1.5rem', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '8px' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3>Énigme {index + 1}</h3>
                {riddles.length > 1 && (
                  <button 
                    type="button" 
                    className="danger" 
                    onClick={() => removeRiddle(index)}
                  >
                    Supprimer
                  </button>
                )}
              </div>

              <div className="form-group">
                <label>Titre de l'énigme *</label>
                <input
                  type="text"
                  value={riddle.title}
                  onChange={(e) => updateRiddle(index, 'title', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Question *</label>
                <textarea
                  value={riddle.question}
                  onChange={(e) => updateRiddle(index, 'question', e.target.value)}
                  rows={3}
                  required
                />
              </div>

              <div className="form-group">
                <label>Réponse *</label>
                <input
                  type="text"
                  value={riddle.answer}
                  onChange={(e) => updateRiddle(index, 'answer', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Indice (optionnel)</label>
                <input
                  type="text"
                  value={riddle.hint}
                  onChange={(e) => updateRiddle(index, 'hint', e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Latitude *</label>
                  <input
                    type="number"
                    step="any"
                    value={riddle.latitude}
                    onChange={(e) => updateRiddle(index, 'latitude', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Longitude *</label>
                  <input
                    type="number"
                    step="any"
                    value={riddle.longitude}
                    onChange={(e) => updateRiddle(index, 'longitude', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>&nbsp;</label>
                  <button 
                    type="button" 
                    className="secondary" 
                    onClick={() => getCurrentLocation(index)}
                    style={{ width: '100%' }}
                  >
                    📍 Ma position
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Rayon (mètres) *</label>
                  <input
                    type="number"
                    value={riddle.radius}
                    onChange={(e) => updateRiddle(index, 'radius', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Points *</label>
                  <input
                    type="number"
                    value={riddle.points}
                    onChange={(e) => updateRiddle(index, 'points', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button type="submit" className="primary" style={{ width: '100%' }} disabled={loading}>
          {loading ? 'Création en cours...' : 'Créer le Jeu'}
        </button>
      </form>
    </div>
  );
};

export default CreateGame;
