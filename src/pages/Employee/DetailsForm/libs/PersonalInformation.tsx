import { UseFormReturn } from "react-hook-form";
import HookFormItem from "@/components/shared/hookform/HookFormItem";
import Input from "@/components/common/Input";
import Textarea from "@/components/common/Textarea";
import CustomDatePicker from "@/components/common/CustomDatePicker";
import Dropdown from "@/components/ui/dropdown";
import { getBloodGroupOptions } from "@/lib/shared-static-data";
import moment from "moment";
import { TAlterEmployeeSchema } from "../schema";

interface PersonalInformationProps {
  form: UseFormReturn<TAlterEmployeeSchema>;
}

const PersonalInformation = ({ form }: PersonalInformationProps) => {
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

        <HookFormItem name="address" label="Address" className="col-span-2">
          <Textarea className="input-class" />
        </HookFormItem>
      </div>
    </div>
  );
};

export default PersonalInformation;
