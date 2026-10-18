import React from "react";
import { Provider } from "react-redux";
import { store } from "@/store";

interface StoreProviderProps {
  children: React.ReactNode;
}

export function StoreProvider(props: StoreProviderProps) {
  const { children } = props;

  return <Provider store={store}>{children}</Provider>;
}
