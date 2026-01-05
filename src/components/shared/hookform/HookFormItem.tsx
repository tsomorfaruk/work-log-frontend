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
}

const HookFormItem = ({
  children,
  name,
  className,
  errorClassName,
  isRequired,
  label,
}: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        console.log("error: ", error);

        return (
          <div className={className}>
            {label && (
              <Label isRequired={isRequired} className="mb-0.5">
                {label}
              </Label>
            )}
            {React.cloneElement(children, {
              ...field,
              className: cn("text-sm", children.props.className),
              labelClassName: cn("!text-xs", children.props.labelClassName),
              errorMessage: error?.message,
              hasError: !!error,
              errorClassName: cn(
                "static mt-1 px-1 rtl:right-1 rtl:text-right",
                errorClassName
              ),
              styles: {
                //   ...SelectStyles,
                ...children.props.styles,
                error: "rtl:right-1 rtl:text-right",
                wrapper: "rtl:right-1 rtl:text-right",
              },
            })}

            {error?.message && (
              <p className="text-red-500 text-xs">{error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
};

export default HookFormItem;
