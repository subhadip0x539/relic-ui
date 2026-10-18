import { ApiKeyList } from "@/features/environment/api-keys/components/api-key-list";
import { Header } from "@/features/environment/api-keys/components/header";
import { useQueries } from "@/features/environment/api-keys/hooks/use-queries";
import { useCleanup } from "@/features/environment/api-keys/hooks/use-cleanup";
import { LoadingOverlay } from "@/components/common/loading-overlay";

export function ApiKeys() {
  const {
    data: { apiKeys },
    isLoading,
  } = useQueries();

  useCleanup();

  if (isLoading) return <LoadingOverlay />;

  return (
    <div className="flex flex-col">
      <Header />
      <div className="p-2">
        <ApiKeyList data={apiKeys} />
      </div>
    </div>
  );
}
