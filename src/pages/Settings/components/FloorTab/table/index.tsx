import { useState } from "react";
import Table from "@/components/common/Table";
import { useGetFloorListQuery } from "@/services/floor";
import { getColumns } from "./columns";

export default function FloorTable() {
  const [currentPageNo, setCurrentPageNo] = useState(1);

  const { data, isLoading, isFetching, isError } = useGetFloorListQuery({
    page: currentPageNo,
  });

  const columns = getColumns();

  const floorsData = data?.data?.floors;

  return (
    <Table
      showSerial
      columns={columns}
      data={floorsData?.data ?? []}
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
        limit: floorsData?.per_page ?? 10,
        offset: (currentPageNo - 1) * (floorsData?.per_page ?? 10),
        currentPage: currentPageNo,
        onPageChange: (page) => {
          setCurrentPageNo(page);
        },
        total: floorsData?.total ?? 0,
      }}
    />
  );
}
