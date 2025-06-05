import React from 'react';
import './HomePage.css';
import backgroundImage from './assets/HomePage.png';

const HomePage: React.FC = () => {
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
        <h2>Prenez soin de votre santé mentale</h2>
        <p>
          Sur mindCare, explorez des exercices de relaxation, tenez votre journal émotionnel
          et suivez votre bien-être au quotidien.
        </p>
      </section>

      {/* Cartes de services */}
      <section className="card-container">
        <div className="card">
          <h3>Exercice</h3>
          <p>Respiration, méditation, détente…</p>
        </div>
        <div className="card">
          <h3>Journal</h3>
          <p>Écrivez vos ressentis au quotidien</p>
        </div>
        <div className="card">
          <h3>Professionnels</h3>
          <p>Rencontrez un praticien bienveillant</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
