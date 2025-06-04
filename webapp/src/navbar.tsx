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
          <Link to="/login">Rendez-vous</Link>
          <Link to="/login">Journal</Link>
          <Link to="/login">Exercices</Link>
          <Link to="/profil">Profil</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
