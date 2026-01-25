import { Dispatch, SetStateAction } from "react";

import { FormProvider, useForm } from "react-hook-form";

import Button from "@/components/ui/button";
import Modal from "@/components/common/Modals";
import HookFormItem from "@/components/shared/hookform/HookFormItem";

import { zodResolver } from "@hookform/resolvers/zod";

import FormSkeleton from "@/components/common/Skeleton";
// import { setEmployeeDetails } from "./helper";
import {
  alterScheduleSchema,
  scheduleDefaultValues,
  TAlterScheduleSchema,
} from "./schema";
import Dropdown from "@/components/ui/dropdown";
import { useGetUserListQuery } from "@/services/employee";
import { convertToOptions } from "@/lib/dropdown";
import CustomDatePicker from "@/components/common/CustomDatePicker";
import Textarea from "@/components/common/Textarea";
import moment from "moment";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  employeeId?: number | null;
}

const RotaModal = ({ isOpen, setIsOpen, employeeId }: Props) => {
  const form = useForm<TAlterScheduleSchema>({
    // resolver: zodResolver(alterScheduleSchema(!!rotaId)),
    resolver: zodResolver(alterScheduleSchema()),
    defaultValues: scheduleDefaultValues,
    mode: "onTouched",
  });

  console.log(
    "employeeIddddddddddddddddd: ",
    employeeId,
    form.getValues("employee_id"),
  );

  // const { formState } = form;

  //   const { data: employeeDetails } = useGetUserDetailsQuery(employeeId!, {
  //     skip: !employeeId,
  //   });

  //   useEffect(() => {
  //     setEmployeeDetails(employeeDetails, form);
  //   }, [employeeDetails, form]);

  //   const [alterEmployee, { isLoading: isAlteringEmployee }] =
  //     useAlterUserMutation();

  const { data: employeeData, isLoading: isLoadingEmployee } =
    useGetUserListQuery({});

  console.log("employeeData: ", employeeData?.data?.users);
  const closeModal = () => {
    setIsOpen(false);
    form.reset();
  };

  // useEffect(() => {
  //   if (employeeId) {
  //     form.setValue("employee_id", [employeeId]);
  //   }
  // }, [employeeId, form]);

  const onSubmit = (data: TAlterScheduleSchema) => {
    console.log("dataaaaaaaaaaa: ", data);
  };

  const random: number = 10;

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={random === 10 ? "Add Shift" : "Update Employee"}
      size="lg"
      closeOnOutsideClick={true}
      closeOnEscape={true}
    >
      {/* {employeeId && !employeeDetails?.data?.user ? ( */}
      {random === 20 ? (
        <FormSkeleton
          itemCount={7}
          columns={2}
          layout={[{}, {}, { colSpan: 2 }, {}, {}, {}, {}, { colSpan: 2 }]}
        />
      ) : (
        <div>
          <FormProvider {...form}>
            <div className="flex flex-col xl:grid lg:grid-cols-3 gap-6 mb-6">
              <HookFormItem
                name="employee_id"
                label="Employee / Shift Type"
                isRequired
                className="col-span-3"
              >
                <Dropdown
                  options={convertToOptions(employeeData?.data?.users?.data, {
                    labelKey: "display_name",
                    valueKey: "id",
                  })}
                  isLoading={isLoadingEmployee}
                  isSearchable
                  // value={form.getValues("employee_id")}
                />
              </HookFormItem>

              <HookFormItem name="date" label="Date" componentType="datePicker">
                <CustomDatePicker
                  selected={form.watch("date")}
                  onChange={(date: Date | null) => {
                    const formattedDate = date
                      ? moment(date).format("YYYY-MM-DD")
                      : null;
                    if (formattedDate) form.setValue("date", formattedDate);
                  }}
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
                  selected={form.watch("start_time")}
                  onChange={(date: Date | null) => {
                    console.log("date: ", date);
                    const formattedDate = date
                      ? moment(date).format("YYYY-MM-DD")
                      : null;
                    if (formattedDate)
                      form.setValue("start_time", formattedDate);
                  }}
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
                  selected={form.watch("end_time")}
                  onChange={(date: Date | null) => {
                    console.log("date: ", date);
                    const formattedDate = date
                      ? moment(date).format("YYYY-MM-DD")
                      : null;
                    if (formattedDate) form.setValue("end_time", formattedDate);
                  }}
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

            <div className="flex gap-6 items-center justify-end">
              <Button
                variant="secondary"
                onClick={closeModal}
                // isDisabled={isAlteringEmployee}
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
                // isLoading={isAlteringEmployee}
                className="!text-sm"
              >
                Save
              </Button>
            </div>
          </FormProvider>
        </div>
      )}
    </Modal>
  );
};

export default RotaModal;
