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
import { useGetFloorListQuery } from "@/services/floor";
// import ShiftLeaveSelector from "./libs/ShiftLeaveSelector";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  employeeId?: number | null;
  defaultValue?: Partial<AlterSchedulingPayload> | null;
  rotaId?: number;
}

const RotaModal = ({ isOpen, setIsOpen, defaultValue, rotaId }: Props) => {
  const form = useForm<TAlterScheduleSchema>({
    resolver: (data, context, options) => {
      // React Hook Form evaluates this function whenever it needs to validate
      return zodResolver(alterScheduleSchema(data?.leave_type))(
        data,
        context,
        options,
      );
    },
    defaultValues: scheduleDefaultValues,
    mode: "all",
  });

  const { data: floorData, isLoading: isLoadingFloors } = useGetFloorListQuery(
    {},
  );

  const isInEditMode =
    !!defaultValue?.start_time ||
    !!defaultValue?.leave_type ||
    !!defaultValue?.employee_id;

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

  // Pre-select logic for shifts and leaves based on defaultValue
  // useEffect(() => {
  //   if (defaultValue?.leave_type) {
  //     setSelectedLeave(defaultValue.leave_type);
  //     return;
  //   }

  //   if (defaultValue?.start_time && defaultValue?.end_time) {
  //     // Find matching shift
  //     const dayShifts = [
  //       { code: "LD", start: "08:00", end: "20:00" },
  //       ...(floorData?.data?.floors?.data || []).map((f: any) => ({
  //         code: `L${f.code_name}`,
  //         start: "08:00",
  //         end: "20:00",
  //       })),
  //     ];

  //     const nightShifts = [
  //       { code: "ND", start: "20:00", end: "08:00" },
  //       ...(floorData?.data?.floors?.data || []).map((f: any) => ({
  //         code: `N${f.code_name}`,
  //         start: "20:00",
  //         end: "08:00",
  //       })),
  //     ];

  //     const allShifts = [...dayShifts, ...nightShifts];
  //     const match = allShifts.find(
  //       (s) =>
  //         s.start === defaultValue.start_time?.substring(0, 5) &&
  //         s.end === defaultValue.end_time?.substring(0, 5),
  //     );

  //     if (match) {
  //       setSelectedShift(match.code);
  //     }
  //   }
  // }, [defaultValue, floorData]);

  // Auto-select floor if only 1 exists
  useEffect(() => {
    if (!isInEditMode && floorData?.data?.floors?.data?.length === 1) {
      const singleFloorId = floorData.data.floors.data[0].id;
      setSelectedFloorId(singleFloorId);
      form.setValue("floor_id", [singleFloorId]);
    }
  }, [floorData, isInEditMode]);

  const startTimeValue = form.watch("start_time");

  console.log("😅😅😅😅", startTimeValue);
  const endTimeValue = form.watch("end_time");

  const selectedStartTime = startTimeValue
    ? moment(startTimeValue, "HH:mm").toDate()
    : null;
  const selectedEndTime = endTimeValue
    ? moment(endTimeValue, "HH:mm").toDate()
    : null;

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const [selectedFloorId, setSelectedFloorId] = useState<number | null>(null);
  // const [selectedShift, setSelectedShift] = useState<string | null>(null);
  // const [selectedLeave, setSelectedLeave] = useState<string | null>(null);

  const { data: employeeData, isLoading: isLoadingEmployee } =
    useGetScheduleUserListQuery({ floor_id: selectedFloorId || undefined });

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
      leave_type: data.leave_type,
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

  const isSpecificEmployeeAdd = !!defaultValue?.employee_id;
  const isSpecificEmployeeEdit =
    !!defaultValue?.employee_id &&
    !!defaultValue?.start_time &&
    !!defaultValue?.end_time;

  // Try to find the employee name for the title (used for both add and edit)
  const employeeDisplayName =
    isSpecificEmployeeAdd || isSpecificEmployeeEdit
      ? employeeData?.data?.users?.find(
          (u: any) => u.id === defaultValue?.employee_id,
        )?.name || "Employee"
      : "";

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={
        isSpecificEmployeeEdit
          ? `Update Rota for ${employeeDisplayName}`
          : isSpecificEmployeeAdd
            ? `Create Rota for ${employeeDisplayName}`
            : "Create Rota"
      }
      size="lg"
      closeOnOutsideClick={true}
      closeOnEscape={true}
    >
      <div>
        <FormProvider {...form}>
          <div className="flex flex-col xl:grid lg:grid-cols-3 gap-6 mb-6">
            {!isSpecificEmployeeEdit && (
              <>
                {(floorData?.data?.floors?.data?.length ?? 0) > 1 && (
                  <HookFormItem
                    name="floor_id"
                    label="Floor"
                    className="col-span-1 xl:col-span-3 lg:col-span-3"
                  >
                    <Dropdown
                      options={convertToOptions(floorData?.data?.floors?.data, {
                        labelKey: "code_name",
                        valueKey: "id",
                      })}
                      // value={selectedFloorId ? [selectedFloorId] : []}
                      onChange={(val) => {
                        setSelectedFloorId(val[0] || null);
                        // form.setValue("floor_id", val[0] || null);
                        form.setValue("employee_id", []); // Reset employee
                      }}
                      isLoading={isLoadingFloors}
                      isClearable
                      placeholder="Select a floor"
                    />
                  </HookFormItem>
                )}

                <HookFormItem
                  name="employee_id"
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
                    isDisabled={isInEditMode}
                  />
                </HookFormItem>
              </>
            )}

            {/* <ShiftLeaveSelector
              floors={floorData?.data?.floors?.data || []}
              selectedShift={selectedShift}
              onShiftSelect={(shiftCode, start, end) => {
                setSelectedShift(shiftCode);
                if (start && end) {
                  form.setValue("start_time", start);
                  form.setValue("end_time", end);
                } else if (!shiftCode) {
                  form.setValue("start_time", "");
                  form.setValue("end_time", "");
                }
              }}
              selectedLeave={selectedLeave}
              onLeaveSelect={(leaveCode) => {
                setSelectedLeave(leaveCode);
                if (leaveCode) {
                  form.setValue("leave_type", leaveCode);
                  form.trigger(["start_time", "end_time"]); // Clear errors immediately
                } else {
                  form.setValue("leave_type", undefined);
                  form.trigger(["start_time", "end_time"]); // Re-validate if un-selected
                }
              }}
            /> */}

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
                // disabled={isInEditMode}
              />
            </HookFormItem>
            <HookFormItem
              name="start_time"
              label="Start Time"
              componentType="datePicker"
              isRequired={!form.watch("leave_type")}
            >
              <CustomDatePicker
                showTimeSelectOnly
                timeIntervals={60}
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
              isRequired={!form.watch("leave_type")}
            >
              <CustomDatePicker
                showTimeSelectOnly
                timeIntervals={60}
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
