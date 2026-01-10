import { useClickOutside } from "@/hooks/useClickOutside";
import { useMemo, useRef, useState } from "react";
import { DropdownProps } from "./types";
import Label from "@/components/common/Label";
import { ChevronDown } from "lucide-react";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useDropdownPosition } from "./hooks/useDropdownPosition";

const Dropdown = ({
  options,
  value,
  onChange,
  type = "single",
  placeholder = "Select options...",
  error,
  isLoading = false,
  isSearchable = false,
  label,
  //   isCreatable = false,
  position = "bottom", // default bottom
  onSearch,
}: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEscapeKey(() => {
    setIsOpen(false);
  });

  useClickOutside(dropdownRef, () => setIsOpen(false));
  const dropdownPosition = useDropdownPosition(dropdownRef, position);

  const selectedLabels = useMemo(() => {
    return options
      .filter((opt) => value?.includes(opt.value))
      .map((opt) => opt.label)
      .join(", ");
  }, [options, value]);

  const filteredOptions = useMemo(() => {
    if (!search) return options;
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [options, search]);

  const handleSelect = (optionValue: string) => {
    if (type === "single") {
      onChange?.([optionValue]);
      setIsOpen(false);
      return;
    }

    if (value?.includes(optionValue)) {
      onChange?.(value.filter((v) => v !== optionValue));
    } else {
      // onChange?.([...value, optionValue]);
      onChange?.([...(value ?? []), optionValue]);
    }
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      {label && (
        <Label className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </Label>
      )}

      {/* Trigger */}
      <div
        onClick={() => setIsOpen((p) => !p)}
        className={`flex min-h-[42px] cursor-pointer items-center justify-between rounded-md border px-3 py-2 text-sm
          ${error ? "border-red-500" : "border-gray-300"}
        `}
      >
        <span className={selectedLabels ? "text-gray-900" : "text-gray-400"}>
          {selectedLabels || placeholder}
        </span>
        {/* <span className="ml-2 text-xs">▾</span> */}
        <ChevronDown />
      </div>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}

      {/* Menu */}
      {isOpen && (
        <div
          // className="absolute z-50 mt-1 w-full rounded-md border bg-white shadow-md"
          className={`absolute z-50 w-full rounded-md border bg-white shadow-md
      ${dropdownPosition === "bottom" ? "mt-1" : "bottom-full mb-1"}
    `}
        >
          {isSearchable && (
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                onSearch?.(e.target.value);
              }}
              placeholder="Search..."
              className="w-full border-b px-3 py-2 text-sm outline-none"
            />
          )}

          <div className="max-h-56 overflow-y-auto">
            {isLoading && (
              <div className="px-3 py-2 text-sm text-gray-500">Loading...</div>
            )}

            {!isLoading && filteredOptions.length === 0 && (
              <div className="px-3 py-2 text-sm text-gray-500">
                No options found
              </div>
            )}

            {!isLoading &&
              filteredOptions.map((option) => {
                const checked = value?.includes(option.value);

                return (
                  <div
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className="flex cursor-pointer items-center gap-2 px-3 py-2 hover:bg-gray-100"
                  >
                    {/* Custom checkbox */}
                    <div
                      className={`flex h-4 w-4 items-center justify-center rounded border
                        ${
                          checked
                            ? "border-blue-600 bg-blue-600"
                            : "border-gray-400"
                        }
                      `}
                    >
                      {checked && <div className="h-2 w-2 rounded bg-white" />}
                    </div>

                    <span className="text-sm">{option.label}</span>
                  </div>
                );
              })}

            {/* {isCreatable && search && (
              <div className="cursor-pointer px-3 py-2 text-sm text-blue-600 hover:bg-gray-100">
                Create "{search}"
              </div>
            )} */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
