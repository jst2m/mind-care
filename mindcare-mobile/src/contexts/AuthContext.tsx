import React, { createContext, useContext, useEffect, useState } from "react";
import { getToken, storeToken, removeToken } from "../utils/authStorage";
import { apiFetch } from "../utils/api";

export type Utilisateur = {
  uuid: string;
  email: string;
  prenom: string;
  nom: string;
  dateNaissance?: string;
  telephone?: string;
  adresse?: string;
  codePostal?: string;
  ville?: string;
  sexe: "Homme" | "Femme" | "Ne préfère pas dire";
  role: "patient" | "professionnel";
  dateCreation: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: Utilisateur | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  accessToken: null,
  user: null,
  login: async () => {},
  logout: async () => {},
  isLoading: false,
  refreshUser: async () => {},
});

/**
 * Petit utilitaire pour décoder un JWT basique en JSON
 */
function parseJwt(token: string): { sub: string; [key: string]: any } | null {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<Utilisateur | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Recharge l’utilisateur (utilisé à l’initialisation et après chaque mise à jour).
   * Si la récupération échoue (ex. token invalide ou utilisateur introuvable), 
   * on déconnecte immédiatement.
   */
  const refreshUser = async () => {
    if (!accessToken) {
      setUser(null);
      return;
    }

    const payload = parseJwt(accessToken);
    if (!payload?.sub) {
      // token invalide => on déconnecte
      await removeToken();
      setAccessToken(null);
      setUser(null);
      return;
    }

    try {
      // Si la requête échoue (404, 500, etc.), on va dans le catch et on déconnecte
      const fetched = await apiFetch<Utilisateur>(`/utilisateur/${payload.sub}`);
      setUser(fetched);
    } catch (e) {
      console.warn("Impossible de récupérer l’utilisateur :", e);
      // On considère que le token n’est plus bon : on supprime tout et on déconnecte
      await removeToken();
      setAccessToken(null);
      setUser(null);
    }
  };

  // Au montage : on tente de charger token + user depuis le storage
  useEffect(() => {
    const loadTokenAndUser = async () => {
      try {
        const token = await getToken();
        if (token) {
          setAccessToken(token);
          // On recharge l’utilisateur dès qu’on a le token
          await refreshUser();
        }
      } catch (err) {
        console.warn("Erreur lors du chargement du token :", err);
        // En cas d’erreur inattendue, on s’assure de réinitialiser l’état
        await removeToken();
        setAccessToken(null);
        setUser(null);
      } finally {
        // Quoi qu’il arrive, on quitte le loader global
        setIsLoading(false);
      }
    };
    loadTokenAndUser();
  }, []);

  const login = async (token: string) => {
    // Stocke le token
    await storeToken(token);
    setAccessToken(token);
    // Recharge l’utilisateur tout de suite
    await refreshUser();
  };

  const logout = async () => {
    await removeToken();
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isAuthenticated: !!accessToken && !!user,
        user,
        login,
        logout,
        isLoading,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
