// src/utils/api.ts
import { getToken } from "./authStorage";
import { API_HOST } from "./config";

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = await getToken();

  const defaultHeaders: Record<string,string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const headers = {
    ...defaultHeaders,
    ...(options.headers as Record<string,string>),
  };

  const response = await fetch(`${API_HOST}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMsg = `Erreur API (${response.status}): ${response.statusText}`;
    try {
      const errBody = await response.json();
      if (errBody?.message) {
        errorMsg = `Erreur API (${response.status}): ${errBody.message}`;
      }
    } catch {
      // si pas de body JSON, on garde l’erreur générique
    }
    throw new Error(errorMsg);
  }

  return (await response.json()) as T;
}
