import React from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/Navbar'

export default function Home() {
  return (
    <div className="w-screen min-h-screen bg-gray-50 font-serif">
      <NavBar />
      <header className="w-full bg-cover bg-center h-64" style={{ backgroundImage: "url('/assets/hero.jpg')" }}>
        <div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-5xl text-white font-bold">Bienvenue sur mindCare</h1>
        </div>
      </header>

      <main className="w-full p-6">
        <section className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl text-gray-800 font-semibold mb-4">Prenez soin de votre santé mentale</h2>
          <p className="text-gray-600 leading-relaxed">
            Sur mindCare, explorez des exercices de relaxation, tenez votre journal émotionnel et suivez votre bien-être au quotidien.
          </p>
        </section>

        <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link to="/exercises" className="block bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
            <h3 className="text-2xl text-green-700 font-semibold mb-2">Exercices</h3>
            <p className="text-gray-600 mb-4">Détendez-vous avec nos exercices guidés de méditation, respiration et relaxation.</p>
            <button className="mt-auto inline-block px-4 py-2 bg-green-700 text-white rounded-full hover:bg-green-800 transition">
              Découvrir
            </button>
          </Link>

          <Link to="/journal" className="block bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
            <h3 className="text-2xl text-green-700 font-semibold mb-2">Journal de bord</h3>
            <p className="text-gray-600 mb-4">Tenez un journal émotionnel pour suivre votre humeur et vos pensées.</p>
            <button className="mt-auto inline-block px-4 py-2 bg-green-700 text-white rounded-full hover:bg-green-800 transition">
              Écrire
            </button>
          </Link>
        </section>
      </main>
    </div>
  )
}
