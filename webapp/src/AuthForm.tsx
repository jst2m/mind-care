import { useState } from 'react';
import './AuthForm.css';
import illustration from './assets/Inscription_mindcare.jpg';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isPro, setIsPro] = useState(false);

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [proData, setProData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    dateNaissance: '',
    titreRPCS: '',
    specialite: '',
    statut: 'liberal',
    password: '',
    confirmPassword: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (!isLogin && isPro) {
      setProData(prev => ({ ...prev, [name]: value }));
    } else {
      setUserData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      console.log('Connexion :', userData);
      alert('Connexion réussie');
      return;
    }

    if (!isLogin && isPro) {
      if (proData.password !== proData.confirmPassword) {
        alert('Les mots de passe ne correspondent pas.');
        return;
      }
      console.log('Inscription PRO :', proData);
      alert('Inscription professionnelle réussie.');
    } else {
      if (userData.password !== userData.confirmPassword) {
        alert('Les mots de passe ne correspondent pas.');
        return;
      }
      console.log('Inscription Utilisateur :', userData);
      alert('Inscription utilisateur réussie.');
    }

    setIsLogin(true);
  };

  return (
    <div className="page">
      <img src={illustration} alt="illustration" className="header-img" />
      <div className="auth-card">
        <h2>{isLogin ? 'Connexion' : 'Inscription'}</h2>

        {!isLogin && (
          <div className="toggle-role">
            <button
              type="button"
              className={!isPro ? 'active' : ''}
              onClick={() => setIsPro(false)}
            >
              Utilisateur
            </button>
            <button
              type="button"
              className={isPro ? 'active' : ''}
              onClick={() => setIsPro(true)}
            >
              Professionnel
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Connexion */}
          {isLogin && (
            <>
              <div className="form-group">
                <label>Email :</label>
                <input type="email" name="email" value={userData.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Mot de passe :</label>
                <input type="password" name="password" value={userData.password} onChange={handleChange} required />
              </div>
            </>
          )}

          {/* Inscription utilisateur */}
          {!isLogin && !isPro && (
            <>
              <div className="form-group">
                <label>Nom complet :</label>
                <input type="text" name="name" value={userData.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Email :</label>
                <input type="email" name="email" value={userData.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Mot de passe :</label>
                <input type="password" name="password" value={userData.password} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Confirmer le mot de passe :</label>
                <input type="password" name="confirmPassword" value={userData.confirmPassword} onChange={handleChange} required />
              </div>
            </>
          )}

          {/* Inscription professionnel */}
          {!isLogin && isPro && (
            <>
              <div className="form-group">
                <label>Nom :</label>
                <input type="text" name="nom" value={proData.nom} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Prénom :</label>
                <input type="text" name="prenom" value={proData.prenom} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Email :</label>
                <input type="email" name="email" value={proData.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Téléphone :</label>
                <input type="tel" name="telephone" value={proData.telephone} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Date de naissance :</label>
                <input type="date" name="dateNaissance" value={proData.dateNaissance} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Titre RPCS :</label>
                <input type="text" name="titreRPCS" value={proData.titreRPCS} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Spécialité :</label>
                <select name="specialite" value={proData.specialite} onChange={handleChange} required>
                  <option value="">-- Choisir une spécialité --</option>
                  <option value="Psychologue">Psychologue</option>
                  <option value="Psychiatre">Psychiatre</option>
                  <option value="Psychiatre enfant ado">Psychiatre de l'enfant et de l'adolescent</option>
                  <option value="Psychothérapeute">Psychothérapeute</option>
                </select>
              </div>
              <div className="form-group">
                <label>Statut :</label>
                <div className="radio-group">
                  <label>
                    <input type="radio" name="statut" value="liberal" checked={proData.statut === 'liberal'} onChange={handleChange} />
                    Libéral
                  </label>
                  <label>
                    <input type="radio" name="statut" value="salarié" checked={proData.statut === 'salarié'} onChange={handleChange} />
                    Salarié
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label>Votre message (optionnel) :</label>
                <textarea
                  name="description"
                  value={proData.description}
                  onChange={handleChange}
                  className="custom-message"
                  placeholder="Présentez brièvement votre parcours, votre approche..."
                />
              </div>
              <div className="form-group">
                <label>Mot de passe :</label>
                <input type="password" name="password" value={proData.password} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Confirmer le mot de passe :</label>
                <input type="password" name="confirmPassword" value={proData.confirmPassword} onChange={handleChange} required />
              </div>
            </>
          )}

          <button type="submit" className="btn">
            {isLogin ? 'Se connecter' : "S'inscrire"}
          </button>
        </form>

        <button className="link" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Créer un compte' : 'Déjà inscrit ? Connexion'}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
