import { useMemo, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Workspace } from "@/types/domain";
import { ChevronsUpDown, Folder, Plus } from "lucide-react";
import { Dialog } from "@/components/common/dialog";
import { Content } from "./create-workspace";

export interface SelectWorkspaceProps {
  selectedId?: string;
  workspaces?: Workspace[];
  onChange?: (workspace: Workspace) => void;
}

export function SelectWorkspace(props: SelectWorkspaceProps) {
  const { workspaces = [], selectedId, onChange } = props;
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);

  const selectedWorkspce = useMemo(
    () => workspaces.find((w) => selectedId && w.id === selectedId),
    [selectedId, workspaces],
  );

  const handleChange = (workspace: Workspace) => {
    onChange?.(workspace);
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={dialog}
        close={() => setDialog(false)}
        title="Create Flag"
        content={({ close }) => <Content close={close} />}
      />
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
                  className="rounded-sm p-1 gap-3"
                >
                  <div className="p-1 border rounded-sm">
                    <Folder className="size-4" />
                  </div>
                  {w.name}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
            </>
          ) : (
            <></>
          )}
          <DropdownMenuItem
            className="rounded-sm p-1 gap-3"
            onClick={() => setDialog(true)}
          >
            <div className="p-1 border rounded-sm">
              <Plus className="size-4" />
            </div>
            Create Workspace
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
