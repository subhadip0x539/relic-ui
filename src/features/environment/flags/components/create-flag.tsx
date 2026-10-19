import { Dialog } from "@/components/common/dialog";
import { SelectFieldControl } from "@/components/common/select-field-control";
import { TextareaControl } from "@/components/common/textarea-control";
import { TextFieldControl } from "@/components/common/text-field-control";
import { Button } from "@/components/ui/button";
import { flagType } from "@/constants/flag-type.const";
import { useQueryClient } from "@/providers/query-client-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import z from "zod";
import { CheckboxControl } from "@/components/common/checkbox-control";
import { usecreateFlag } from "@/services/http/app/index/create-flag/handler";
import { Spinner } from "@/components/ui/spinner";
import { useGetServicesQuery } from "@/services/http/environment/services";
import { queryKey } from "@/constants/query-key.const";

export const FormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  type: z.object({
    code: z.enum([flagType.BOOLEAN, flagType.NUMBER, flagType.STRING]),
    name: z.string(),
  }),
  enabled: z.boolean(),
  service: z.object({ code: z.string(), name: z.string() }),
  value: z.string().optional(),
});

const types: string[] = [flagType.BOOLEAN, flagType.NUMBER, flagType.STRING];

export interface ContentProps {
  close?: () => void;
}

export function Content(props: ContentProps) {
  const { close } = props;

  const qc = useQueryClient();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      type: { code: flagType.BOOLEAN, name: flagType.BOOLEAN },
      service: { code: "", name: "" },
      enabled: true,
    },
  });

  const { workspaceId, environmentId } = useParams();

  const { data: services } = useGetServicesQuery(
    { environmentId },
    {
      enabled: !!(workspaceId && environmentId),
      queryKey: [
        queryKey.ENVIRONMENT,
        queryKey.ENVIRONMENT_SERVICES,
        queryKey.ENVIRONMENT_SERVICES_GET_SERVICES,
      ],
    },
  );

  const { mutate: createFlag, isPending: isCreateFlagPending } = usecreateFlag({
    onSuccess: () => {
      qc.invalidateQueries({
        predicate: (q) =>
          q.queryKey[2] === queryKey.ENVIRONMENT_FLAGS_GET_FLAGS,
      });
      close?.();
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (workspaceId && environmentId) {
      createFlag({
        name: data.name,
        description: data.description,
        type: data.type.code,
        enabled: data.enabled,
        value: data.value,
        workspaceId,
        environmentId,
        serviceId: data.service.code,
      });
    }
  };

  const type = form.watch("type");

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <TextFieldControl control={form.control} name="name" label="Name" />
      <SelectFieldControl
        control={form.control}
        name="type"
        label="Type"
        options={types.map((t) => ({ code: t, name: t }))}
      />
      {type.code !== flagType.BOOLEAN && (
        <TextFieldControl control={form.control} name="value" label="Value" />
      )}
      <SelectFieldControl
        control={form.control}
        name="service"
        label="Service"
        options={services?.map((s) => ({ code: s.id, name: s.name }))}
      />
      <TextareaControl
        control={form.control}
        name="description"
        label="Description"
      />
      <CheckboxControl control={form.control} name="enabled" label="Enabled" />
      <Button type="submit" className="rounded-sm">
        {isCreateFlagPending ? <Spinner /> : "Submit"}
      </Button>
    </form>
  );
}

export function CreateFlag() {
  const [dialog, setDialog] = useState(false);

  return (
    <>
      <Dialog
        open={dialog}
        close={() => setDialog(false)}
        title="Create Flag"
        content={({ close }) => <Content close={close} />}
      />
      <Button
        variant="outline"
        className="rounded-sm"
        onClick={() => setDialog(true)}
      >
        <Plus />
        Create Flag
      </Button>
    </>
  );
}
