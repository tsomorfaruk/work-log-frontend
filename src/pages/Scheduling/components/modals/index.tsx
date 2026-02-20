import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { FormProvider, useForm } from "react-hook-form";

import Button from "@/components/ui/button";
import Modal from "@/components/common/Modals";
import HookFormItem from "@/components/shared/hookform/HookFormItem";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  alterScheduleSchema,
  scheduleDefaultValues,
  TAlterScheduleSchema,
} from "./schema";
import Dropdown from "@/components/ui/dropdown";
import { useGetScheduleUserListQuery } from "@/services/employee";
import { convertToOptions } from "@/lib/dropdown";
import CustomDatePicker from "@/components/common/CustomDatePicker";
import Textarea from "@/components/common/Textarea";
import moment from "moment";
import { onShowToastMessages } from "@/lib/toast";
import {
  useAlterSchedulingMutation,
  useDeleteScheduleMutation,
} from "@/services/scheduling";
import { AlterSchedulingPayload } from "@/models/scheduling";
import ConfirmationModal from "@/components/common/Modals/ConfirmationModal";
import clsx from "clsx";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  employeeId?: number | null;
  defaultValue?: Partial<AlterSchedulingPayload> | null;
  rotaId?: number;
}

const RotaModal = ({ isOpen, setIsOpen, defaultValue, rotaId }: Props) => {
  const form = useForm<TAlterScheduleSchema>({
    // resolver: zodResolver(alterScheduleSchema(!!rotaId)),
    resolver: zodResolver(alterScheduleSchema()),
    defaultValues: scheduleDefaultValues,
    mode: "all",
  });

  useEffect(() => {
    if (defaultValue?.employee_id) {
      form.setValue("employee_id", [defaultValue.employee_id]);
    }

    if (defaultValue?.date) {
      form.setValue("date", defaultValue.date);
    }

    if (defaultValue?.start_time) {
      form.setValue("start_time", defaultValue.start_time);
    }

    if (defaultValue?.end_time) {
      form.setValue("end_time", defaultValue.end_time);
    }

    if (defaultValue?.notes) {
      form.setValue("note", defaultValue.notes);
    }
  }, [defaultValue]);

  const startTimeValue = form.watch("start_time");
  const endTimeValue = form.watch("end_time");

  const selectedStartTime = startTimeValue
    ? moment(startTimeValue, "HH:mm").toDate()
    : null;
  const selectedEndTime = endTimeValue
    ? moment(endTimeValue, "HH:mm").toDate()
    : null;

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const { data: employeeData, isLoading: isLoadingEmployee } =
    useGetScheduleUserListQuery({});

  const closeModal = () => {
    setIsOpen(false);
    form.reset();
  };

  const [alterScheduling, { isLoading: isAlteringScheduling }] =
    useAlterSchedulingMutation();

  const [deleteSchedule, { isLoading: isDeletingSchedule }] =
    useDeleteScheduleMutation();

  const onSubmit = (data: TAlterScheduleSchema) => {
    const employeeId = data?.employee_id?.[0];

    const payload: AlterSchedulingPayload = {
      employee_id: employeeId!,
      date: data.date!,
      start_time: data.start_time!,
      end_time: data.end_time!,
      notes: data.note!,
    };

    alterScheduling({
      id: rotaId,
      payload,
    })
      .unwrap()
      .then((res) => {
        onShowToastMessages({
          message: res?.message ?? "Rota updated successfully",
          type: "success",
        });

        closeModal();
      })
      .catch((err) => {
        onShowToastMessages({
          message: "Failed to update Rota",
          type: "error",
          data: err?.data?.data,
          shouldExtractFirst: true,
        });
      });
  };

  const closeDeleteModal = () => {
    setIsOpenDeleteModal(false);
  };

  const handleDeleteSchedule = () => {
    if (rotaId)
      deleteSchedule(rotaId)
        .unwrap()
        .then((res) => {
          onShowToastMessages({
            message: res?.message ?? "Rota deleted successfully",
            type: "success",
          });

          closeDeleteModal();
          closeModal();
        })
        .catch((err) => {
          onShowToastMessages({
            message: err?.data?.message ?? "Failed to delete rota",
            type: "error",
          });
        });
  };

  const isInEditMode = !!defaultValue?.start_time;

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={!isInEditMode ? "Add Shift" : "Update Shift"}
      size="lg"
      closeOnOutsideClick={true}
      closeOnEscape={true}
    >
      <div>
        <FormProvider {...form}>
          <div className="flex flex-col xl:grid lg:grid-cols-3 gap-6 mb-6">
            <HookFormItem
              name="employee_id"
              // label="Employee / Shift Type"
              label="Employee"
              isRequired
              className="col-span-3"
            >
              <Dropdown
                options={convertToOptions(employeeData?.data?.users, {
                  labelKey: "name",
                  valueKey: "id",
                })}
                isLoading={isLoadingEmployee}
                isSearchable
                // isDisabled={!!defaultValue?.employee_id}
                // value={[defaultValue?.employee_id]}

                // value={form.getValues("employee_id")}
              />
            </HookFormItem>

            <HookFormItem name="date" label="Date" componentType="datePicker">
              <CustomDatePicker
                selected={
                  form.watch("date")
                    ? moment(form.watch("date")).toDate()
                    : null
                }
                onChange={(date: Date | null) => {
                  const formattedDate = date
                    ? moment(date).format("YYYY-MM-DD")
                    : null;
                  if (formattedDate) form.setValue("date", formattedDate);
                }}
                minDate={new Date()}
              />
            </HookFormItem>
            <HookFormItem
              name="start_time"
              label="Start Time"
              componentType="datePicker"
            >
              <CustomDatePicker
                showTimeSelectOnly
                timeIntervals={30}
                selected={selectedStartTime}
                onChange={(date: Date | null) => {
                  const formattedTime = date
                    ? moment(date).format("HH:mm")
                    : null;

                  console.log("formattedTime: ", formattedTime);
                  if (formattedTime) {
                    form.setValue("start_time", formattedTime);
                  }
                }}
                dateFormat="HH:mm"
              />
            </HookFormItem>
            <HookFormItem
              name="end_time"
              label="End Time"
              componentType="datePicker"
            >
              <CustomDatePicker
                showTimeSelectOnly
                timeIntervals={30}
                selected={selectedEndTime}
                onChange={(date: Date | null) => {
                  const formattedTime = date
                    ? moment(date).format("HH:mm")
                    : null;

                  if (formattedTime) {
                    form.setValue("end_time", formattedTime);
                  }
                }}
                dateFormat="HH:mm"
              />
            </HookFormItem>
            <HookFormItem
              name="note"
              label="Shift Notes"
              className="col-span-3"
            >
              <Textarea />
            </HookFormItem>
          </div>

          <div
            className={clsx("flex gap-6 items-center", {
              "justify-between": isInEditMode,
              "justify-end": !isInEditMode,
            })}
          >
            {isInEditMode && (
              <Button
                variant="danger"
                onClick={() => setIsOpenDeleteModal(true)}
                disabled={isDeletingSchedule}
                className="!text-sm"
              >
                Delete
              </Button>
            )}

            {isOpenDeleteModal && (
              <ConfirmationModal
                isOpen={isOpenDeleteModal}
                setIsOpen={setIsOpenDeleteModal}
                title="Confirm Delete"
                description="Are you really want to delete this rota?"
                actions={[
                  {
                    onAction: () => {
                      handleDeleteSchedule();
                    },
                    isLoading: isDeletingSchedule,
                    buttonText: "Delete",
                    variant: "danger",
                  },
                ]}
              />
            )}

            <div className="flex gap-6 items-center justify-end">
              <Button
                variant="secondary"
                onClick={closeModal}
                isDisabled={isAlteringScheduling}
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
                isLoading={isAlteringScheduling}
                className="!text-sm"
              >
                Save
              </Button>
            </div>
          </div>
        </FormProvider>
      </div>
    </Modal>
  );
};

export default RotaModal;
