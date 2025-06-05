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
      const token = getToken();
      if (token) {
        setAccessToken(token);
      }
      setIsLoading(false);
    };
    loadToken();
  }, []);

  const login = async (token: string) => {
    storeToken(token);
    setAccessToken(token);
  };

  const logout = async () => {
    removeToken();
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

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
