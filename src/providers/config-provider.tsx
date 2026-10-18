import { ConfigBuilder } from "@/lib/config";
import type { Config } from "@/types/config";
import { createContext, useContext } from "react";

interface ConfigProviderProps {
  children: React.ReactNode;
  config?: Config;
}

const initialState: Config = {
  api: {
    baseURL: window.location.origin,
  },
};

export const ConfigContext = createContext<Config>(initialState);

export function ConfigProvider(props: Readonly<ConfigProviderProps>) {
  const { children, config } = props;

  return (
    <ConfigContext.Provider value={config ?? new ConfigBuilder().env().build()}>
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
