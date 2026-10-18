import { Appbar } from "@/features/app/index/components/appbar";
import { Sidebar } from "@/features/app/index/components/sidebar";
import { Outlet } from "react-router-dom";
import { useQueries } from "@/features/app/index/hooks/use-queries";
import { useCleanup } from "@/features/app/index/hooks/use-cleanup";
import { LoadingOverlay } from "@/components/common/loading-overlay";

export function PortalLayout() {
  const { isLoading } = useQueries();

  useCleanup();

  if (isLoading) return <LoadingOverlay />;

  return (
    <div className="h-full flex">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-64">
        <Appbar />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
