const TOKEN_KEY = "accessToken";

export const storeToken = (token: string): void => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (e) {
    console.error("Erreur stockage token :", e);
  }
};

export const getToken = (): string | null => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (e) {
    console.error("Erreur récupération token :", e);
    return null;
  }
};

export const removeToken = (): void => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (e) {
    console.error("Erreur suppression token :", e);
  }
};
