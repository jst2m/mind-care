import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";
import backgroundImage from "../assets/HomePage.png";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      {/* Bannière avec image de fond */}
      <div
        className="banner"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <h1 className="banner-title">Bienvenue sur MindCare</h1>
      </div>

      {/* Introduction */}
      <section className="intro">
        <h2>Exercez votre profession</h2>
        <p>
          Sur MindCare, explorez votre espace professionnel afin de gérer vos
          rendez-vous, discuter avec vos patients.
        </p>
      </section>

      {/* Cartes de services cliquables */}
      <section className="card-container">
        <div className="card" onClick={() => navigate("/rendez-vous")}>
          <h3>Rendez-vous</h3>
          <p>Accédez à votre planning facilement</p>
        </div>
        <div className="card" onClick={() => navigate("/messages")}>
          <h3>Messages</h3>
          <p>Consultez vos messages en un clic</p>
        </div>
        <div className="card" onClick={() => navigate("/profil")}>
          <h3>Profil</h3>
          <p>Modifiez votre profil ici</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
