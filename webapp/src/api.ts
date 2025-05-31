// src/api.ts

// URL de l’API définie dans .env (VITE_API_URL=http://localhost:3000)
const API_URL = import.meta.env.VITE_API_URL as string

/**
 * apiFetch<T>
 * Enveloppe fetch pour ajouter automatiquement le JWT en header
 * et parser la réponse JSON.
 */
export async function apiFetch<T>(
  path: string,
  opts: RequestInit = {}
): Promise<T> {
  // 1. Récupération du token dans le localStorage
  const token = localStorage.getItem('accessToken')
  console.log('🛠 apiFetch token =', token)

  // 2. Construction des headers
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(opts.headers as Record<string, string>),
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  // 3. Appel fetch
  const res = await fetch(`${API_URL}${path}`, {
    ...opts,
    headers,
    credentials: 'include',
  })

  let data: any
  try {
    data = await res.json()
  } catch {
    // pas de JSON dans la réponse
    if (!res.ok) {
      throw new Error(res.statusText)
    }
    return {} as T
  }

  // 5. Gestion des erreurs HTTP
  if (!res.ok) {
    const message = data?.message || res.statusText
    throw new Error(message)
  }

  return data as T
}
