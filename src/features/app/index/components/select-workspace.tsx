import { useMemo, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Workspace } from "@/types/domain";
import { ChevronsUpDown, Plus } from "lucide-react";

export interface SelectWorkspaceProps {
  selectedId?: string;
  workspaces?: Workspace[];
  onChange?: (workspace: Workspace) => void;
}

export function SelectWorkspace(props: SelectWorkspaceProps) {
  const { workspaces = [], selectedId, onChange } = props;
  const [open, setOpen] = useState(false);

  const selectedWorkspce = useMemo(
    () => workspaces.find((w) => selectedId && w.id === selectedId),
    [selectedId, workspaces],
  );

  const handleChange = (workspace: Workspace) => {
    onChange?.(workspace);
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        render={
          <button className="h-16 w-full flex items-center justify-between border-b px-4 hover:bg-accent/50 transition-colors">
            <span className="font-medium text-sm">
              {selectedWorkspce?.name ?? "Select workspace"}
            </span>
            <ChevronsUpDown className="size-4 text-muted-foreground" />
          </button>
        }
      />
      <DropdownMenuContent
        className="rounded-sm w-60"
        align="center"
        sideOffset={8}
      >
        {workspaces.length ? (
          <>
            {workspaces.map((w) => (
              <DropdownMenuItem
                key={w.id}
                onClick={() => handleChange(w)}
                className="rounded-sm px-2 py-1.5"
              >
                {w.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
          </>
        ) : (
          <></>
        )}
        <DropdownMenuItem className="rounded-sm px-2 py-1.5">
          <Plus className="size-4" />
          Add workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
