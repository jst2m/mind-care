"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginPage = void 0;
const react_1 = require("react");
const hooks_1 = require("../app/hooks");
const authSlice_1 = require("../features/auth/authSlice");
const react_router_dom_1 = require("react-router-dom");
const LoginPage = () => {
    const dispatch = (0, hooks_1.useAppDispatch)();
    const token = (0, hooks_1.useAppSelector)(s => s.auth.token);
    const status = (0, hooks_1.useAppSelector)(s => s.auth.status);
    const [email, setEmail] = (0, react_1.useState)('');
    const [motDePasse, setMotDePasse] = (0, react_1.useState)('');
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch((0, authSlice_1.login)({ email, motDePasse }));
    };
    if (token) {
        return <react_router_dom_1.Navigate to="/patient" replace/>;
    }
    return (<div style={{ maxWidth: 400, margin: 'auto' }}>
      <h1>Connexion</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Email</label><br />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required/>
        </div>
        <div>
          <label>Mot de passe</label><br />
          <input type="password" value={motDePasse} onChange={e => setMotDePasse(e.target.value)} required/>
        </div>
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? '…' : 'Se connecter'}
        </button>
      </form>
      {status === 'failed' && <p style={{ color: 'red' }}>Échec de la connexion</p>}
    </div>);
};
exports.LoginPage = LoginPage;
//# sourceMappingURL=LoginPage.js.map