import { DeleteIcon as CommonDeleteIcon } from "@/assets/icons/DeleteIcon";
import { EditIcon as CommonEditIcon } from "@/assets/icons/EditIcon";
import Button from "@/components/ui/button";
import { useState } from "react";
import ConfirmationModal from "@/components/common/Modals/ConfirmationModal";
import { useDeleteFloorMutation } from "@/services/floor";
import { onShowToastMessages } from "@/lib/toast";
import FloorModal from "./FloorModal";

interface Props {
  floorId: number;
  floorData: {
    name: string;
    branch_id: number;
  };
}

const ActionColumn = ({ floorId, floorData }: Props) => {
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const [deleteFloor, { isLoading: isDeleting }] = useDeleteFloorMutation();

  const handleDelete = () => {
    deleteFloor(floorId)
      .unwrap()
      .then((res) => {
        onShowToastMessages({
          message: res?.message ?? "Floor deleted successfully",
          type: "success",
        });
        setIsOpenDeleteModal(false);
      })
      .catch((err) => {
        onShowToastMessages({
          message: err?.data?.message ?? "Failed to delete floor",
          type: "error",
        });
      });
  };

  return (
    <div className="flex gap-4 items-center justify-center">
      <Button
        title="Edit"
        onClick={() => {
          setIsOpenEditModal(true);
        }}
      >
        <CommonEditIcon />
      </Button>

      {isOpenEditModal && (
        <FloorModal
          floorId={floorId}
          floorData={floorData}
          isOpen={isOpenEditModal}
          setIsOpen={setIsOpenEditModal}
        />
      )}

      <Button title="Delete" onClick={() => setIsOpenDeleteModal(true)}>
        <CommonDeleteIcon />
      </Button>

      {isOpenDeleteModal && (
        <ConfirmationModal
          isOpen={isOpenDeleteModal}
          setIsOpen={setIsOpenDeleteModal}
          title="Confirm Delete"
          description={`Are you sure you want to delete the floor "${floorData.name}"?`}
          actions={[
            {
              onAction: handleDelete,
              isLoading: isDeleting,
              buttonText: "Delete",
              variant: "danger",
            },
          ]}
        />
      )}
    </div>
  );
};

export default ActionColumn;
