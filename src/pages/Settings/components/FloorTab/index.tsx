import { useState } from "react";
import Table from "@/components/common/Table";
import Button from "@/components/ui/button";
import { useGetFloorListQuery } from "@/services/floor";
import { getColumns } from "./columns";
import FloorModal from "./FloorModal";

export default function FloorTab() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPageNo, setCurrentPageNo] = useState(1);

  const { data, isLoading, isFetching, isError } = useGetFloorListQuery({
    page: currentPageNo,
  });

  const columns = getColumns();

  const floorsData = data?.data?.floors;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Floor List</h2>
        <Button variant="primary" onClick={() => setIsOpen(true)}>
          + Add New Floor
        </Button>
      </div>

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

      {isOpen && <FloorModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
}
