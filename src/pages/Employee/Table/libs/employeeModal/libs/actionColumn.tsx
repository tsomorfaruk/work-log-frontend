import { DeleteIcon } from "@/assets/icons/DeleteIcon";
// import { EditIcon } from "@/assets/icons/EditIcon";
import Button from "@/components/ui/button";
import EmployeeModal from "..";
import { EditIcon } from "@/assets/icons/EditIcon";
import { useState } from "react";
import ConfirmationModal from "@/components/common/Modals/ConfirmationModal";
import { useDeleteUserMutation } from "@/services/employee";
import { onShowToastMessages } from "@/lib/toast";
import { EyeIcon } from "@/assets/icons/EyeIcon";
import { useNavigate } from "react-router-dom";

interface Props {
  employeeId: number;
}

const ActionColumn = ({ employeeId }: Props) => {
  const navigate = useNavigate();

  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const [deleteUser, { isLoading: isDeletingUser }] = useDeleteUserMutation();

  const closeDeleteModal = () => {
    setIsOpenDeleteModal(false);
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
    navigate(`/employees/${employeeId}`);
  };

  return (
    <div className="flex gap-6 items-center">
      <Button
        title="Edit"
        onClick={() => {
          setIsOpenEditModal(true);
        }}
      >
        <EditIcon />
      </Button>

      {isOpenEditModal && (
        <EmployeeModal
          employeeId={employeeId}
          isOpen={isOpenEditModal}
          setIsOpen={setIsOpenEditModal}
        />
      )}

      <Button title="Delete" onClick={() => setIsOpenDeleteModal(true)}>
        <DeleteIcon />
      </Button>

      {isOpenDeleteModal && (
        <ConfirmationModal
          isOpen={isOpenDeleteModal}
          setIsOpen={setIsOpenDeleteModal}
          title="Confirm Delete"
          description="Are you really want to delete this employee profile?"
          actions={{
            onDelete: () => {
              handleDeleteUser();
            },
            isDeleting: isDeletingUser,
          }}
        />
      )}

      <Button title="Edit" onClick={handleViewUser}>
        <EyeIcon />
      </Button>
    </div>
  );
};

export default ActionColumn;
