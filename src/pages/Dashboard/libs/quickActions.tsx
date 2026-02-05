import { LayerAddIcon } from "@/assets/icons/LayerAddIcon";
import { MailSendIcon } from "@/assets/icons/MailSendIcon";
import { PlusIcon } from "@/assets/icons/PlusIcon";
import Button from "@/components/ui/button";
import EmployeeModal from "@/pages/Employee/Table/libs/employeeModal";
import RotaModal from "@/pages/Scheduling/components/modals";
import { useState } from "react";

const QuickActions = () => {
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenScheduleModal, setIsOpenScheduleModal] = useState(false);

  return (
    <div className="card-wrapper">
      <h4 className="card-title mb-5">Quick Actions</h4>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-6 justify-between items-center">
        <Button
          variant="neutral"
          icon={<PlusIcon />}
          onClick={() => {
            setIsOpenEditModal(true);
          }}
        >
          Add Employee
        </Button>

        <Button
          variant="neutral"
          icon={<LayerAddIcon />}
          onClick={() => setIsOpenScheduleModal(true)}
        >
          Add Schedule
        </Button>

        <Button variant="neutral" icon={<MailSendIcon />}>
          Send Update
        </Button>
      </div>

      {isOpenEditModal && (
        <EmployeeModal
          isOpen={isOpenEditModal}
          setIsOpen={setIsOpenEditModal}
        />
      )}

      {isOpenScheduleModal && (
        <RotaModal
          isOpen={isOpenScheduleModal}
          setIsOpen={setIsOpenScheduleModal}
        />
      )}
    </div>
  );
};

export default QuickActions;
