import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.login({ email, password });
      onLogin();
      navigate('/games');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erreur lors de la connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Connexion</h2>
      
      {error && <div className="error" style={{ marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
      
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="primary" style={{ width: '100%' }} disabled={loading}>
        {loading ? 'Connexion...' : 'Se connecter'}
      </button>

      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        Pas encore de compte ? <Link to="/register">S'inscrire</Link>
      </p>

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
        <h4>Comptes de test :</h4>
        <p><strong>Admin:</strong> admin@jeudepiste.com / admin123</p>
        <p><strong>Utilisateur:</strong> user1@example.com / user123</p>
      </div>
    </form>
  );
};

export default Login;
