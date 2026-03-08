import { Dispatch, SetStateAction, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import Button from "@/components/ui/button";
import Modal from "@/components/common/Modals";
import Input from "@/components/common/Input";
import Dropdown from "@/components/ui/dropdown";
import HookFormItem from "@/components/shared/hookform/HookFormItem";
import { onShowToastMessages } from "@/lib/toast";
import {
  useStoreFloorMutation,
  useUpdateFloorMutation,
} from "@/services/floor";
import { useGetBranchListQuery } from "@/services/shared";
import { convertToOptions } from "@/lib/dropdown";

const floorSchema = z.object({
  name: z.string().min(1, "Floor name is required"),
  branch_id: z.array(z.number()).min(1, "Branch is required"),
});

type TFloorSchema = z.infer<typeof floorSchema>;

interface Props {
  floorId?: number;
  floorData?: {
    name: string;
    branch_id: number;
  };
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const FloorModal = ({ floorId, floorData, isOpen, setIsOpen }: Props) => {
  const form = useForm<TFloorSchema>({
    resolver: zodResolver(floorSchema),
    defaultValues: {
      name: floorData?.name ?? "",
      branch_id: floorData?.branch_id ? [floorData.branch_id] : [],
    },
  });

  const { data: branches, isLoading: isLoadingBranches } =
    useGetBranchListQuery();

  useEffect(() => {
    if (floorData) {
      form.setValue("name", floorData.name);
      form.setValue("branch_id", [floorData.branch_id]);
    }
  }, [floorData, form]);

  const [storeFloor, { isLoading: isStoring }] = useStoreFloorMutation();
  const [updateFloor, { isLoading: isUpdating }] = useUpdateFloorMutation();

  const isAltering = isStoring || isUpdating;

  const closeModal = () => {
    setIsOpen(false);
    form.reset();
  };

  const onSubmit = (data: TFloorSchema) => {
    const payload = {
      ...data,
      branch_id: data.branch_id[0],
    };

    const action = floorId
      ? updateFloor({ id: floorId, ...payload })
      : storeFloor(payload);

    action
      .unwrap()
      .then((res) => {
        onShowToastMessages({
          message:
            res?.message ??
            `Floor ${!floorId ? "created" : "updated"} successfully`,
          type: "success",
        });
        closeModal();
      })
      .catch((err) => {
        onShowToastMessages({
          message: `Failed to ${!floorId ? "create" : "update"} floor`,
          type: "error",
          data: err?.data?.data,
          shouldExtractFirst: true,
        });
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={!floorId ? "New Floor" : "Update Floor"}
      size="md"
      closeOnOutsideClick={true}
      closeOnEscape={true}
    >
      <FormProvider {...form}>
        <div className="space-y-6">
          <HookFormItem name="branch_id" label="Branch" isRequired>
            <Dropdown
              options={convertToOptions(branches?.data?.branches, {
                labelKey: "name",
                valueKey: "id",
              })}
              isLoading={isLoadingBranches}
              isSearchable
            />
          </HookFormItem>

          <HookFormItem name="name" label="Floor Name" isRequired>
            <Input placeholder="Enter floor name" />
          </HookFormItem>

          <div className="flex gap-6 items-center justify-end">
            <Button
              variant="secondary"
              onClick={closeModal}
              isDisabled={isAltering}
              className="!text-sm"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={(e) => {
                e.preventDefault();
                form.handleSubmit(onSubmit)();
              }}
              isLoading={isAltering}
              className="!text-sm"
            >
              Save
            </Button>
          </div>
        </div>
      </FormProvider>
    </Modal>
  );
};

export default FloorModal;
