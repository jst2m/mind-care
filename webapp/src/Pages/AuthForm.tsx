import { useState } from "react";
import "../styles/AuthForm.css";
import illustration from "../assets/Inscription_mindcare.jpg";
import { API_HOST } from "../utils/config";
import { useAuth } from "../contexts/AuthContext";

const AuthForm = () => {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  const [loginData, setLoginData] = useState<{
    password: string;
    email: string;
  }>({
    password: "",
    email: "",
  });

  const [signupData, setSignupData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    dateNaissance: "",
    specialite: "",
    statut: "liberal",
    password: "",
    confirmPassword: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (!isLogin) {
      setSignupData((prev) => ({ ...prev, [name]: value }));
    } else {
      setLoginData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLogin = async () => {
    if (isLogin) {
      if (!loginData.email || !loginData.password) {
        alert("Veuillez remplir tous les champs.");
        return;
      }

      try {
        const { email, password } = loginData;
        const response = await fetch(`${API_HOST}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, motDePasse: password }),
        });
        const data = await response.json();

        if (!response.ok) {
          alert("Connexion impossible");
          return;
        }

        const { accessToken } = data as { accessToken: string };
        if (!accessToken) {
          alert("Aucun token renvoyé par le serveur.");
          return;
        }
        await login(accessToken);
      } catch (error) {
        console.error("Erreur au login :", error);
        alert("Impossible de se connecter. Veuillez réessayer.");
      }
    } else {
      if (
        !signupData.prenom ||
        !signupData.nom ||
        !signupData.email ||
        !signupData.password ||
        !signupData.confirmPassword
      ) {
        alert("Veuillez remplir tous les champs obligatoires.");
        return;
      }
      if (signupData.password !== signupData.confirmPassword) {
        alert("Les mots de passe ne correspondent pas.");
        return;
      }
      if (signupData.password.length < 8) {
        alert("Le mot de passe doit contenir au moins 8 caractères.");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(signupData.email.trim())) {
        alert("Veuillez entrer une adresse email valide.");
        return;
      }

      try {
        const response = await fetch(`${API_HOST}/auth/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prenom: signupData.prenom.trim(),
            nom: signupData.nom.trim(),
            email: signupData.email.trim(),
            motDePasse: signupData.password,
            role: "professionnel",
          }),
        });

        if (response.status === 409) {
          const data = await response.json();
          alert(data.message || "Email déjà utilisé");
          return;
        }
        if (!response.ok) {
          const data = await response.json();
          alert(data.message || "Problème lors de l’inscription");
          return;
        }

        const data = await response.json();
        const { accessToken } = data as { accessToken: string };
        if (!accessToken) {
          alert("Aucun token renvoyé par le serveur.");
          return;
        }
        await login(accessToken);
      } catch (error) {
        console.error("Erreur à l’inscription :", error);
        alert(error);
        alert(
          "Impossible de contacter le serveur. Vérifiez l’URL et la connexion."
        );
      }
    }
  };

  return (
    <div className="page">
      <img src={illustration} alt="illustration" className="header-img" />
      <div className="auth-card">
        <h2>{isLogin ? "Connexion" : "Inscription"}</h2>
        <form onSubmit={handleLogin}>
          {isLogin && (
            <>
              <div className="form-group">
                <label>Email :</label>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Mot de passe :</label>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          {/* Inscription professionnel */}
          {!isLogin && (
            <>
              <div className="form-group">
                <label>Nom :</label>
                <input
                  type="text"
                  name="nom"
                  value={signupData.nom}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Prénom :</label>
                <input
                  type="text"
                  name="prenom"
                  value={signupData.prenom}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email :</label>
                <input
                  type="email"
                  name="email"
                  value={signupData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Téléphone :</label>
                <input
                  type="tel"
                  name="telephone"
                  value={signupData.telephone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Date de naissance :</label>
                <input
                  type="date"
                  name="dateNaissance"
                  value={signupData.dateNaissance}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Spécialité :</label>
                <select
                  name="specialite"
                  value={signupData.specialite}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Choisir une spécialité --</option>
                  <option value="Psychologue">Psychologue</option>
                  <option value="Psychiatre">Psychiatre</option>
                  <option value="Psychiatre enfant ado">
                    Psychiatre de l'enfant et de l'adolescent
                  </option>
                  <option value="Psychothérapeute">Psychothérapeute</option>
                </select>
              </div>
              <div className="form-group">
                <label>Statut :</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="statut"
                      value="liberal"
                      checked={signupData.statut === "liberal"}
                      onChange={handleChange}
                    />
                    Libéral
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="statut"
                      value="salarié"
                      checked={signupData.statut === "salarié"}
                      onChange={handleChange}
                    />
                    Salarié
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label>Votre message (optionnel) :</label>
                <textarea
                  name="description"
                  value={signupData.description}
                  onChange={handleChange}
                  className="custom-message"
                  placeholder="Présentez brièvement votre parcours, votre approche..."
                />
              </div>
              <div className="form-group">
                <label>Mot de passe :</label>
                <input
                  type="password"
                  name="password"
                  value={signupData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Confirmer le mot de passe :</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={signupData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          <button type="submit" className="btn">
            {isLogin ? "Se connecter" : "S'inscrire"}
          </button>
        </form>

        <button className="link" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Créer un compte" : "Déjà inscrit ? Connexion"}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
