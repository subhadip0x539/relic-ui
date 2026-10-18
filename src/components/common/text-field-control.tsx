import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface TextFieldControlProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function TextFieldControl<T extends FieldValues>(
  props: TextFieldControlProps<T>,
) {
  const { name, control, label, disabled, placeholder } = props;

  return (
    <Field>
      {label && <FieldLabel className="text-xs">{label}</FieldLabel>}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <Input
              id={name}
              placeholder={placeholder}
              className="rounded-sm"
              value={field.value}
              disabled={disabled}
              onChange={(e) => field.onChange(e.target.value)}
            />
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
