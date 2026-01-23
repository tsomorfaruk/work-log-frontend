import { EmployeeDetailsResponse } from "@/models/employee";
import { UseFormReturn } from "react-hook-form";
import { TAlterEmployeeSchema } from "./schema";

export const setEmployeeDetails = (
  employeeDetails: EmployeeDetailsResponse | undefined,
  form: UseFormReturn<TAlterEmployeeSchema>,
) => {
  if (employeeDetails?.data?.user) {
    const data = employeeDetails.data.user;
    // section - 1

    form.setValue("first_name", data?.first_name);
    form.setValue("last_name", data?.last_name);
    form.setValue("phone", data?.phone);
    form.setValue("email", data?.email);
    if (data?.dob) form.setValue("dob", data.dob);
    form.setValue("address", data?.address ?? "");
    // form.setValue("blood_group", data?.blood_group);
    form.setValue("blood_group", data?.blood_group ? [data.blood_group] : []);

    // section - 2

    form.setValue(
      "department_id",
      data?.department?.id ? [data.department.id] : [],
    );
    form.setValue("role", data?.roles);
    if (data?.day_of_joining)
      form.setValue("day_of_joining", data.day_of_joining);
    if (data?.job_type) form.setValue("job_type", data.job_type);

    // section - 3

    if (data?.bank_acc_name) form.setValue("bank_acc_name", data.bank_acc_name);
    if (data?.bank_acc_number)
      form.setValue("bank_acc_number", data.bank_acc_number);
    if (data?.bank_routing_number)
      form.setValue("bank_routing_number", data.bank_routing_number);
    if (data?.bank_address) form.setValue("bank_address", data.bank_address);

    // form.setValue("image", data?.image_url);
  }
};

export const formatPayload = ({
  data,
  employeeDetails,
}: {
  data: TAlterEmployeeSchema;
  employeeDetails: EmployeeDetailsResponse | undefined;
}): FormData => {
  const employeeData = employeeDetails?.data?.user;

  const formData = new FormData();

  // section - 1

  formData.append("first_name", data.first_name);
  if (data?.last_name) formData.append("last_name", data.last_name);
  formData.append("phone", data.phone);
  formData.append("email", data.email);
  formData.append("address", data.address ?? "");
  if (data?.dob) formData.append("dob", data?.dob);
  if (data?.blood_group) formData.append("blood_group", data?.blood_group?.[0]);

  // section - 2

  formData.append(
    "department_id",
    data.department_id ? String(data.department_id) : "0",
  );
  formData.append("role", data.role ? String(data.role) : "0");

  if (data?.day_of_joining)
    formData.append("day_of_joining", data.day_of_joining);
  if (data?.job_type) formData.append("job_type", data.job_type);

  // section - 3
  if (data?.bank_acc_name) formData.append("bank_acc_name", data.bank_acc_name);
  if (data?.bank_acc_number)
    formData.append("bank_acc_number", data.bank_acc_number);
  if (data?.bank_routing_number)
    formData.append("bank_routing_number", data.bank_routing_number);
  if (data?.bank_address) formData.append("bank_address", data.bank_address);

  // unchanged

  if (employeeData?.is_active !== undefined)
    formData.append("is_active", employeeData.is_active ? "1" : "0");

  return formData;
};
