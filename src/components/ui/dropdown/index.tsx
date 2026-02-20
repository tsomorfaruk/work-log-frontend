import { useClickOutside } from "@/hooks/useClickOutside";
import { useMemo, useRef, useState } from "react";
import { DropdownProps } from "./types";
import Label from "@/components/common/Label";
import { ChevronDown, Check } from "lucide-react";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useDropdownPosition } from "./hooks/useDropdownPosition";
import clsx from "clsx";

const Dropdown = <T,>({
  options,
  value,
  onChange,
  type = "single",
  placeholder = "Select options...",
  error,
  isLoading = false,
  isSearchable = false,
  isDisabled = false,
  label,
  position = "bottom",
  onSearch,
  isClearable = false,
  containerClassname,
}: DropdownProps<T>) => {
  const dropdownRef = useRef<HTMLElement>(null!);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEscapeKey(() => setIsOpen(false));
  useClickOutside(dropdownRef, () => setIsOpen(false));

  const dropdownPosition = useDropdownPosition(dropdownRef, position);
  const hasValue = !!value?.length;

  /* ---------------- selected labels ---------------- */
  const selectedLabels = useMemo(() => {
    if (!value?.length) return "";

    return options
      .filter((opt) => value.includes(opt.value))
      .map((opt) => opt.label)
      .join(", ");
  }, [options, value]);

  /* ---------------- search filter ---------------- */
  const filteredOptions = useMemo(() => {
    if (!search) return options;
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(search.toLowerCase()),
    );
  }, [options, search]);

  /* ---------------- handlers ---------------- */
  const handleSelect = (optionValue: T) => {
    if (type === "single") {
      onChange?.([optionValue]);
      setIsOpen(false);
      return;
    }

    if (value?.includes(optionValue)) {
      onChange?.(value.filter((v) => v !== optionValue));
    } else {
      onChange?.([...(value ?? []), optionValue]);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.([]);
  };

  return (
    <div
      ref={dropdownRef as any}
      className={clsx("relative w-full", containerClassname)}
    >
      {label && (
        <Label
          className={clsx("mb-1 block text-sm font-medium text-gray-700", {
            "cursor-not-allowed": isDisabled,
          })}
        >
          {label}
        </Label>
      )}

      {/* Trigger */}
      <div
        onClick={() => !isDisabled && setIsOpen((p) => !p)}
        className={`flex min-h-[42px]  items-center justify-between rounded-md border px-3 py-2 text-sm
          ${error ? "border-red-500" : "border-gray-300"}
          ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        <span className={selectedLabels ? "text-gray-900" : "text-gray-400"}>
          {selectedLabels || placeholder}
        </span>

        <div className="flex items-center gap-2">
          {isClearable && hasValue && !isDisabled && (
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
          <ChevronDown />
        </div>
      </div>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}

      {/* Menu */}
      {isOpen && (
        <div
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
                    key={String(option.value)}
                    onClick={() => handleSelect(option.value)}
                    className="flex cursor-pointer items-center gap-2 px-3 py-2 hover:bg-gray-100"
                  >
                    <div className="flex h-4 w-4 items-center justify-center">
                      {checked && (
                        <Check size={16} color="#006972" strokeWidth={3} />
                      )}
                    </div>

                    <span className="text-sm">{option.label}</span>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
