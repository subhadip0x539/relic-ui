import { XIcon } from "lucide-react";
import {
  DialogContent,
  DialogHeader,
  Dialog as ShadcnDialog,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";

export interface DialogProps {
  open?: boolean;
  close?: () => void;
  content?: (props: { close?: () => void }) => React.ReactNode;
  title?: string;
  description?: string;
}

export function Dialog(props: DialogProps) {
  const { open = false, close, content, title, description } = props;

  return (
    <ShadcnDialog
      open={open}
      onOpenChange={(open) => {
        if (!open) close?.();
      }}
    >
      <DialogContent showCloseButton={false} className="rounded-sm">
        <DialogHeader>
          <div className="flex items-center justify-between">
            {title && <DialogTitle className="text-sm">{title}</DialogTitle>}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-sm"
              onClick={() => close?.()}
            >
              <XIcon />
            </Button>
          </div>
          {description && (
            <DialogDescription className="text-xs">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        {content?.({ close })}
      </DialogContent>
    </ShadcnDialog>
  );
}
