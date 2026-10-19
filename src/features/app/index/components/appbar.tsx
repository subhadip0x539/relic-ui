import { cn } from "@/lib/utils";
import { User } from "./user";

export function Appbar() {
  return (
    <header
      className={cn("border-b px-2 h-16", "flex items-center justify-end")}
    >
      <User />
    </header>
  );
}
