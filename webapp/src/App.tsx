import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
<<<<<<< HEAD
import Navbar from './navbar';
import AuthForm from './AuthForm';
import ProfilPro from './ProfilPro';
import HomePage from './HomePage';
import Messages from './Messages';
import Calendar from './Calendar';
=======
import Navbar from './components/navbar';
import AuthForm from './Pages/AuthForm';
import ProfilPro from './Pages/ProfilPro';
import HomePage from './Pages/HomePage';
import Messages from './Pages/Messages';
import Calendar from './Pages/Calendar';
>>>>>>> origin/maryam

function App() {
  return (
    <Router>
      <div style={{ backgroundColor: '#fefcf9', minHeight: '100vh' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthForm />} />       {/* ✅ Authentification */}
          <Route path="/login" element={<AuthForm />} />       {/* (optionnel si déjà utilisé ailleurs) */}
          <Route path="/profil" element={<ProfilPro />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/rendez-vous" element={<Calendar />} /> {/* ✅ Corrigé ici */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
