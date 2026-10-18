import React from "react";
import { toast, Toaster } from "sonner";

interface ToasterProviderProps {
  children: React.ReactNode;
}

export function ToasterProvider(props: ToasterProviderProps) {
  const { children } = props;

  return (
    <>
      <Toaster visibleToasts={1} theme="dark" richColors />
      {children}
    </>
  );
}

export const notify = toast;
