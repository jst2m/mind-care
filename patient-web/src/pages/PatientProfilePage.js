"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientProfilePage = void 0;
const react_1 = require("react");
const api_1 = require("../app/api");
const PatientProfilePage = () => {
    const [data, setData] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        api_1.default.get('/patient')
            .then(resp => setData(resp.data))
            .catch(() => setError('Impossible de charger vos données'))
            .finally(() => setLoading(false));
    }, []);
    const onSubmit = (e) => {
        e.preventDefault();
        if (!data)
            return;
        api_1.default.put('/patient', data)
            .then(resp => setData(resp.data))
            .catch(() => setError('Échec de la mise à jour'));
    };
    if (loading)
        return <p>Chargement…</p>;
    if (error)
        return <p style={{ color: 'red' }}>{error}</p>;
    return (<div style={{ maxWidth: 600, margin: 'auto' }}>
      <h1>Mon profil patient</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Allergies (virgule-séparées)</label><br />
          <input type="text" value={data.allergies.join(',')} onChange={e => setData({
            ...data,
            allergies: e.target.value.split(',').map(s => s.trim()),
        })}/>
        </div>
        <div>
          <label>Antécédents (JSON)</label><br />
          <textarea rows={4} value={JSON.stringify(data.antecedents, null, 2)} onChange={e => setData({
            ...data,
            antecedents: JSON.parse(e.target.value),
        })}/>
        </div>
        <button type="submit">Mettre à jour</button>
      </form>
    </div>);
};
exports.PatientProfilePage = PatientProfilePage;
//# sourceMappingURL=PatientProfilePage.js.map