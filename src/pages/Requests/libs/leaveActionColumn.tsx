import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import moment from "moment";

import ConfirmationModal from "@/components/common/Modals/ConfirmationModal";
import { onShowToastMessages } from "@/lib/toast";
import Badge from "@/components/common/Badge";
import {
  RequestStatusEnum,
  useModifyRequestStatusMutation,
} from "@/services/requests";
import CustomDatePicker from "@/components/common/CustomDatePicker";
import HookFormItem from "@/components/shared/hookform/HookFormItem";

// ─── Zod schema factory — receives the requested range for min/max validation ─
const buildApproveDateSchema = (minDate: string, maxDate: string) =>
  z
    .object({
      approved_from_date: z.string().min(1, "From date is required"),
      approved_to_date: z.string().min(1, "To date is required"),
    })
    .refine(
      (data) =>
        !data.approved_from_date ||
        !data.approved_to_date ||
        moment(data.approved_to_date).isSameOrAfter(
          moment(data.approved_from_date),
        ),
      {
        message: "To date must be on or after From date",
        path: ["approved_to_date"],
      },
    )
    .refine(
      (data) =>
        !data.approved_from_date ||
        moment(data.approved_from_date).isSameOrAfter(moment(minDate)),
      {
        message: `From date cannot be before ${minDate}`,
        path: ["approved_from_date"],
      },
    )
    .refine(
      (data) =>
        !data.approved_to_date ||
        moment(data.approved_to_date).isSameOrBefore(moment(maxDate)),
      {
        message: `To date cannot be after ${maxDate}`,
        path: ["approved_to_date"],
      },
    );

type TApproveDateSchema = {
  approved_from_date: string;
  approved_to_date: string;
};

// ─── Component ────────────────────────────────────────────────────────────────

interface Props {
  requestId: number;
  /** requested.from from the API response — used as default & minDate */
  requestedFrom?: string;
  /** requested.to from the API response — used as default & maxDate */
  requestedTo?: string;
}

const LeaveActionColumn = ({
  requestId,
  requestedFrom = "",
  requestedTo = "",
}: Props) => {
  const [isOpenApproveModal, setIsOpenApproveModal] = useState(false);
  const [isOpenRejectModal, setIsOpenRejectModal] = useState(false);

  const [modifyRequestStatus, { isLoading: isModifying }] =
    useModifyRequestStatusMutation();

  // Form for approve dates — defaults to the requested range
  const approveForm = useForm<TApproveDateSchema>({
    resolver: zodResolver(
      buildApproveDateSchema(requestedFrom, requestedTo),
    ),
    defaultValues: {
      approved_from_date: requestedFrom,
      approved_to_date: requestedTo,
    },
    mode: "all",
  });

  const closeApproveModal = () => {
    setIsOpenApproveModal(false);
    approveForm.reset({
      approved_from_date: requestedFrom,
      approved_to_date: requestedTo,
    });
  };

  const closeRejectModal = () => {
    setIsOpenRejectModal(false);
  };

  const handleModifyStatus = ({
    noteValue,
    status,
    approved_from_date,
    approved_to_date,
  }: {
    noteValue: string | null;
    status: RequestStatusEnum;
    approved_from_date?: string;
    approved_to_date?: string;
  }) => {
    const formData = new FormData();

    formData.append("status", `${status}`);
    formData.append("note", noteValue ?? "");

    if (approved_from_date) {
      formData.append("approved_from_date", approved_from_date);
    }
    if (approved_to_date) {
      formData.append("approved_to_date", approved_to_date);
    }

    modifyRequestStatus({ requestId, formData, type: "leaves" })
      .unwrap()
      .then((res) => {
        onShowToastMessages({
          message: res?.message ?? "Request approved successfully",
          type: "success",
        });

        closeApproveModal();
        closeRejectModal();
      })
      .catch((err) => {
        onShowToastMessages({
          message: err?.data?.message ?? "Failed to update request",
          type: "error",
        });
      });
  };

  const fromDateValue = approveForm.watch("approved_from_date");

  // Derived Date objects for picker constraints
  const minDateObj = requestedFrom ? moment(requestedFrom).toDate() : undefined;
  const maxDateObj = requestedTo ? moment(requestedTo).toDate() : undefined;

  return (
    <div className="flex gap-6 items-center w-max mx-auto">
      <Badge
        variant="success"
        containerClassname="w-max"
        onClick={() => {
          setIsOpenApproveModal(true);
        }}
      >
        Approve
      </Badge>

      {isOpenApproveModal && (
        <ConfirmationModal
          isOpen={isOpenApproveModal}
          setIsOpen={(open) => {
            if (!open) closeApproveModal();
            else setIsOpenApproveModal(true);
          }}
          title="Confirm Approve"
          description="Are you really want to approve this request?"
          note
          actions={[
            {
              onAction: ({ noteValue }) => {
                approveForm.handleSubmit((values) => {
                  handleModifyStatus({
                    noteValue,
                    status: RequestStatusEnum.APPROVED,
                    approved_from_date: values.approved_from_date,
                    approved_to_date: values.approved_to_date,
                  });
                })();
              },
              isLoading: isModifying,
              buttonText: "Approve",
              variant: "success",
            },
          ]}
        >
          <FormProvider {...approveForm}>
            <div className="flex flex-col gap-4 mt-4">
              <HookFormItem
                name="approved_from_date"
                label="Approved From Date"
                isRequired
                componentType="datePicker"
              >
                <CustomDatePicker
                  selected={
                    fromDateValue ? moment(fromDateValue).toDate() : null
                  }
                  onChange={(date: Date | null) => {
                    const formatted = date
                      ? moment(date).format("YYYY-MM-DD")
                      : "";
                    approveForm.setValue("approved_from_date", formatted, {
                      shouldValidate: true,
                    });
                    // Re-validate to date when from changes
                    approveForm.trigger("approved_to_date");
                  }}
                  minDate={minDateObj}
                  maxDate={maxDateObj}
                />
              </HookFormItem>

              <HookFormItem
                name="approved_to_date"
                label="Approved To Date"
                isRequired
                componentType="datePicker"
              >
                <CustomDatePicker
                  selected={
                    approveForm.watch("approved_to_date")
                      ? moment(approveForm.watch("approved_to_date")).toDate()
                      : null
                  }
                  onChange={(date: Date | null) => {
                    const formatted = date
                      ? moment(date).format("YYYY-MM-DD")
                      : "";
                    approveForm.setValue("approved_to_date", formatted, {
                      shouldValidate: true,
                    });
                  }}
                  // Must be >= selected from date, and within the requested range
                  minDate={
                    fromDateValue
                      ? moment(fromDateValue).toDate()
                      : minDateObj
                  }
                  maxDate={maxDateObj}
                />
              </HookFormItem>
            </div>
          </FormProvider>
        </ConfirmationModal>
      )}

      <Badge
        variant="error"
        containerClassname="w-max"
        onClick={() => setIsOpenRejectModal(true)}
      >
        Decline
      </Badge>

      {isOpenRejectModal && (
        <ConfirmationModal
          isOpen={isOpenRejectModal}
          setIsOpen={setIsOpenRejectModal}
          title="Confirm Reject"
          description="Are you really want to reject this request?"
          note
          actions={[
            {
              onAction: ({ noteValue }) => {
                handleModifyStatus({
                  noteValue,
                  status: RequestStatusEnum.REJECTED,
                });
              },
              isLoading: isModifying,
              buttonText: "Reject",
              variant: "danger",
            },
          ]}
        />
      )}
    </div>
  );
};

export default LeaveActionColumn;
