import { useState } from "react";

import Table from "@/components/common/Table";
// import Dropdown from "@/components/ui/dropdown";

import { useGetUserListQuery } from "@/services/employee";

import EmployeeModal from "./libs/employeeModal";
import Button from "@/components/ui/button";
import { getColumns } from "./columns";

export default function Employees() {
  // const [value, setValue] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPageNo, setCurrentPageNo] = useState(1);

  const { data, isLoading, isFetching, isError } = useGetUserListQuery({
    page: currentPageNo,
  });
  const columns = getColumns();

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="section-title">Employee List</h1>

        <div className="flex gap-6 items-center">
          {/* <Dropdown
            // label="Users"
            type="multi"
            options={[
              { label: "Admin", value: "admin" },
              { label: "Editor", value: "editor" },
            ]}
            value={value}
            onChange={setValue}
            isSearchable
          /> */}
          <Button
            variant="primary"
            className="min-w-max"
            onClick={() => setIsOpen(true)}
          >
            + Add New Employee
          </Button>

          {isOpen && <EmployeeModal isOpen={isOpen} setIsOpen={setIsOpen} />}
        </div>
      </div>

      <Table
        showSerial
        columns={columns}
        data={data?.data?.users?.data ?? []}
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
          // limit: currentPageNo * (data?.data?.users?.per_page ?? 1),
          limit: data?.data?.users?.per_page ?? 1,
          offset: currentPageNo * (data?.data?.users?.per_page ?? 1),
          currentPage: currentPageNo,
          onPageChange: (page) => {
            setCurrentPageNo(page);
          },
          total: data?.data?.users?.total ?? 0,
        }}
      />
    </div>
  );
}
