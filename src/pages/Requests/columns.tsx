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
      key: "leave_type",
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

  const handoversColumn: TableColumn<HandoverRequestItem>[] = [
    {
      key: "requested_by",
      header: "Employee",
      width: 200,
      render: (row) => {
        return (
          <Link
            to={`/employees/${row?.rota?.employee?.id}`}
            target="_blank"
            className="flex gap-1.5 items-center text-sm 2xl:text-base leading-none text-black hover:underline"
          >
            <span>{row?.rota?.employee?.name ?? row?.requested_by}</span>
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
      },
      align: "center",
    },
  ];

  if (activeTab === "swaps") return swapsColumn;
  if (activeTab === "handovers") return handoversColumn;
  return leavesColumn;
};
