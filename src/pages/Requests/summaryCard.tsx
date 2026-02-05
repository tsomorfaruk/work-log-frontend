import clsx from "clsx";
import { ReactNode } from "react";

interface SummaryCardProps {
  title: string;
  count: number | string;
  icon: ReactNode;
  type: "success" | "pending" | "danger";
}

const SummaryCard = ({ title, count, icon, type }: SummaryCardProps) => {
  return (
    <div
      className={clsx(
        "rounded-2xl p-6 flex justify-between items-center transition-all duration-300 hover:translate-x-1 bg-white cursor-pointer shadow-custom-1 hover:border-l-[5px]",
        {
          "border-l-[#007B99]": type === "success",
          "border-l-[#B98C00]": type === "pending",
          "border-l-[#BA1A1A]": type === "danger",
        },
      )}
    >
      <div>
        <h4 className="text-sm 2xl:text-base text-black">{title}</h4>
        <p className="text-3xl 2xl:text-4xl font-bold text-[#004D61]">
          {count}
        </p>
      </div>

      {icon}
    </div>
  );
};

export default SummaryCard;
