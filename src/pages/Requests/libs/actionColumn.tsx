import Button from "@/components/ui/button";
import { useState } from "react";
import ConfirmationModal from "@/components/common/Modals/ConfirmationModal";
import { useDeleteUserMutation } from "@/services/employee";
import { onShowToastMessages } from "@/lib/toast";
import { EyeIcon } from "@/assets/icons/EyeIcon";
import Badge from "@/components/common/Badge";

interface Props {
  employeeId: number;
}

const ActionColumn = ({ employeeId }: Props) => {
  // const navigate = useNavigate();

  const [isOpenApproveModal, setIsOpenApproveModal] = useState(false);
  const [isOpenRejectModal, setIsOpenRejectModal] = useState(false);

  const [deleteUser, { isLoading: isDeletingUser }] = useDeleteUserMutation();

  const closeDeleteModal = () => {
    setIsOpenRejectModal(false);
  };

  const handleDeleteUser = () => {
    deleteUser(employeeId)
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

  const handleViewUser = () => {
    alert("What to do??");
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
          actions={[
            {
              onAction: () => {
                handleDeleteUser();
              },
              isLoading: isDeletingUser,
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
          actions={[
            {
              onAction: () => {
                handleDeleteUser();
              },
              isLoading: isDeletingUser,
              buttonText: "Reject",
              variant: "danger",
            },
          ]}
        />
      )}

      <Button title="Edit" onClick={handleViewUser}>
        <EyeIcon />
      </Button>
    </div>
  );
};

export default ActionColumn;
