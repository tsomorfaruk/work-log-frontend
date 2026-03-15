import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import clsx from "clsx";
import Button from "../ui/button";

export interface TabItem<T, V = string> {
  title: string;
  key: T;
  value?: V;
}

interface TabProps<T = string, V = string> {
  tabs: TabItem<T, V>[];
  onTabChange?: ({ key, value }: { key: T; value: V | undefined }) => void;
  defaultTab?: T;
  containerClassname?: string;
  /** When provided, the active tab key is persisted to the URL as ?{urlKey}={tabKey} */
  urlKey?: string;
}

export default function Tab<T = string, V = string>({
  tabs,
  onTabChange,
  defaultTab,
  containerClassname,
  urlKey,
}: TabProps<T, V>) {
  const [searchParams, setSearchParams] = useSearchParams();

  const resolveInitial = (): T => {
    if (urlKey) {
      const fromUrl = searchParams.get(urlKey) as T | null;
      if (fromUrl && tabs.some((t) => t.key === fromUrl)) return fromUrl;
    }
    return defaultTab ?? tabs[0]?.key;
  };

  const [activeTab, setActiveTab] = useState<T>(resolveInitial);

  const handleTabClick = (key: T, value?: V) => {
    setActiveTab(key);
    if (urlKey) {
      setSearchParams(
        (prev) => {
          prev.set(urlKey, String(key));
          return prev;
        },
        { replace: true },
      );
    }
    onTabChange?.({ key, value });
  };

  return (
    <div
      className={clsx("border-b border-b-[#70787C] w-max", containerClassname)}
    >
      <div className="flex gap-0">
        {tabs.map((tab) => (
          <Button
            key={String(tab.key)}
            onClick={() => handleTabClick(tab.key, tab.value)}
            className={clsx(
              "px-4 py-2 transition-colors border-b-2 -mb-[2px] text-lg 2xl:text-xl",
              activeTab === tab.key
                ? "text-[#007B99] border-b-[#007B99] font-semibold"
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
