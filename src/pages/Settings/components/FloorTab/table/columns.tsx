import { TableColumn } from "@/components/common/Table";
import { Floor } from "@/models/floor";
import ActionColumn from "./actionColumn";

export const getColumns = () => {
  const columns: TableColumn<Floor>[] = [
    {
      key: "name",
      header: "Floor Name",
      width: 200,
    },
    {
      key: "branch",
      header: "Branch",
      width: 200,
      render: (row) => {
        return <p>{row?.branch?.name}</p>;
      },
    },
    {
      key: "id",
      header: "Actions",
      width: 160,
      render: (row) => {
        return (
          <ActionColumn
            floorId={row?.id}
            floorData={{
              name: row?.name,
              branch_id: Number(row?.branch_id),
            }}
          />
        );
      },
      align: "center",
    },
  ];

  return columns;
};
