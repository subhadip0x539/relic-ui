import { defaults } from "@/constants/defaults.const";
import { ConfigBuilder } from "@/lib/config";
import type { Config } from "@/types/config";
import { createContext, useContext } from "react";

interface ConfigProviderProps {
  children: React.ReactNode;
}

const initialState: Config = {
  api: {
    baseURL: window.location.origin,
  },
  auth: {
    refreshWindowMs: defaults.AUTH_REFRESH_WINDOW_MS,
  },
};

export const ConfigContext = createContext<Config>(initialState);

export function ConfigProvider(props: Readonly<ConfigProviderProps>) {
  const { children } = props;

  return (
    <ConfigContext.Provider value={new ConfigBuilder().env().build()}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig(): Config {
  const context = useContext(ConfigContext);

  if (!context) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }

  return context;
}
