import Badge from "@/components/common/Badge";
import { RequestStatusEnum } from "@/services/requests";

const StatusBadge = ({ status }: { status: string }) => {
  const s = Number(status);
  if (s === RequestStatusEnum.PENDING)
    return (
      <Badge variant="primary" containerClassname="w-max mx-auto">
        Pending
      </Badge>
    );
  if (s === RequestStatusEnum.APPROVED)
    return (
      <Badge variant="success" containerClassname="w-max mx-auto">
        Approved
      </Badge>
    );
  if (s === RequestStatusEnum.REJECTED)
    return (
      <Badge variant="error" containerClassname="w-max mx-auto">
        Rejected
      </Badge>
    );
  return null;
};

export default StatusBadge;
