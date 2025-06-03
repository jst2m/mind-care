import './navbar.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">mind<span className="logo-green">Care</span></div>
        <nav className="navbar-links">
          <a href="#">Accueil</a>
          <a href="#">Rendez-vous</a>
          <a href="#">Journal</a>
          <a href="#">Exercices</a>
          <a href="ProfilPro.tsx">Profil</a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
