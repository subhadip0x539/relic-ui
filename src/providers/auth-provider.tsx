import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { logout as logoutRequest } from "@/services/http/app/login/logout";
import { login as loginRequest } from "@/services/http/app/login/login";
import { refresh as refreshRequest } from "@/services/http/app/login/refresh";
import { Claims } from "@/lib/claims";
import { useConfig } from "./config-provider";
import { HttpClient } from "@/lib/httpc";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
  refresh: () => Promise<string | null>;
  token: string | null;
  claims?: Claims;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token"),
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const httpc = useMemo(
    () =>
      new HttpClient({
        baseURL: "http://localhost:8081",
        withCredentials: true,
      }),
    [],
  );
  const config = useConfig();
  const navigate = useNavigate();
  const claims = useMemo(() => {
    if (!token) return;

    return new Claims(token);
  }, [token]);

  const logout = useCallback(async () => {
    try {
      await logoutRequest(httpc);
    } finally {
      localStorage.removeItem("token");
      setToken(null);
      setIsAuthenticated(false);
      setIsLoading(false);
      navigate("/app/login", { replace: true });
    }
  }, [navigate, httpc]);

  const login = useCallback(async (username: string, password: string) => {
    const data = await loginRequest(httpc, {
      body: { username, password },
    });

    if (data) {
      localStorage.setItem("token", data.access_token);
      setToken(data.access_token);
      setIsAuthenticated(true);
      setIsLoading(false);
      navigate("/app/portal");
    }
  }, []);

  const refresh = useCallback(async (): Promise<string | null> => {
    try {
      const data = await refreshRequest(httpc);

      if (!data?.access_token) {
        return null;
      }

      localStorage.setItem("token", data.access_token);
      setToken(data.access_token);
      setIsAuthenticated(true);

      return data.access_token;
    } catch {
      logout();
      return null;
    }
  }, [logout]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

    const validate = async () => {
      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      const exp = claims?.all()?.exp;

      if (!exp) {
        logout();
        return;
      }

      const refreshIn = exp * 1000 - Date.now() - config.auth.refreshWindowMs;

      if (refreshIn <= 0) {
        setIsLoading(true);
        await refresh();

        if (!cancelled) {
          setIsLoading(false);
        }

        return;
      }

      setIsAuthenticated(true);
      setIsLoading(false);

      timeoutId = setTimeout(async () => {
        await refresh();
      }, refreshIn);
    };

    void validate();

    return () => {
      cancelled = true;

      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [token, logout, refresh]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        login,
        logout,
        refresh,
        token,
        claims,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
