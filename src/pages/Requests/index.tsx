import { useState } from "react";
import Tab, { TabItem } from "../../components/common/Tab";
import {
  RequestType,
  ShiftRequestTabs,
  SwapRequestTabs,
} from "@/models/Requests/common";
import { useGetRequestListQuery } from "@/services/requests";
import {
  SwapRequestItem,
  SwapRequestListResponse,
} from "@/models/Requests/swap";
import {
  LeaveRequestItem,
  LeaveRequestListResponse,
} from "@/models/Requests/leave";
import Table from "@/components/common/Table";
import { getColumns } from "./columns";
import SummaryCard from "./summaryCard";
import { SunIcon } from "@/assets/icons/SunIcon";
import { SwapIcon } from "@/assets/icons/SwapIcon";
import { AlertIcon } from "@/assets/icons/AlertIcon";

const tabs: TabItem<RequestType>[] = [
  { title: "Swap", key: "swaps" },
  { title: "Leave", key: "leaves" },
];

const swapRequestTabs: TabItem<SwapRequestTabs>[] = [
  { title: "Pending Requests", key: "pending" },
];

const shiftRequestTabs: TabItem<ShiftRequestTabs>[] = [
  { title: "Pending Requests", key: "pending" },
];

export default function Requests() {
  const [activeTab, setActiveTab] = useState<RequestType>("swaps");
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const [currentTab, setCurrentTab] = useState<
    SwapRequestTabs | ShiftRequestTabs
  >("pending");

  console.log("currentTab: ", currentTab); // will be used later based on API

  const { data, isLoading, isFetching, isError } = useGetRequestListQuery({
    page: currentPageNo,
    type: activeTab,
  });

  const columns = getColumns({ activeTab });

  const tableData: SwapRequestItem[] | LeaveRequestItem[] =
    activeTab === "swaps"
      ? ((data as SwapRequestListResponse)?.data?.swaps?.data ?? [])
      : ((data as LeaveRequestListResponse)?.data?.leaves?.data ?? []);

  const paginationData =
    activeTab === "swaps"
      ? (data as SwapRequestListResponse)?.data?.swaps
      : (data as LeaveRequestListResponse)?.data?.leaves;

  return (
    <div>
      <h1 className="section-title mb-6">Requests & Approvals</h1>

      <div className="mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-6 mb-6">
          <SummaryCard
            type="success"
            count={10.5}
            title={"Total Pending Days"}
            icon={<SunIcon />}
          />

          <SummaryCard
            type="pending"
            count={3}
            title={"Shift Swaps"}
            icon={<SwapIcon />}
          />

          <SummaryCard
            type="danger"
            count={1}
            title={"Urgent Conflicts"}
            icon={<AlertIcon />}
          />
        </div>
        <Tab tabs={tabs} onTabChange={setActiveTab} defaultTab="swaps" />
      </div>

      <Table
        topContent={
          activeTab === "swaps" ? (
            <Tab
              tabs={swapRequestTabs}
              onTabChange={setCurrentTab}
              defaultTab="pending"
              containerClassname="mb-9"
            />
          ) : (
            <Tab
              tabs={shiftRequestTabs}
              onTabChange={setCurrentTab}
              defaultTab="pending"
              containerClassname="mb-9"
            />
          )
        }
        containerClassName="p-6"
        radius={{
          header: false,
        }}
        columns={columns}
        data={tableData}
        border={{
          table: false,
          rows: false,
          columns: false,
        }}
        striped={true}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        pagination={{
          limit: paginationData?.per_page ?? 1,
          offset: (currentPageNo - 1) * (paginationData?.per_page ?? 1),
          currentPage: currentPageNo,
          onPageChange: (page) => {
            setCurrentPageNo(page);
          },
          total: paginationData?.total ?? 0,
        }}
      />
    </div>
  );
}
