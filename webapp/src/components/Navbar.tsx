// src/components/NavBar.tsx
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <header className="w-full bg-beige-100 shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-2xl font-serif text-olive-700">mindCare</Link>
          <nav className="space-x-6 text-olive-700 font-medium">
            <Link to="/journal">Journal De Bord</Link>
            <Link to="/exercises">Cours</Link>
            <Link to="/profile">Profil</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/login">Connexion</Link>
          </nav>
        </div>
        <Link
          to="/booking"
          className="px-6 py-2 bg-olive-700 text-white rounded-full hover:bg-olive-800 transition"
        >
          Réserver
        </Link>
      </div>
    </header>
  )
}