import { LoadingOverlay } from "@/components/common/loading-overlay";
import { FlagCards } from "@/features/environment/flags/components/flag-cards";
import { Header } from "@/features/environment/flags/components/header";
import { useQueries } from "@/features/environment/flags/hooks/use-queries";

export function Flags() {
  const {
    data: { flags },
    isLoading,
  } = useQueries();

  if (isLoading) return <LoadingOverlay />;

  return (
    <div className="flex flex-col">
      <Header />
      <div className="p-2">
        <FlagCards data={flags} />
      </div>
    </div>
  );
}
