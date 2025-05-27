"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupPage = void 0;
const react_1 = require("react");
const hooks_1 = require("../app/hooks");
const authSlice_1 = require("../features/auth/authSlice");
const react_router_dom_1 = require("react-router-dom");
const SignupPage = () => {
    const dispatch = (0, hooks_1.useAppDispatch)();
    const { token, status, error } = (0, hooks_1.useAppSelector)((s) => s.auth);
    const [form, setForm] = (0, react_1.useState)({
        email: '',
        motDePasse: '',
        prenom: '',
        nom: '',
        dateNaissance: '',
        sexe: 'Ne préfère pas dire',
        role: 'patient',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch((0, authSlice_1.signup)(form));
    };
    if (token) {
        return <react_router_dom_1.Navigate to="/patient" replace/>;
    }
    return (<div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h1>Inscription Patient</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Email<br />
          <input type="email" name="email" value={form.email} onChange={handleChange} required/>
        </label>
        <br /><br />
        <label>
          Mot de passe<br />
          <input type="password" name="motDePasse" value={form.motDePasse} onChange={handleChange} required/>
        </label>
        <br /><br />
        <label>
          Prénom<br />
          <input type="text" name="prenom" value={form.prenom} onChange={handleChange} required/>
        </label>
        <br /><br />
        <label>
          Nom<br />
          <input type="text" name="nom" value={form.nom} onChange={handleChange} required/>
        </label>
        <br /><br />
        <label>
          Date de naissance<br />
          <input type="date" name="dateNaissance" value={form.dateNaissance} onChange={handleChange}/>
        </label>
        <br /><br />
        <label>
          Sexe<br />
          <select name="sexe" value={form.sexe} onChange={handleChange}>
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
            <option value="Ne préfère pas dire">Ne préfère pas dire</option>
          </select>
        </label>
        
        <input type="hidden" name="role" value="patient"/>
        <br /><br />
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Inscription…' : 'S’inscrire'}
        </button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        Déjà inscrit ? <react_router_dom_1.Link to="/login">Se connecter</react_router_dom_1.Link>
      </p>
    </div>);
};
exports.SignupPage = SignupPage;
//# sourceMappingURL=SignupPage.js.map