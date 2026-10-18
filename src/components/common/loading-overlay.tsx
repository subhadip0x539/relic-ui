import { Spinner } from "../ui/spinner";

export function LoadingOverlay() {
  return (
    <div className="h-full w-full bg-background grid place-items-center">
      <Spinner className="size-6" />
    </div>
  );
}
