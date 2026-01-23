import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FormProvider, useForm } from "react-hook-form";

import Badge from "@/components/common/Badge";
import Button from "@/components/ui/button";

import {
  useAlterUserMutation,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
} from "@/services/employee";

import { onShowToastMessages } from "@/lib/toast";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  alterEmployeeSchema,
  employeeDefaultValues,
  TAlterEmployeeSchema,
} from "./schema";
import { formatPayload, setEmployeeDetails } from "./helper";
import ConfirmationModal from "@/components/common/Modals/ConfirmationModal";
import PersonalInformation from "./libs/PersonalInformation";
import WorkInformation from "./libs/WorkInformation";
import BankInformation from "./libs/BankInformation";

const EmployeeDetailsForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const employeeId = id ? +id : undefined;

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const form = useForm<TAlterEmployeeSchema>({
    resolver: zodResolver(alterEmployeeSchema()),
    defaultValues: employeeDefaultValues,
  });

  const { data: employeeDetails } = useGetUserDetailsQuery(employeeId!, {
    skip: !employeeId,
  });

  useEffect(() => {
    setEmployeeDetails(employeeDetails, form);
  }, [employeeDetails, form]);

  const [alterEmployee, { isLoading: isAlteringEmployee }] =
    useAlterUserMutation();

  const closeModal = () => {
    form.reset();
    navigate("/employees");
  };

  const onSubmit = (data: TAlterEmployeeSchema) => {
    const formData = formatPayload({
      data,
      employeeDetails,
    });

    alterEmployee({
      id: employeeId,
      formData,
    })
      .unwrap()
      .then((res) => {
        onShowToastMessages({
          message: res?.message ?? "Employee updated successfully",
          type: "success",
        });

        closeModal();
      })
      .catch((err) => {
        onShowToastMessages({
          message: "Failed to update employee",
          type: "error",
          data: err?.data?.data,
          shouldExtractFirst: true,
        });
      });
  };

  const [deleteUser, { isLoading: isDeletingUser }] = useDeleteUserMutation();

  const closeDeleteModal = () => {
    setIsOpenDeleteModal(false);
  };

  const handleDeleteUser = () => {
    if (employeeId)
      deleteUser(employeeId)
        .unwrap()
        .then((res) => {
          onShowToastMessages({
            message: res?.message ?? "Employee deleted successfully",
            type: "success",
          });

          navigate("/employees");
          closeDeleteModal();
        })
        .catch((err) => {
          onShowToastMessages({
            message: err?.data?.message ?? "Failed to delete employee",
            type: "error",
          });
        });
  };

  return (
    <div className="shadow-md bg-F2FCFF rounded-3xl">
      <FormProvider {...form}>
        <div className="flex justify-between bg-[#CFE6F1] p-6 mb-6 rounded-tl-3xl rounded-tr-3xl">
          <div className="flex gap-6">
            <img
              src={"image source"}
              alt="uploaded"
              className="w-28 h-28 rounded-3xl object-cover border border-[#007B99]"
            />

            <div>
              <h2 className="text-xl lg:text-2xl font-bold mb-3 text-black">
                {employeeDetails?.data?.user?.display_name}
              </h2>

              <div className="flex gap-3 items-center">
                {employeeDetails?.data?.user?.department?.display_name && (
                  <Badge variant="primary">
                    {employeeDetails.data.user.department.display_name}
                  </Badge>
                )}
                {employeeDetails?.data?.user?.designation && (
                  <Badge variant="primary">
                    {employeeDetails.data.user.designation}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-6 items-center">
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

            <Button
              variant="danger"
              onClick={() => setIsOpenDeleteModal(true)}
              disabled={isAlteringEmployee}
              className="!text-sm"
            >
              Delete
            </Button>
          </div>
        </div>

        {isOpenDeleteModal && (
          <ConfirmationModal
            isOpen={isOpenDeleteModal}
            setIsOpen={setIsOpenDeleteModal}
            title="Confirm Delete"
            description="Are you really want to delete this employee profile?"
            actions={[
              {
                onAction: () => {
                  handleDeleteUser();
                },
                isLoading: isDeletingUser,
                buttonText: "Delete",
                variant: "danger",
              },
            ]}
          />
        )}

        <PersonalInformation form={form} />

        <WorkInformation form={form} />

        <BankInformation />
      </FormProvider>
    </div>
  );
};

export default EmployeeDetailsForm;
