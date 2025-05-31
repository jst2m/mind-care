import { useParams }        from 'react-router-dom'
import { useEffect, useState } from 'react'
import { marked }           from 'marked'
import { apiFetch }         from '../api'
import NavBar               from '../components/Navbar'

type Exo = {
  id: number
  title: string
  content_markdown: string
}

export default function ExerciseDetail() {
  const { id } = useParams<{ id: string }>()
  const [exo, setExo]     = useState<Exo | null>(null)
  const [error, setError] = useState<string>()

  useEffect(() => {
    apiFetch<Exo>(`/exercice/${id}`)
      .then(data => setExo(data))
      .catch(e => setError(e.message))
  }, [id])

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>
  }
  if (!exo) {
    return <div className="p-6">Chargement…</div>
  }

  const md = typeof exo.content_markdown === 'string' 
    ? exo.content_markdown 
    : JSON.stringify(exo.content_markdown)

  const html = marked.parse(md)

  return (
    <div className="w-screen min-h-screen bg-gray-50 font-serif">
      <NavBar />
      <main className="w-screen p-6">
        <h1 className="text-4xl text-green-700 font-bold mb-6">{exo.title}</h1>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </main>
    </div>
  )
}
