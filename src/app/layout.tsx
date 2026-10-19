import { AuthProvider } from "@/providers/auth-provider";
import { ConfigProvider } from "@/providers/config-provider";
import { HttpClientProvider } from "@/providers/http-client-provider";
import { QueryClientProvider } from "@/providers/query-client-provider";
import { StoreProvider } from "@/providers/store-provider";
import { ToasterProvider } from "@/providers/toaster-provider";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <ConfigProvider>
      <StoreProvider>
        <QueryClientProvider>
          <AuthProvider>
            <HttpClientProvider>
              <ToasterProvider>
                <div className="h-screen w-screen bg-background text-foreground">
                  <Outlet />
                </div>
              </ToasterProvider>
            </HttpClientProvider>
          </AuthProvider>
        </QueryClientProvider>
      </StoreProvider>
    </ConfigProvider>
  );
}
