import { useConfig } from "./config-provider";
import { createContext, useContext } from "react";
import { HttpClient } from "@/lib/httpc";

export interface IThemeProviderProps {
  children: React.ReactNode;
  client?: HttpClient;
}

const initialState = new HttpClient();

export const HttpClientContext = createContext<HttpClient>(initialState);

export function HttpClientProvider(props: Readonly<IThemeProviderProps>) {
  const { children, client } = props;
  const config = useConfig();

  return (
    <HttpClientContext.Provider
      value={
        client ||
        new HttpClient({
          baseURL: config.api.baseURL,
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
