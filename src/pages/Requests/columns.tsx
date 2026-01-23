import { TableColumn } from "@/components/common/Table";
import { RequestType } from "@/models/Requests/common";
import { SwapRequestItem } from "@/models/Requests/swap";
import { LeaveRequestItem } from "@/models/Requests/leave";
import ActionColumn from "./libs/actionColumn";

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
      render: () => {
        return (
          <div className="flex justify-between">
            <div className="flex gap-6 items-center">
              <img
                src={"image source"}
                alt="DP"
                className="size-10 rounded-3xl object-cover border border-[#007B99]"
              />

              <div>
                <h4 className="text-base xl:text-base text-black">
                  Display Name
                </h4>
                <p className="text-[10px] xl:text-[10px] text-black">Role</p>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      key: "requested_at",
      header: "Types/Dates",
      width: 160,
      render: () => {
        return (
          <>
            <p className="text-sm xl:text-base leading-none font-semibold text-[#BA1A1A] mb-0.5">
              Shift Release
            </p>
            <p className="text-xs leading-none">
              Shift on 16 Oct{" "}
              <span className="text-bold">08:00 - 17:00 Line</span>
            </p>
          </>
        );
      },
    },
    {
      key: "status",
      header: "Details/Reason",
      width: 160,
      render: () => {
        return (
          <>
            <p className="text-sm xl:text-base leading-none font-semibold text-[#454545] mb-0.5">
              Urgent need to leave town.
            </p>
            <p className="text-xs leading-none">
              Warning: Needs approval within 2 hours or shift is uncovered.
            </p>
          </>
        );
      },
    },
    {
      key: "my_rota",
      header: "Actions",
      width: 160,
      render: (row) => {
        return <ActionColumn employeeId={row?.id} />;
      },
      align: "center",
    },
  ];

  const leavesColumn: TableColumn<LeaveRequestItem>[] = [
    {
      key: "requested_by",
      header: "Employee",
      width: 160,
      render: () => {
        return (
          <div className="flex justify-between">
            <div className="flex gap-6 items-center">
              <img
                src={"image source"}
                alt="uploaded"
                className="size-10 rounded-3xl object-cover border border-[#007B99]"
              />

              <div>
                <h4 className="text-sm xl:base text-black">Display Name</h4>
                <p className="text-sm xl:base text-black">Role</p>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      key: "requested",
      header: "Types/Dates",
      width: 160,
      render: () => {
        return (
          <>
            <p className="text-sm xl:text-base leading-none font-semibold text-[#BA1A1A]">
              Shift Release
            </p>
            <p className="text-xs leading-none">
              Shift on 16 Oct{" "}
              <span className="text-bold">08:00 - 17:00 Line</span>
            </p>
          </>
        );
      },
    },
    {
      key: "status",
      header: "Details/Reason",
      width: 160,
      render: () => {
        return (
          <>
            <p className="text-sm xl:text-base leading-none font-semibold text-[#454545]">
              Urgent need to leave town.
            </p>
            <p className="text-xs leading-none">
              Warning: Needs approval within 2 hours or shift is uncovered.
            </p>
          </>
        );
      },
    },
  ];

  if (activeTab === "swaps") return swapsColumn;
  return leavesColumn;
};
