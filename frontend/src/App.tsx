import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import GameList from './pages/GameList';
import GameDetail from './pages/GameDetail';
import PlayGame from './pages/PlayGame';
import AdminDashboard from './pages/AdminDashboard';
import CreateGame from './pages/CreateGame';
import MyParticipations from './pages/MyParticipations';
import Congratulations from './pages/Congratulations';
import { authService } from './services/authService';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
  const [isAdmin, setIsAdmin] = useState(authService.isAdmin());

  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
    setIsAdmin(authService.isAdmin());
  }, []);

  const handleAuthChange = () => {
    setIsAuthenticated(authService.isAuthenticated());
    setIsAdmin(authService.isAdmin());
  };

  return (
    <Router>
      <div className="App">
        <Navbar isAuthenticated={isAuthenticated} isAdmin={isAdmin} onAuthChange={handleAuthChange} />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/login" 
              element={
                isAuthenticated ? <Navigate to="/games" /> : <Login onLogin={handleAuthChange} />
              } 
            />
            <Route 
              path="/register" 
              element={
                isAuthenticated ? <Navigate to="/games" /> : <Register onRegister={handleAuthChange} />
              } 
            />
            <Route path="/games" element={<GameList />} />
            <Route path="/games/:id" element={<GameDetail />} />
            <Route 
              path="/play/:participationId" 
              element={
                isAuthenticated ? <PlayGame /> : <Navigate to="/login" />
              } 
            />
            <Route 
              path="/congratulations/:participationId" 
              element={
                isAuthenticated ? <Congratulations /> : <Navigate to="/login" />
              } 
            />
            <Route 
              path="/my-participations" 
              element={
                isAuthenticated ? <MyParticipations /> : <Navigate to="/login" />
              } 
            />
            <Route 
              path="/admin" 
              element={
                isAuthenticated && isAdmin ? <AdminDashboard /> : <Navigate to="/" />
              } 
            />
            <Route 
              path="/admin/create-game" 
              element={
                isAuthenticated && isAdmin ? <CreateGame /> : <Navigate to="/" />
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
