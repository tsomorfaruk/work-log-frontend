import { TableColumn } from "@/components/common/Table";
import { RequestType } from "@/models/Requests/common";
import { SwapRequestItem } from "@/models/Requests/swap";
import { LeaveRequestItem } from "@/models/Requests/leave";
import { HandoverRequestItem } from "@/models/Requests/handover";
import SwapActionColumn from "./libs/swapActionColumn";
import { Link } from "react-router-dom";
import LeaveActionColumn from "./libs/leaveActionColumn";
import HandoverActionColumn from "./libs/handoverActionColumn";
import { Image } from "@/components/ui/image";
import Badge from "@/components/common/Badge";
import { RequestStatusEnum } from "@/services/requests";

const formatRequestTime = (time: string): string => {
  const [h = "00", m = "00"] = time.split(":");
  return `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
};

const StatusBadge = ({ status }: { status: string }) => {
  const s = Number(status);
  if (s === RequestStatusEnum.PENDING)
    return <Badge variant="primary" containerClassname="w-max mx-auto">Pending</Badge>;
  if (s === RequestStatusEnum.APPROVED)
    return <Badge variant="success" containerClassname="w-max mx-auto">Approved</Badge>;
  if (s === RequestStatusEnum.REJECTED)
    return <Badge variant="error" containerClassname="w-max mx-auto">Rejected</Badge>;
  return null;
};

export const getColumns = ({
  activeTab,
}: {
  activeTab: RequestType;
  // }): TableColumn<LeaveRequestItem>[] | TableColumn<LeaveRequestItem>[] => {
}): TableColumn<any>[] => {
  const swapsColumn: TableColumn<SwapRequestItem>[] = [
    // {
    //   key: "requested_by",
    //   header: "Employee",
    //   width: 160,
    //   render: (row) => {
    //     return (
    //       <Link
    //         to={`/employees/${row?.my_rota?.employee?.id}`}
    //         className="text-base xl:text-base text-black hover:text-[#007B99] hover:underline"
    //       >
    //         {row?.my_rota?.employee?.name}
    //       </Link>
    //     );
    //   },
    // },
    {
      key: "requested_at",
      header: "Requested Shift",
      width: 240,
      render: (row) => {
        return (
          <div>
            <Link
              to={`/employees/${row?.requested_rota?.employee?.id}`}
              target="_blank"
              className="flex gap-1.5 items-center mb-1 text-sm 2xl:text-base leading-none text-black mb-1 hover:underline mb-1"
            >
              <Image
                src={row?.requested_rota?.employee?.image_url!}
                name={row?.requested_rota?.employee?.name}
                alt="user"
                className="w-6 min-w-6 h-6 rounded-full object-cover border border-[#007B99]"
              />
              <span>{row?.requested_rota?.employee?.name}</span>
            </Link>{" "}
            <p className="text-xs font-bold text-[#007B99]">
              {formatRequestTime(row?.requested_rota?.shift_start || "")} -{" "}
              {formatRequestTime(row?.requested_rota?.shift_end || "")}(
              {row?.requested_rota?.date})
            </p>
          </div>
        );
      },
    },
    {
      key: "my_rota",
      header: "Current Shift",
      width: 240,
      render: (row) => {
        return (
          <div>
            <Link
              to={`/employees/${row?.my_rota?.employee?.id}`}
              target="_blank"
              className="flex gap-1.5 items-center mb-1 text-sm 2xl:text-base leading-none text-black mb-1 hover:underline mb-1"
            >
              <Image
                src={row?.my_rota?.employee?.image_url!}
                name={row?.my_rota?.employee?.name}
                alt="user"
                className="w-6 min-w-6 h-6 rounded-full object-cover border border-[#ba1a1a]"
              />
              <span>{row?.my_rota?.employee?.name}</span>
            </Link>{" "}
            <p className="text-xs font-bold text-[#BA1A1A]">
              {formatRequestTime(row?.my_rota?.shift_start || "")} -{" "}
              {formatRequestTime(row?.my_rota?.shift_end || "")}(
              {row?.my_rota?.date})
            </p>
          </div>
        );
      },
    },
    {
      key: "id",
      header: "Actions",
      width: 160,
      render: (row) => {
        if (!row?.approved_at) return <SwapActionColumn requestId={row?.id} />;
        return <StatusBadge status={row?.status} />;
      },
      align: "center",
    },
  ];

  const leavesColumn: TableColumn<LeaveRequestItem>[] = [
    {
      key: "requested_by",
      header: "Employee",
      width: 180,
      render: (row) => {
        return (
          <Link
            to={`/employees/${row?.requested?.employee?.id}`}
            target="_blank"
            className="flex gap-1.5 items-center text-sm 2xl:text-base leading-none text-black hover:underline"
          >
            <Image
              src={undefined!}
              name={row?.requested?.employee?.name}
              alt="user"
              className="w-6 min-w-6 h-6 rounded-full object-cover border border-[#007B99]"
            />
            <span>{row?.requested?.employee?.name}</span>
          </Link>
        );
      },
    },
    {
      key: "requested",
      header: "Dates",
      width: 200,
      render: (row) => {
        const from = row?.requested?.from;
        const to = row?.requested?.to;
        const totalDay = row?.requested?.total_day;
        const isSameDay = from === to;
        return (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-semibold text-[#007B99] bg-[#007B99]/10 px-2 py-0.5 rounded">
                {from}
              </span>
              {!isSameDay && (
                <>
                  <span className="text-[#70787C] text-xs">→</span>
                  <span className="text-xs font-semibold text-[#007B99] bg-[#007B99]/10 px-2 py-0.5 rounded">
                    {to}
                  </span>
                </>
              )}
            </div>
            {totalDay && (
              <span className="text-[10px] font-medium text-[#454545]">
                {totalDay} {Number(totalDay) === 1 ? "day" : "days"}
              </span>
            )}
          </div>
        );
      },
    },
    {
      key: "leave_type",
      header: "Types",
      width: 140,
      render: (row) => {
        return <p className="text-sm capitalize">{row?.leave_type}</p>;
      },
    },
    {
      key: "note",
      header: "Reason",
      width: 180,
      render: (row) => {
        return (
          <p className="text-sm xl:text-base leading-none font-semibold text-[#454545]">
            {row?.note}
          </p>
        );
      },
    },
    {
      key: "id",
      header: "Actions",
      width: 160,
      render: (row) => {
        if (!row?.approved_at) return <LeaveActionColumn requestId={row?.id} />;
        return <StatusBadge status={row?.status} />;
      },
      align: "center",
    },
  ];

  const handoversColumn: TableColumn<HandoverRequestItem>[] = [
    {
      key: "requested_by",
      header: "Employee",
      width: 200,
      render: (row) => {
        const name = row?.rota?.employee?.name ?? row?.requested_by;
        return (
          <Link
            to={`/employees/${row?.rota?.employee?.id}`}
            target="_blank"
            className="flex gap-1.5 items-center text-sm 2xl:text-base leading-none text-black hover:underline"
          >
            <Image
              src={undefined!}
              name={name}
              alt="user"
              className="w-6 min-w-6 h-6 rounded-full object-cover border border-[#007B99]"
            />
            <span>{name}</span>
          </Link>
        );
      },
    },
    {
      key: "rota",
      header: "Shift Details",
      width: 240,
      render: (row) => {
        return (
          <div>
            <p className="text-xs font-bold text-[#007B99]">
              {formatRequestTime(row?.rota?.shift_start || "")} -{" "}
              {formatRequestTime(row?.rota?.shift_end || "")} ({row?.rota?.date})
            </p>
            <p className="text-xs text-[#454545] capitalize mt-0.5">
              {row?.rota?.shift_type} shift
            </p>
          </div>
        );
      },
    },
    {
      key: "requested_at",
      header: "Requested At",
      width: 180,
      render: (row) => (
        <p className="text-sm text-[#454545]">
          {new Date(row?.requested_at).toLocaleString()}
        </p>
      ),
    },
    {
      key: "id",
      header: "Actions",
      width: 160,
      render: (row) => {
        if (!row?.approved_at)
          return <HandoverActionColumn requestId={row?.id} />;
        return <StatusBadge status={row?.status} />;
      },
      align: "center",
    },
  ];

  if (activeTab === "swaps") return swapsColumn;
  if (activeTab === "handovers") return handoversColumn;
  return leavesColumn;
};
