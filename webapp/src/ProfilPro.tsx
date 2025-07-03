import { useState } from 'react';
import './ProfilPro.css';

const ProfilPro = () => {
  const [editMode, setEditMode] = useState(false);

  const [originalData, setOriginalData] = useState({
    nom: 'Dupont',
    prenom: 'Jean',
    email: 'jean.dupont@example.com',
    telephone: '0601020304',
    specialite: 'Psychologue',
    statut: 'liberal',
    description: 'Psychologue spécialisé dans le bien-être mental des jeunes adultes.',
  });

  const [formData, setFormData] = useState({ ...originalData });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setOriginalData(formData); // met à jour les données sauvegardées
    setEditMode(false);
    alert('Modifications enregistrées.');
  };

  const handleCancel = () => {
    setFormData(originalData); // restaure les anciennes données
    setEditMode(false);
  };

  return (
    <div className="profil-container">
      <h2>Profil du Praticien</h2>
      <form className="profil-form">
        <label>Nom :</label>
        <input type="text" name="nom" value={formData.nom} onChange={handleChange} disabled={!editMode} />

        <label>Prénom :</label>
        <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} disabled={!editMode} />

        <label>Email :</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} disabled={!editMode} />

        <label>Téléphone :</label>
        <input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} disabled={!editMode} />

        <label>Spécialité :</label>
        <select name="specialite" value={formData.specialite} onChange={handleChange} disabled={!editMode}>
          <option value="Psychologue">Psychologue</option>
          <option value="Psychiatre">Psychiatre</option>
          <option value="Psychiatre enfant ado">Psychiatre de l'enfant et de l'adolescent</option>
          <option value="Psychothérapeute">Psychothérapeute</option>
        </select>

        <label>Statut :</label>
        <select name="statut" value={formData.statut} onChange={handleChange} disabled={!editMode}>
          <option value="liberal">Libéral</option>
          <option value="salarié">Salarié</option>
        </select>

        <label>Description :</label>
        <textarea name="description" rows={4} value={formData.description} onChange={handleChange} disabled={!editMode} />

        {!editMode ? (
          <button type="button" className="btn-edit" onClick={() => setEditMode(true)}>
            Modifier le profil
          </button>
        ) : (
          <div className="button-group">
            <button type="button" className="btn-save" onClick={handleSave}>
              Enregistrer les modifications
            </button>
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Annuler
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfilPro;
