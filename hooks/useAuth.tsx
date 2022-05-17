import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import jwtDecode from "jwt-decode";

type token = {
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  iss: string;
  jti: string;
  name: string;
  nbf: number;
  picture: string;
  sub: string;
};

interface IUseAuth {
  token: string;
  isAuth: boolean;
  storeToken: (token: string) => void;
}

const AuthContext = createContext<IUseAuth | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string>("");
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const isTokenValid = (token: string): boolean => {
    const decodedToken: token = jwtDecode(token);
    if (Date.now() >= decodedToken.exp * 1000) return false;
    return true;
  };
  const isAuthenticated = useCallback((): boolean => {
    const storedToken = localStorage.getItem("wynterToken");
    if (!storedToken) return false;
    return isTokenValid(storedToken);
  }, []);

  const storeToken = (token: string) => {
    setToken(token);
    localStorage.removeItem("wynterToken");
    localStorage.setItem("wynterToken", token);
    setIsAuth(true);
  };

  useEffect(() => {
    setIsAuth(isAuthenticated());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    token,
    isAuth,
    storeToken,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
