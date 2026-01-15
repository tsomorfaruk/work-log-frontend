import { EmployeeDetailsResponse } from "@/models/employee";
import { UseFormReturn } from "react-hook-form";
import { TAlterEmployeeSchema } from "./schema";

export const setEmployeeDetails = (
  employeeDetails: EmployeeDetailsResponse | undefined,
  form: UseFormReturn<TAlterEmployeeSchema>
) => {
  if (employeeDetails?.data?.user) {
    const data = employeeDetails.data.user;
    form.setValue("first_name", data?.first_name);
    form.setValue("last_name", data?.last_name);
    form.setValue("display_name", data?.display_name);

    form.setValue(
      "department_id",
      data?.department?.id ? [data.department.id] : []
    );
    form.setValue("role", data?.roles);

    form.setValue("phone", data?.phone);
    form.setValue("email", data?.email);

    form.setValue("designation", data?.designation);
    form.setValue("is_active", [data?.is_active ? 1 : 0]);
    form.setValue("password", data?.password);
    form.setValue("password_confirmation", data?.password_confirmation);
    // form.setValue("image", data?.image_url);
    form.setValue("address", data?.address ?? "");
  }
};
