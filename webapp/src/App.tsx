import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import AuthForm from './Pages/AuthForm';
import ProfilPro from './Pages/ProfilPro';
import HomePage from './Pages/HomePage';
import Messages from './Pages/Messages';
import Calendar from './Pages/Calendar';

function App() {
  return (
    <Router>
      <div style={{ backgroundColor: '#fefcf9', minHeight: '100vh' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthForm />} />  
          <Route path="/login" element={<AuthForm />} />  
          <Route path="/profil" element={<ProfilPro />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/rendez-vous" element={<Calendar />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
