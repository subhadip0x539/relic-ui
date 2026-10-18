import { Dialog } from "@/components/common/dialog";
import { TextFieldControl } from "@/components/common/text-field-control";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import z from "zod";
import { Spinner } from "@/components/ui/spinner";
import { usecreateService } from "@/services/http/app/index/create-service/handler";

export const FormSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export interface ContentProps {
  close?: () => void;
}

export function Content(props: ContentProps) {
  const { close } = props;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  const { workspaceId, environmentId } = useParams();

  const { mutate: createService, isPending: isCreateServicePending } =
    usecreateService({
      onSuccess: () => {
        close?.();
      },
    });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (workspaceId && environmentId) {
      createService({
        name: data.name,
        workspaceId,
        environmentId,
      });
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <TextFieldControl control={form.control} name="name" label="Name" />
      <Button type="submit" className="rounded-sm">
        {isCreateServicePending ? <Spinner /> : "Submit"}
      </Button>
    </form>
  );
}

export function CreateService() {
  const [dialog, setDialog] = useState(false);

  return (
    <>
      <Dialog
        open={dialog}
        close={() => setDialog(false)}
        title="Create Service"
        content={({ close }) => <Content close={close} />}
      />
      <Button
        variant="outline"
        className="rounded-sm"
        onClick={() => setDialog(true)}
      >
        <Plus />
        Create Service
      </Button>
    </>
  );
}
