import { Image } from "@/components/ui/image";
import { TableColumn } from "@/components/common/Table";
import { EmployeeResponse } from "@/models/employee";
// import Badge from "@/components/common/Badge";
import ActionColumn from "./libs/employeeModal/libs/actionColumn";

export const getColumns = (): TableColumn<EmployeeResponse>[] => {
  return [
    // { key: "id", header: "ID", width: 80 },
    {
      key: "display_name",
      header: "Name",
      width: 160,
      render: (row) => {
        return (
          <div className="flex gap-1.5 items-center mb-1 text-sm 2xl:text-base leading-none text-black mb-1 cursor-pointer">
            <Image
              src={row?.image_url!}
              name={row?.display_name}
              alt="user"
              className="w-6 min-w-6 lg:w-6 lg:min-w-6 h-6 min-h-6 lg:h-6 lg:min-h-6 rounded-full object-cover border border-[#007B99]"
            />
            <span>{row?.display_name}</span>
          </div>
        );
      },
    },
    {
      key: "branch",
      header: "Branch",
      width: 160,
      render: (row) => {
        const branch = row?.branch?.name;
        return <p className="capitalize">{branch}</p>;
      },
    },
    {
      key: "floor",
      header: "Floor",
      width: 160,
      render: (row) => {
        const floor = row?.floor?.name;
        return <p className="capitalize">{floor}</p>;
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
    // { key: "phone", header: "Phone Number", width: 160 },
    // {
    //   key: "is_active",
    //   header: "Status",
    //   width: 160,
    //   render: (row) => {
    //     const status = row?.is_active ? "Active" : "Inactive";
    //     return (
    //       <Badge variant={row?.is_active ? "success" : "error"}>{status}</Badge>
    //     );
    //   },
    // },
    {
      key: "id",
      header: "Actions",
      width: 160,
      render: (row) => {
        return <ActionColumn employeeId={row?.id} />;
      },
      align: "center",
    },
  ];
};
