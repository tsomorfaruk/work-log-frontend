import { useState } from "react";
import ConfirmationModal from "@/components/common/Modals/ConfirmationModal";
import { onShowToastMessages } from "@/lib/toast";
import Badge from "@/components/common/Badge";
import {
  RequestStatusEnum,
  useModifyRequestStatusMutation,
} from "@/services/requests";

interface Props {
  requestId: number;
}

const LeaveActionColumn = ({ requestId }: Props) => {
  // const navigate = useNavigate();

  const [isOpenApproveModal, setIsOpenApproveModal] = useState(false);
  const [isOpenRejectModal, setIsOpenRejectModal] = useState(false);

  const [modifyRequestStatus, { isLoading: isModifying }] =
    useModifyRequestStatusMutation();

  const closeDeleteModal = () => {
    setIsOpenRejectModal(false);
  };

  const handleModifyStatus = ({
    noteValue,
    status,
  }: {
    noteValue: string | null;
    status: RequestStatusEnum;
  }) => {
    const formData = new FormData();

    formData.append("status", `${status}`);
    formData.append("note", noteValue ?? "");

    modifyRequestStatus({ requestId, formData, type: "leaves" })
      .unwrap()
      .then((res) => {
        onShowToastMessages({
          message: res?.message ?? "Employee deleted successfully",
          type: "success",
        });

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
          setIsOpen={setIsOpenApproveModal}
          title="Confirm Approve"
          description="Are you really want to approve this request?"
          note
          actions={[
            {
              onAction: ({ noteValue }) => {
                handleModifyStatus({
                  noteValue,
                  status: RequestStatusEnum.APPROVED,
                });
              },
              isLoading: isModifying,
              buttonText: "Approve",
              variant: "success",
            },
          ]}
        />
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
