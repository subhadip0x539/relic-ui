import { useConfig } from "./config-provider";
import { createContext, useContext } from "react";
import { HttpClient } from "@/lib/httpc";
import { useAuth } from "./auth-provider";

export interface IThemeProviderProps {
  children: React.ReactNode;
}

const initialState = new HttpClient();

export const HttpClientContext = createContext<HttpClient>(initialState);

export function HttpClientProvider(props: Readonly<IThemeProviderProps>) {
  const { children } = props;
  const config = useConfig();
  const { logout } = useAuth();

  return (
    <HttpClientContext.Provider
      value={
        new HttpClient({
          baseURL: config.api.baseURL,
          unauthorize: () => logout(),
        })
      }
    >
      {children}
    </HttpClientContext.Provider>
  );
}

export function useHttpClient(): HttpClient {
  const context = useContext(HttpClientContext);

  if (!context) {
    throw new Error("useHttpClient must be used within a HttpClientProvider");
  }

  return context;
}
