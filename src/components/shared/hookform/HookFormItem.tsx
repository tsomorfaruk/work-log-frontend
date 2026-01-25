import Label from "@/components/common/Label";
import { cn } from "@/lib/utils";
import React from "react";

import { Controller, useFormContext } from "react-hook-form";
// import { cn } from "../../../utils/tw-merge";
// import { SelectStyles } from "@/index";

interface Props {
  children?: any;
  name: string;
  label?: string;
  className?: string;
  errorClassName?: string;
  isRequired?: boolean;
  componentType?: "datePicker";
}

const HookFormItem = ({
  children,
  name,
  className,
  errorClassName,
  isRequired,
  label,
  componentType,
}: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <div className={className}>
            {label && (
              <Label isRequired={isRequired} className="mb-0.5 text-left">
                {label}
              </Label>
            )}
            {React.cloneElement(children, {
              ...field,
              selected: field.value, // 👈 REQUIRED for react-datepicker
              onChange: (value: any) => {
                field?.onChange?.(value); // RHF update
                children?.props?.onChange?.(value); // your handler
              },
              className: cn(
                // "text-sm w-full px-4 py-4 placeholder:text-xs rounded-lg border border-[#C0C8CC] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all",
                {
                  "text-sm w-full px-4 py-4 placeholder:text-xs rounded-lg border border-[#C0C8CC] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all":
                    componentType !== "datePicker",
                },
                children.props.className,
              ),
              labelClassName: cn("!text-xs", children.props.labelClassName),
              errorMessage: error?.message,
              hasError: !!error,
              errorClassName: cn("static mt-1 px-1", errorClassName),
              styles: {
                //   ...SelectStyles,
                ...children.props.styles,
                error: "rtl:right-1 rtl:text-right",
                wrapper: "rtl:right-1 rtl:text-right",
              },
            })}

            {error?.message && (
              <p className="text-left text-red-500 text-xs mt-2">
                {error.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};

export default HookFormItem;
