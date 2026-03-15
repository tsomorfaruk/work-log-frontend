import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Tab, { TabItem } from "../../components/common/Tab";
import {
  RequestType,
  LeaveRequestTabs,
  SwapRequestTabs,
  HandoverRequestTabs,
} from "@/models/Requests/common";
import { RequestStatusEnum, useGetRequestListQuery } from "@/services/requests";
import {
  SwapRequestItem,
  SwapRequestListResponse,
} from "@/models/Requests/swap";
import {
  LeaveRequestItem,
  LeaveRequestListResponse,
} from "@/models/Requests/leave";
import {
  HandoverRequestItem,
  HandoverRequestListResponse,
} from "@/models/Requests/handover";
import Table from "@/components/common/Table";
import { getColumns } from "./columns";
import SummaryCard from "./summaryCard";
import { SunIcon } from "@/assets/icons/SunIcon";
import { SwapIcon } from "@/assets/icons/SwapIcon";
import { AlertIcon } from "@/assets/icons/AlertIcon";

const tabs: TabItem<RequestType>[] = [
  { title: "Swap", key: "swaps" },
  { title: "Leave", key: "leaves" },
  { title: "Handover", key: "handovers" },
];

const swapRequestTabs: TabItem<SwapRequestTabs>[] = [
  { title: "All", key: "all", value: "" },
  {
    title: "Pending",
    key: "pending",
    value: String(RequestStatusEnum.PENDING),
  },
];

const leaveRequestTabs: TabItem<LeaveRequestTabs>[] = [
  { title: "All", key: "all", value: "" },
  {
    title: "Pending",
    key: "pending",
    value: String(RequestStatusEnum.PENDING),
  },
  {
    title: "Rejected",
    key: "rejected",
    value: String(RequestStatusEnum.REJECTED),
  },
];

const handoverRequestTabs: TabItem<HandoverRequestTabs>[] = [
  {
    title: "Pending",
    key: "pending",
    value: String(RequestStatusEnum.PENDING),
  },
  {
    title: "Accepted",
    key: "accepted",
    value: String(RequestStatusEnum.APPROVED),
  },
];

export default function Requests() {
  const [searchParams] = useSearchParams();

  const initialTab = (): RequestType => {
    const t = searchParams.get("tab") as RequestType | null;
    return t && ["swaps", "leaves", "handovers"].includes(t) ? t : "swaps";
  };

  const initialStatus = (): RequestStatusEnum | undefined => {
    const sub = searchParams.get("sub");
    if (sub) return Number(sub) as RequestStatusEnum;
    const tab = initialTab();
    return tab === "handovers" ? RequestStatusEnum.PENDING : undefined;
  };

  const [activeTab, setActiveTab] = useState<RequestType>(initialTab);
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const [currentTab, setCurrentTab] = useState<
    SwapRequestTabs | LeaveRequestTabs | HandoverRequestTabs
  >("all");

  const [status, setStatus] = useState<undefined | RequestStatusEnum>(
    initialStatus,
  );

  console.log("currentTab: ", currentTab); // will be used later based on API

  const { data, isLoading, isFetching, isError } = useGetRequestListQuery({
    page: currentPageNo,
    type: activeTab,
    status,
  });

  const columns = getColumns({ activeTab });

  const tableData: SwapRequestItem[] | LeaveRequestItem[] | HandoverRequestItem[] =
    activeTab === "swaps"
      ? ((data as SwapRequestListResponse)?.data?.swaps?.data ?? [])
      : activeTab === "handovers"
        ? ((data as HandoverRequestListResponse)?.data?.handovers?.data ?? [])
        : ((data as LeaveRequestListResponse)?.data?.leaves?.data ?? []);

  const paginationData =
    activeTab === "swaps"
      ? (data as SwapRequestListResponse)?.data?.swaps
      : activeTab === "handovers"
        ? (data as HandoverRequestListResponse)?.data?.handovers
        : (data as LeaveRequestListResponse)?.data?.leaves;

  const getSubTabs = () => {
    if (activeTab === "swaps") {
      return (
        <Tab
          tabs={swapRequestTabs}
          urlKey="swaps_sub"
          onTabChange={({ key, value }) => {
            setCurrentTab(key as SwapRequestTabs);
            if (value !== "") setStatus(Number(value));
            else setStatus(undefined);
          }}
          containerClassname="mb-9"
        />
      );
    }
    if (activeTab === "handovers") {
      return (
        <Tab
          tabs={handoverRequestTabs}
          urlKey="handovers_sub"
          onTabChange={({ key, value }) => {
            setCurrentTab(key as HandoverRequestTabs);
            if (value !== "") setStatus(Number(value));
            else setStatus(undefined);
          }}
          defaultTab="pending"
          containerClassname="mb-9"
        />
      );
    }
    return (
      <Tab
        tabs={leaveRequestTabs}
        urlKey="leaves_sub"
        onTabChange={({ key, value }) => {
          setCurrentTab(key as LeaveRequestTabs);
          if (value !== "") setStatus(Number(value));
          else setStatus(undefined);
        }}
        containerClassname="mb-9"
      />
    );
  };

  return (
    <div>
      <h1 className="section-title mb-6">Requests &amp; Approvals</h1>

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
        <Tab
          tabs={tabs}
          urlKey="tab"
          onTabChange={({ key }) => {
            setActiveTab(key as RequestType);
            setCurrentPageNo(1);
            setStatus(
              key === "handovers" ? RequestStatusEnum.PENDING : undefined,
            );
          }}
          defaultTab="swaps"
        />
      </div>

      <Table
        topContent={getSubTabs()}
        containerClassName="p-6"
        radius={{
          header: false,
        }}
        columns={columns}
        key={activeTab}
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
