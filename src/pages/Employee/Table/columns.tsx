import { TableColumn } from "@/components/common/Table";
import { EmployeeResponse } from "@/models/employee";
import Badge from "@/components/common/Badge";
import ActionColumn from "./libs/employeeModal/libs/actionColumn";

export const getColumns = () => {
  const columns: TableColumn<EmployeeResponse>[] = [
    // { key: "id", header: "ID", width: 80 },
    {
      key: "display_name",
      header: "Name",
      width: 160,
    },
    {
      key: "roles",
      header: "Role",
      width: 160,
      render: (row) => {
        const role = row?.roles?.[0] ?? "";
        return <p className="capitalize">{role}</p>;
      },
    },
    {
      key: "department",
      header: "Department",
      width: 160,
      render: (row) => {
        const role = row?.department?.display_name;
        return <p>{role}</p>;
      },
    },
    { key: "phone", header: "Phone Number", width: 160 },
    {
      key: "is_active",
      header: "Status",
      width: 160,
      render: (row) => {
        const status = row?.is_active ? "Active" : "Inactive";
        return (
          <Badge variant={row?.is_active ? "success" : "error"}>{status}</Badge>
        );
      },
    },
    {
      key: "display_name",
      header: "Actions",
      width: 160,
      render: (row) => {
        return <ActionColumn employeeId={row?.id} />;
      },
      align: "center",
    },
  ];

  return columns;
};
