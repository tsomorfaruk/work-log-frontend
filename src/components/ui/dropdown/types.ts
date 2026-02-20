export interface Option<T = number> {
  label: string;
  value: T;
}

export type DropdownType = "single" | "multi";

export interface DropdownProps<T = number> {
  options: Option<T>[];
  value?: T[];
  onChange?: (value: T[]) => void;

  containerClassname?: string;
  type?: DropdownType;
  placeholder?: string;
  error?: string;
  isLoading?: boolean;
  isSearchable?: boolean;
  label?: string;
  isCreatable?: boolean;
  isClearable?: boolean;
  isDisabled?: boolean;

  onSearch?: (value: string) => void;
  position?: "top" | "bottom";
}
