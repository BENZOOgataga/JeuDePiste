import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gameService, Game } from '../services/gameService';

const AdminDashboard: React.FC = () => {
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

  const handleToggleActive = async (gameId: string, isActive: boolean) => {
    try {
      await gameService.updateGame(gameId, { isActive: !isActive });
      loadGames();
    } catch (err) {
      alert('Erreur lors de la mise à jour du jeu');
    }
  };

  const handleDeleteGame = async (gameId: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce jeu ?')) return;

    try {
      await gameService.deleteGame(gameId);
      loadGames();
    } catch (err) {
      alert('Erreur lors de la suppression du jeu');
    }
  };

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Tableau de Bord Administrateur</h1>
        <Link to="/admin/create-game">
          <button className="primary">+ Créer un Jeu</button>
        </Link>
      </div>

      <div className="card">
        <h2>Statistiques</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3498db' }}>{games.length}</div>
            <div>Jeux Total</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2ecc71' }}>
              {games.filter(g => g.isActive).length}
            </div>
            <div>Jeux Actifs</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#e74c3c' }}>
              {games.reduce((sum, g) => sum + (g._count?.participations || 0), 0)}
            </div>
            <div>Participations Total</div>
          </div>
        </div>
      </div>

      <h2>Gestion des Jeux</h2>
      {games.length === 0 ? (
        <div className="card">
          <p>Aucun jeu créé. Créez votre premier jeu !</p>
        </div>
      ) : (
        <div className="grid">
          {games.map((game) => (
            <div key={game.id} className="card">
              <h3>{game.title}</h3>
              <p>{game.description || 'Aucune description'}</p>

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

              <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                <button 
                  className={game.isActive ? 'secondary' : 'primary'}
                  onClick={() => handleToggleActive(game.id, game.isActive)}
                  style={{ flex: 1 }}
                >
                  {game.isActive ? 'Désactiver' : 'Activer'}
                </button>
                <button 
                  className="danger"
                  onClick={() => handleDeleteGame(game.id)}
                  style={{ flex: 1 }}
                >
                  Supprimer
                </button>
              </div>

              <Link to={`/games/${game.id}`}>
                <button className="secondary" style={{ marginTop: '0.5rem', width: '100%' }}>
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

export default AdminDashboard;
