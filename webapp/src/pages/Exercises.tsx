import { useEffect, useState } from 'react'
import { useNavigate }         from 'react-router-dom'
import { apiFetch }            from '../api'
import NavBar                  from '../components/Navbar'
import officeImg               from '../assets/office.png'

type Exo = {
  id: number
  title: string
  content_markdown: string
}

export default function Exercises() {
  const [list, setList]   = useState<Exo[]>([])
  const [error, setError] = useState<string>()
  const navigate          = useNavigate()

  useEffect(() => {
    apiFetch<Exo[]>('/exercice')
      .then(data => setList(data))
      .catch(e => setError(e.message))
  }, [])

  function startRandom() {
    if (!list.length) return
    const random = list[Math.floor(Math.random() * list.length)]
    navigate(`/exercises/${random.id}`)
  }

  return (
    <div className="w-screen min-h-screen bg-gray-800 font-serif">
      <NavBar />

      {/* hero banner full width */}
      <div
        className="w-screen h-64 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${officeImg})` }}
      />

      <main className="w-screen p-6">
        <h1 className="text-4xl text-center text-white font-bold mb-4">
          Exercices
        </h1>
        <p className="text-center text-gray-300 mb-6">
          Des exercices de relaxation pour vous aider à détendre votre esprit,
          réduire le stress et améliorer votre bien-être quotidien.
        </p>
        <div className="text-center mb-8">
          <button
            onClick={startRandom}
            className="px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
          >
            Démarrer un exercice
          </button>
        </div>

        {error && (
          <div className="text-red-500 text-center mb-6">{error}</div>
        )}

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {list.map(e => (
            <li
              key={e.id}
              className="border border-gray-200 rounded-lg p-4 bg-white shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {e.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {e.content_markdown}
              </p>
              <button
                onClick={() => navigate(`/exercises/${e.id}`)}
                className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Commencer
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}