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
    <div className="relative">
      {/* <div className="absolute inset-0 rounded-2xl bg-yellow-400 z-0" /> */}
      <div
        className={clsx("absolute inset-0 rounded-2xl z-0", {
          "bg-[#007B99]": type === "success",
          "bg-[#B98C00]": type === "pending",
          "bg-[#BA1A1A]": type === "danger",
        })}
      />

      <div
        className={clsx(
          "rounded-2xl p-6 flex justify-between items-center transition-all duration-300 hover:translate-x-1 relative z-10 bg-white cursor-pointer shadow-custom-1",
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
    </div>
  );
};

export default SummaryCard;
