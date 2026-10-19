import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useMemo, useState } from "react";
import type { Option } from "@/types/common";
import { Check } from "lucide-react";

interface SelectFieldControlProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  options?: Option[];
}

export function SelectFieldControl<T extends FieldValues>(
  props: SelectFieldControlProps<T>,
) {
  const { name, control, label, disabled, placeholder, options = [] } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const fopts = useMemo(
    () =>
      options.filter((o) =>
        o.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
      ),
    [search, options],
  );

  return (
    <Field>
      {label && <FieldLabel className="text-xs">{label}</FieldLabel>}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger
                render={
                  <Input
                    id={name}
                    placeholder={placeholder}
                    className="rounded-sm text-left"
                    value={field.value.name}
                    disabled={disabled}
                  />
                }
              />
              <DropdownMenuContent
                className="rounded-sm p-2.5 gap-2.5 flex flex-col"
                align="center"
                sideOffset={8}
              >
                <Input
                  id="search"
                  placeholder="Search options..."
                  className="rounded-sm text-xs"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.stopPropagation()}
                />
                <div className="overflow-auto">
                  {fopts.map((o) => (
                    <DropdownMenuItem
                      key={o.code}
                      onClick={() => field.onChange(o)}
                      className="rounded-sm px-2.5 py-1 flex justify-between"
                    >
                      {o.name}
                      {field.value.code === o.code && <Check />}
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            {fieldState.error && (
              <FieldError className="text-sx text-red-500">
                {fieldState.error.message}
              </FieldError>
            )}
          </>
        )}
      />
    </Field>
  );
}
