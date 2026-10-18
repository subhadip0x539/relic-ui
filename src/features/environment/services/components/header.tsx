import { CreateService } from "./create-service";

export function Header() {
  return (
    <div className="flex gap-2 h-16 border-b items-center px-2 justify-between">
      <div className="flex gap-2"></div>
      <CreateService />
    </div>
  );
}
