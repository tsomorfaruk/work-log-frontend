import { TableColumn } from "@/components/common/Table";
import { RequestType } from "@/models/Requests/common";
import { SwapRequestItem } from "@/models/Requests/swap";
import { LeaveRequestItem } from "@/models/Requests/leave";
import SwapActionColumn from "./libs/swapActionColumn";
import { Link } from "react-router-dom";
import LeaveActionColumn from "./libs/leaveActionColumn";

const formatRequestTime = (time: string): string => {
  const [h = "00", m = "00"] = time.split(":");
  return `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
};

export const getColumns = ({
  activeTab,
}: {
  activeTab: RequestType;
  // }): TableColumn<LeaveRequestItem>[] | TableColumn<LeaveRequestItem>[] => {
}): TableColumn<any>[] => {
  const swapsColumn: TableColumn<SwapRequestItem>[] = [
    {
      key: "requested_by",
      header: "Employee",
      width: 160,
      render: (row) => {
        return (
          <Link
            to={`/employees/${row?.my_rota?.employee?.id}`}
            className="text-base xl:text-base text-black hover:text-[#007B99] hover:underline"
          >
            {row?.my_rota?.employee?.name}
          </Link>
        );
      },
    },
    {
      key: "requested_at",
      header: "Requested Shift",
      width: 240,
      render: (row) => {
        return (
          <p className="text-xs font-bold text-[#007B99]">
            {formatRequestTime(row?.requested_rota?.shift_start || "")} -{" "}
            {formatRequestTime(row?.requested_rota?.shift_end || "")}(
            {row?.requested_rota?.date})
          </p>
        );
      },
    },
    {
      key: "my_rota",
      header: "Current Shift",
      width: 240,
      render: (row) => {
        return (
          <p className="text-xs font-bold text-[#BA1A1A]">
            {formatRequestTime(row?.my_rota?.shift_start || "")} -{" "}
            {formatRequestTime(row?.my_rota?.shift_end || "")}(
            {row?.my_rota?.date})
          </p>
        );
      },
    },
    {
      key: "my_rota",
      header: "Actions",
      width: 160,
      render: (row) => {
        if (!row?.approved_at) return <SwapActionColumn requestId={row?.id} />;
      },
      align: "center",
    },
  ];

  const leavesColumn: TableColumn<LeaveRequestItem>[] = [
    {
      key: "requested_by",
      header: "Employee",
      width: 160,
      render: (row) => {
        return (
          <Link
            to={`/employees/${row?.requested?.employee?.id}`}
            className="text-base xl:text-base text-black hover:text-[#007B99] hover:underline"
          >
            {row?.requested?.employee?.name}
          </Link>
        );
      },
    },
    {
      key: "requested",
      header: "Dates",
      width: 160,
      render: (row) => {
        return (
          <p className="text-sm">
            {row?.requested?.from} - {row?.requested?.to}
          </p>
        );
      },
    },
    {
      key: "requested",
      header: "Types",
      width: 160,
      render: (row) => {
        return <p className="text-sm">{row?.leave_type}</p>;
      },
    },
    {
      key: "note",
      header: "Reason",
      width: 160,
      render: (row) => {
        return (
          <>
            <p className="text-sm xl:text-base leading-none font-semibold text-[#454545]">
              {row?.note}
            </p>
          </>
        );
      },
    },
    {
      key: "id",
      header: "Actions",
      width: 160,
      render: (row) => {
        if (!row?.approved_at) return <LeaveActionColumn requestId={row?.id} />;
      },
      align: "center",
    },
  ];

  if (activeTab === "swaps") return swapsColumn;
  return leavesColumn;
};
