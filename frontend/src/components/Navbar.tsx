import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

interface NavbarProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  onAuthChange: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, isAdmin, onAuthChange }) => {
  const navigate = useNavigate();
  const user = authService.getStoredUser();

  const handleLogout = () => {
    authService.logout();
    onAuthChange();
    navigate('/');
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/games">Jeux</Link></li>
        
        {isAuthenticated ? (
          <>
            <li><Link to="/my-participations">Mes Participations</Link></li>
            {isAdmin && (
              <>
                <li><Link to="/admin">Administration</Link></li>
                <li><Link to="/admin/create-game">Créer un Jeu</Link></li>
              </>
            )}
            <li style={{ marginLeft: 'auto' }}>
              <span>
                {user?.username} 
                <span className={`badge ${user?.role.toLowerCase()}`} style={{ marginLeft: '10px' }}>
                  {user?.role}
                </span>
              </span>
            </li>
            <li><button onClick={handleLogout}>Déconnexion</button></li>
          </>
        ) : (
          <>
            <li style={{ marginLeft: 'auto' }}><Link to="/login">Connexion</Link></li>
            <li><Link to="/register">Inscription</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
