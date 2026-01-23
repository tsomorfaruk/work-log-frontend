import { UseFormReturn } from "react-hook-form";
import HookFormItem from "@/components/shared/hookform/HookFormItem";
import CustomDatePicker from "@/components/common/CustomDatePicker";
import Dropdown from "@/components/ui/dropdown";
import { convertToOptions } from "@/lib/dropdown";
import moment from "moment";
import { TAlterEmployeeSchema } from "../schema";
import {
  useGetDepartmentListQuery,
  useGetRoleListQuery,
} from "@/services/shared";

interface WorkInformationProps {
  form: UseFormReturn<TAlterEmployeeSchema>;
}

const WorkInformation = ({ form }: WorkInformationProps) => {
  const { data: departments, isLoading: isLoadingDepartment } =
    useGetDepartmentListQuery();
  const { data: roles, isLoading: isLoadingRoles } = useGetRoleListQuery();

  return (
    <div className="p-6">
      <h5 className="form-subsection-title">Work Information</h5>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <HookFormItem name="department_id" label="Department" isRequired>
          <Dropdown
            options={convertToOptions(departments?.data?.departments, {
              labelKey: "display_name",
              valueKey: "id",
            })}
            isLoading={isLoadingDepartment}
            isSearchable
          />
        </HookFormItem>
        <HookFormItem name="role" label="Role" isRequired>
          <Dropdown
            options={convertToOptions(roles?.data?.roles, {
              labelKey: "name",
              valueKey: "name",
            })}
            isLoading={isLoadingRoles}
            isSearchable
          />
        </HookFormItem>

        <HookFormItem
          name="day_of_joining"
          label="Date of Joining"
          componentType="datePicker"
        >
          <CustomDatePicker
            selected={form.watch("day_of_joining")}
            onChange={(date: Date | null) => {
              const formattedDate = date
                ? moment(date).format("YYYY-MM-DD")
                : null;

              if (formattedDate) form.setValue("day_of_joining", formattedDate);
            }}
          />
        </HookFormItem>
        <HookFormItem name="job_type" label="Job Type">
          <Dropdown
            options={convertToOptions(roles?.data?.roles, {
              // ❓this options are not proper
              labelKey: "name",
              valueKey: "name",
            })}
            isLoading={isLoadingRoles}
            isSearchable
          />
        </HookFormItem>
      </div>
    </div>
  );
};

export default WorkInformation;
