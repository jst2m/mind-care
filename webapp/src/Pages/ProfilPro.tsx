import { useState } from "react";
import "../styles/ProfilPro.css";

const initialData = {
  nom: "Dupont",
  prenom: "Claire",
  email: "claire.dupont@example.com",
  telephone: "0612345678",
  specialite: "Psychologue",
  statut: "Libéral",
  description: "Spécialisée en thérapie cognitive et comportementale.",
};

const ProfilPro = () => {
  const [data, setData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    setIsEditing(false);
    alert("Modifications enregistrées.");
  };

  return (
    <div className="profil-container">
      <h2>Mon Profil</h2>
      <div className="profil-form">
        <label>Nom :</label>
        <input
          name="nom"
          value={data.nom}
          onChange={handleChange}
          disabled={!isEditing}
        />

        <label>Prénom :</label>
        <input
          name="prenom"
          value={data.prenom}
          onChange={handleChange}
          disabled={!isEditing}
        />

        <label>Email :</label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          disabled={!isEditing}
        />

        <label>Téléphone :</label>
        <input
          type="tel"
          name="telephone"
          value={data.telephone}
          onChange={handleChange}
          disabled={!isEditing}
        />

        <label>Spécialité :</label>
        <select
          name="specialite"
          value={data.specialite}
          onChange={handleChange}
          disabled={!isEditing}
        >
          <option value="Psychologue">Psychologue</option>
          <option value="Psychiatre">Psychiatre</option>
          <option value="Psychiatre enfant ado">
            Psychiatre de l'enfant et de l'adolescent
          </option>
          <option value="Psychothérapeute">Psychothérapeute</option>
        </select>

        <label>Statut :</label>
        <select
          name="statut"
          value={data.statut}
          onChange={handleChange}
          disabled={!isEditing}
        >
          <option value="Libéral">Libéral</option>
          <option value="Salarié">Salarié</option>
        </select>

        <label>Description :</label>
        <textarea
          name="description"
          value={data.description}
          onChange={handleChange}
          rows={4}
          disabled={!isEditing}
        />

        {!isEditing ? (
          <button className="btn-edit" onClick={handleEdit}>
            Modifier
          </button>
        ) : (
          <button className="btn-save" onClick={handleSave}>
            Enregistrer
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilPro;
