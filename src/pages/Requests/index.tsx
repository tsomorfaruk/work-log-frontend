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
import { ReloadIcon } from "@/assets/icons";
import Button from "@/components/ui/button";

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

// Map from tab type → its URL sub-param key
const subParamKey: Record<RequestType, string> = {
  swaps: "swaps_sub",
  leaves: "leaves_sub",
  handovers: "handovers_sub",
};

// All sub-tab definitions in one place for lookup
const allSubTabs = {
  swaps: swapRequestTabs,
  leaves: leaveRequestTabs,
  handovers: handoverRequestTabs,
};

export default function Requests() {
  const [searchParams] = useSearchParams();

  const initialTab = (): RequestType => {
    const t = searchParams.get("tab") as RequestType | null;
    return t && ["swaps", "leaves", "handovers"].includes(t) ? t : "swaps";
  };

  const initialCurrentTab = ():
    | SwapRequestTabs
    | LeaveRequestTabs
    | HandoverRequestTabs => {
    const tab = initialTab();
    const subKey = subParamKey[tab];
    const fromUrl = searchParams.get(subKey);
    const subTabs = allSubTabs[tab] as TabItem<any>[];
    const match = fromUrl && subTabs.find((t) => t.key === fromUrl);
    if (match) return match.key;
    // handovers defaults to "pending"
    if (tab === "handovers") return "pending";
    return "all";
  };

  const initialStatus = (): RequestStatusEnum | undefined => {
    const tab = initialTab();
    const subKey = subParamKey[tab];
    const fromUrl = searchParams.get(subKey);
    const subTabs = allSubTabs[tab] as TabItem<any>[];
    const match = fromUrl && subTabs.find((t) => t.key === fromUrl);
    if (match && match.value !== "")
      return Number(match.value) as RequestStatusEnum;
    // handovers always starts on pending when no sub param
    if (tab === "handovers") return RequestStatusEnum.PENDING;
    return undefined;
  };

  const [activeTab, setActiveTab] = useState<RequestType>(initialTab);
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const [currentTab, setCurrentTab] = useState<
    SwapRequestTabs | LeaveRequestTabs | HandoverRequestTabs
  >(initialCurrentTab);

  const [status, setStatus] = useState<undefined | RequestStatusEnum>(
    initialStatus,
  );

  console.log("currentTab: ", currentTab); // will be used later based on API

  const { data, isLoading, isFetching, isError, refetch } =
    useGetRequestListQuery({
      page: currentPageNo,
      type: activeTab,
      status,
    });

  const columns = getColumns({ activeTab });

  const tableData:
    | SwapRequestItem[]
    | LeaveRequestItem[]
    | HandoverRequestItem[] =
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
      <div className="reload-btn-div-wrapper">
        <Button icon={<ReloadIcon />} onClick={refetch} title="Refresh" />
        <h1 className="section-title">Requests &amp; Approvals</h1>
      </div>

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
