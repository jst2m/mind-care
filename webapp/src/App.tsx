import './App.css';
import Navbar from './navbar';
import AuthForm from './AuthForm';
import ProfilPro from './ProfilPro'; // Assure-toi que ce fichier existe dans le dossier src

function App() {
  return (
    <>
      <Navbar />
      <AuthForm />
      <ProfilPro />
    </>
  );
}

export default App;
