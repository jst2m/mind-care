import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          mind<span className="logo-accent">Care</span>
        </div>
        <nav className="navbar-links" aria-label="Navigation principale">
          <Link to="/">Accueil</Link>
          <Link to="/rendez-vous">Rendez-vous</Link>
          <Link to="/messages">Messages</Link>
          <Link to="/profil">Profil</Link>
          <Link to="/auth">Authentification</Link> {/* ✅ nouveau lien */}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
