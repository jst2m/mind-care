import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/auth');
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* ✅ Logo cliquable vers la page d'accueil */}
        <Link to="/" className="navbar-logo">
          mind<span className="logo-accent">Care</span>
        </Link>

        <nav className="navbar-links" aria-label="Navigation principale">
          <Link to="/">Accueil</Link>
          <Link to="/rendez-vous">Rendez-vous</Link>
          <Link to="/messages">Messages</Link>
          <Link to="/profil">Profil</Link>

          {!isLoggedIn ? (
            <Link to="/auth">Authentification</Link>
          ) : (
            <button className="logout-button" onClick={handleLogout}>
              Déconnexion
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
