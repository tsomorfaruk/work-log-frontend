import { UseFormReturn } from "react-hook-form";
import HookFormItem from "@/components/shared/hookform/HookFormItem";
import Input from "@/components/common/Input";
import Textarea from "@/components/common/Textarea";
import CustomDatePicker from "@/components/common/CustomDatePicker";
import Dropdown from "@/components/ui/dropdown";
import { getBloodGroupOptions } from "@/lib/shared-static-data";
import moment from "moment";
import { TAlterEmployeeSchema } from "../schema";
import { useGetFloorListQuery } from "@/services/floor";
import { convertToOptions } from "@/lib/dropdown";

interface PersonalInformationProps {
  form: UseFormReturn<TAlterEmployeeSchema>;
}

const PersonalInformation = ({ form }: PersonalInformationProps) => {
  const { data: floorData, isLoading: isLoadingFloors } = useGetFloorListQuery(
    {},
  );

  return (
    <div className="p-6">
      <h5 className="form-subsection-title">Personal Information</h5>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <HookFormItem name="first_name" label="First Name" isRequired>
          <Input />
        </HookFormItem>

        <HookFormItem name="last_name" label="Last Name">
          <Input />
        </HookFormItem>

        <HookFormItem name="display_name" label="Display Name" isRequired>
          <Input />
        </HookFormItem>

        <HookFormItem name="employee_id" label="Employee ID" isRequired>
          <Input />
        </HookFormItem>

        <HookFormItem name="phone" label="Phone" isRequired>
          <Input />
        </HookFormItem>

        <HookFormItem name="phone" label="Phone" isRequired>
          <Input />
        </HookFormItem>

        <HookFormItem name="email" label="Email" isRequired>
          <Input />
        </HookFormItem>

        <HookFormItem
          name="dob"
          label="Date of Birth"
          componentType="datePicker"
        >
          <CustomDatePicker
            selected={form.watch("dob")}
            onChange={(date: Date | null) => {
              const formattedDate = date
                ? moment(date).format("YYYY-MM-DD")
                : null;

              if (formattedDate) form.setValue("dob", formattedDate);
            }}
          />
        </HookFormItem>

        <HookFormItem name="blood_group" label="Blood Group">
          <Dropdown options={getBloodGroupOptions()} isSearchable />
        </HookFormItem>

        <div>
          {(floorData?.data?.floors?.data?.length ?? 0) > 1 && (
            <HookFormItem
              name="floor_id"
              label="Floor"
              className="col-span-1 xl:col-span-3 lg:col-span-3"
              isRequired
            >
              <Dropdown
                options={convertToOptions(floorData?.data?.floors?.data, {
                  labelKey: "code_name",
                  valueKey: "id",
                })}
                isLoading={isLoadingFloors}
                placeholder="Select a floor"
              />
            </HookFormItem>
          )}
        </div>

        <HookFormItem name="address" label="Address" className="col-span-2">
          <Textarea className="input-class" />
        </HookFormItem>
      </div>
    </div>
  );
};

export default PersonalInformation;
