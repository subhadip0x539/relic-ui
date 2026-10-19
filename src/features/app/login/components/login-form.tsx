import { TextFieldControl } from "@/components/common/text-field-control";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed, EyeDashed, EyeOff, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export const FormSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export function LoginForm() {
  const [isVisible, setIsVisible] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { login } = useAuth();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    login(data.username, data.password);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <TextFieldControl
        control={form.control}
        name="username"
        label="username"
        adornment={<User size={16} className="text-muted-foreground" />}
      />
      <TextFieldControl
        control={form.control}
        name="password"
        label="password"
        visible={isVisible}
        adornment={
          <button
            type="button"
            onClick={() => setIsVisible((prev) => !prev)}
            className="text-muted-foreground"
          >
            {isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        }
      />
      <Button type="submit" className="rounded-sm font-bold" size="lg">
        Sign in
      </Button>
    </form>
  );
}
