import { Option } from "@/components/ui/dropdown/types";

export const getStatusOptions = (filterValue?: number): Option[] => {
  const data: Option[] = [
    { label: "Active", value: 1 },
    { label: "Inactive", value: 0 },
  ];

  if (filterValue) {
    return data.filter((opt) => opt.value === filterValue);
  }

  return data;
};
