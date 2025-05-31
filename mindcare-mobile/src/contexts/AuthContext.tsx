import React, { createContext, useContext, useEffect, useState } from "react";
import { getToken, storeToken, removeToken } from "../utils/authStorage";

type AuthContextType = {
  isAuthenticated: boolean;
  accessToken: string | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  accessToken: null,
  login: async () => {},
  logout: async () => {},
  isLoading: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const token = await getToken();
      if (token) {
        console.log(token);
        setAccessToken(token);
      }
      setIsLoading(false);
    };
    loadToken();
  }, []);

  const login = async (token: string) => {
    await storeToken(token);
    setAccessToken(token);
  };

  const logout = async () => {
    await removeToken();
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isAuthenticated: !!accessToken,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
