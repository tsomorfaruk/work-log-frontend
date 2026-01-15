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

export const getBloodGroupOptions = (): Option<string>[] => {
  return [
    { label: "A+", value: "A+" },
    { label: "A-", value: "A-" },
    { label: "B+", value: "B+" },
    { label: "B-", value: "B-" },
    { label: "AB+", value: "AB+" },
    { label: "AB-", value: "AB-" },
    { label: "O+", value: "O+" },
    { label: "O-", value: "O-" },
  ];
};
