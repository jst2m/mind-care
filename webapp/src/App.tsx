import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './navbar';
import AuthForm from './AuthForm';
import ProfilPro from './ProfilPro';
import HomePage from './HomePage'

function App() {
  return (
    <Router>
      <div style={{ backgroundColor: '#fefcf9', minHeight: '100vh' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Page d’accueil réelle */}
          <Route path="/login" element={<AuthForm />} />
          <Route path="/profil" element={<ProfilPro />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
