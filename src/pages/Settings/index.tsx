import Tab, { TabItem } from "@/components/common/Tab";
import FloorTab from "./components/FloorTab";

type SettingsTabKey = "floor";

const tabs: TabItem<SettingsTabKey>[] = [{ title: "Floor", key: "floor" }];

export default function Settings() {
  return (
    <div>
      <h1 className="section-title mb-6">Settings</h1>

      <Tab tabs={tabs} defaultTab="floor" containerClassname="mb-10" />

      <div>
        <FloorTab />
      </div>
    </div>
  );
}
