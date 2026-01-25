import { useState } from "react";
import clsx from "clsx";
import Button from "../ui/button";

export interface TabItem<T = string> {
  title: string;
  key: T;
}

interface TabProps<T = string> {
  tabs: TabItem<T>[];
  onTabChange?: (key: T) => void;
  defaultTab?: T;
  containerClassname?: string;
}

export default function Tab<T = string>({
  tabs,
  onTabChange,
  defaultTab,
  containerClassname,
}: TabProps<T>) {
  const [activeTab, setActiveTab] = useState<T | string>(
    defaultTab || tabs[0]?.key || "",
  );

  const handleTabClick = (key: T) => {
    setActiveTab(key);
    onTabChange?.(key);
  };

  return (
    <div
      className={clsx("border-b border-b-[#70787C] w-max", containerClassname)}
    >
      <div className="flex gap-0">
        {tabs.map((tab) => (
          <Button
            key={String(tab.key)}
            onClick={() => handleTabClick(tab.key)}
            className={clsx(
              "px-4 py-2 font-medium transition-colors border-b-2 -mb-[2px] text-lg 2xl:text-xl",
              activeTab === tab.key
                ? "text-[#007B99] border-b-[#007B99] font-bold"
                : "text-[#70787C] border-b-0",
            )}
          >
            {tab.title}
          </Button>
        ))}
      </div>
    </div>
  );
}
