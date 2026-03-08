import { useState } from "react";
import Button from "@/components/ui/button";
import FloorModal from "./modals/floorModal";
import FloorTable from "./table";

export default function FloorTab() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Floor List</h2>
        <Button variant="primary" onClick={() => setIsOpen(true)}>
          + Add New Floor
        </Button>
      </div>

      <FloorTable />

      {isOpen && <FloorModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
}
