import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { FormProvider, useForm } from "react-hook-form";

import Button from "@/components/ui/button";
import Modal from "@/components/common/Modals";
import Input from "@/components/common/Input";
import Dropdown from "@/components/ui/dropdown";
import HookFormItem from "@/components/shared/hookform/HookFormItem";

import {
  alterEmployeeSchema,
  employeeDefaultValues,
  TAlterEmployeeSchema,
} from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Textarea from "@/components/common/Textarea";
import { getStatusOptions } from "@/lib/shared-static-data";
import {
  useGetDepartmentListQuery,
  useGetRoleListQuery,
} from "@/services/shared";
import { convertToOptions } from "@/lib/dropdown";
import {
  useAlterUserMutation,
  useGetUserDetailsQuery,
} from "@/services/employee";
import { onShowToastMessages } from "@/lib/toast";
import FormSkeleton from "@/components/common/Skeleton";
import { setEmployeeDetails } from "./helper";
import ImageUploader from "@/components/common/ImageUploader";

interface Props {
  employeeId?: number;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const EmployeeModal = ({ employeeId, isOpen, setIsOpen }: Props) => {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const form = useForm<TAlterEmployeeSchema>({
    resolver: zodResolver(alterEmployeeSchema(!!employeeId)),
    defaultValues: employeeDefaultValues,
  });

  // const { formState } = form;

  const { data: departments, isLoading: isLoadingDepartment } =
    useGetDepartmentListQuery();
  const { data: roles, isLoading: isLoadingRoles } = useGetRoleListQuery();

  const { data: employeeDetails } = useGetUserDetailsQuery(employeeId!, {
    skip: !employeeId,
  });

  useEffect(() => {
    setEmployeeDetails(employeeDetails, form);
  }, [employeeDetails, form]);

  const [alterEmployee, { isLoading: isAlteringEmployee }] =
    useAlterUserMutation();

  const closeModal = () => {
    setIsOpen(false);
    form.reset();
  };

  const onSubmit = (data: TAlterEmployeeSchema) => {
    // const payload: AlterEmployeePayload = {
    //   ...data,
    //   designation: data.designation ? String(data.designation) : "0",
    //   department_id: data.department_id ? Number(data.department_id) : 0,
    //   role: data.role ? String(data.role) : "0",
    //   is_active: data.is_active ? Number(data.is_active[0]) : 0,
    //   id: employeeId,
    // };

    const formData = new FormData();

    // ---- required fields
    formData.append("first_name", data.first_name);
    if (data?.last_name) formData.append("last_name", data.last_name);
    formData.append("display_name", data.display_name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);

    formData.append("designation", data.designation);
    formData.append(
      "department_id",
      data.department_id ? String(data.department_id) : "0",
    );
    formData.append("role", data.role ? String(data.role) : "0");
    formData.append(
      "is_active",
      data.is_active ? String(data.is_active[0]) : "0",
    );
    formData.append("password", data.password ?? "");
    formData.append("password_confirmation", data.password_confirmation ?? "");
    formData.append("address", data.address ?? "");

    // ---- update
    if (employeeId) {
      formData.append("id", String(employeeId));
    }

    if (imageFile) {
      formData.append("image", imageFile);
    }

    // ---- image upload
    // if (data.image && data.image.length > 0) {
    //   formData.append("image", data.image[0]);
    // }

    alterEmployee({ id: employeeId, formData })
      .unwrap()
      .then((res) => {
        onShowToastMessages({
          message:
            res?.message ??
            `Employee ${!employeeId ? "created" : "updated"} successfully`,
          type: "success",
        });

        closeModal();
      })
      .catch((err) => {
        onShowToastMessages({
          message: `Failed to  ${!employeeId ? "create" : "update"}  employee`,
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
      title={!employeeId ? "New Employee" : "Update Employee"}
      size="xl"
      closeOnOutsideClick={true}
      closeOnEscape={true}
      // skipOnEscape={formState.isDirty}
    >
      {employeeId && !employeeDetails?.data?.user ? (
        <FormSkeleton
          itemCount={7}
          columns={2}
          layout={[{}, {}, { colSpan: 2 }, {}, {}, {}, {}, { colSpan: 2 }]}
        />
      ) : (
        <div>
          <FormProvider {...form}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <ImageUploader
                onChange={setImageFile}
                layoutClassName="col-span-2 mx-auto"
                imageUrl={
                  employeeId ? employeeDetails?.data?.user?.image_url : null
                }
              />
              <HookFormItem name="first_name" label="First Name" isRequired>
                <Input />
              </HookFormItem>

              <HookFormItem name="last_name" label="Last Name">
                <Input />
              </HookFormItem>

              <HookFormItem name="display_name" label="Display Name" isRequired>
                <Input />
              </HookFormItem>
              <HookFormItem name="designation" label="Designation" isRequired>
                <Input />
              </HookFormItem>

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

              <HookFormItem name="phone" label="Phone" isRequired>
                <Input />
              </HookFormItem>

              <HookFormItem name="email" label="Email" isRequired>
                <Input />
              </HookFormItem>

              <HookFormItem name="password" label="Password" isRequired>
                <Input />
              </HookFormItem>

              <HookFormItem
                name="password_confirmation"
                label="Confirm Password"
                isRequired
              >
                <Input />
              </HookFormItem>

              <HookFormItem
                name="address"
                label="Address"
                className="col-span-2"
              >
                <Textarea className="input-class" />
              </HookFormItem>

              <HookFormItem
                name="is_active"
                label="Status"
                isRequired
                className="col-span-2"
              >
                <Dropdown options={getStatusOptions()} />
              </HookFormItem>
            </div>

            <div className="flex gap-6 items-center justify-end">
              <Button
                variant="secondary"
                onClick={closeModal}
                isDisabled={isAlteringEmployee}
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
                isLoading={isAlteringEmployee}
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

export default EmployeeModal;
