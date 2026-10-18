import { FieldLabel } from "@/components/ui/field";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Checkbox } from "../ui/checkbox";

interface CheckboxControlProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function CheckboxControl<T extends FieldValues>(
  props: CheckboxControlProps<T>,
) {
  const { name, control, label, disabled } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex items-center gap-2">
          <Checkbox
            checked={field.value}
            disabled={disabled}
            onCheckedChange={(value) => field.onChange(value)}
          />
          {label && <FieldLabel className="text-xs">{label}</FieldLabel>}
        </div>
      )}
    />
  );
}
