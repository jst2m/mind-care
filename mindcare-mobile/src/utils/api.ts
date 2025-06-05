// src/utils/api.ts
import { getToken } from "./authStorage";
import { API_HOST } from "./config"; // ex: "http://192.168.1.11:3000"

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  // 1) On récupère le token JWT dans le storage
  const token = await getToken();

  // 2) On construit les headers par défaut, en y injectant Authorization si token
  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const headers = {
    ...defaultHeaders,
    ...(options.headers as Record<string, string>),
  };

  // 3) On envoie la requête
  const response = await fetch(`${API_HOST}${path}`, {
    ...options,
    headers,
  });

  // 4) Si le status n’est pas OK, on tente de parser le JSON d’erreur, sinon on lève une exception
  if (!response.ok) {
    let errorMsg = `Erreur API (${response.status}): ${response.statusText}`;
    try {
      const errBody = await response.json();
      if (errBody?.message) {
        errorMsg = `Erreur API (${response.status}): ${errBody.message}`;
      }
    } catch {
      // on ignore l’erreur de parse si le body n’était pas JSON
    }
    throw new Error(errorMsg);
  }

  // 5) On renvoie directement le JSON typé
  return (await response.json()) as T;
}
