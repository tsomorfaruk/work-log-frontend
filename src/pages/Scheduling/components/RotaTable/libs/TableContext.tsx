import React, { createContext, useContext } from "react";
import { SingleRotaResponse } from "@/models/scheduling";

interface TableContextType {
  onColumnClick?: (col: SingleRotaResponse | null) => void;
  onAddClick: (employeeId: number, date: string) => void;
  onEditClick: (rota: SingleRotaResponse, employeeId: number) => void;
  dragHandlers: {
    handleDragStart: (
      e: React.DragEvent,
      item: { id: number; employeeId: number; date: string },
    ) => void;
    handleDragOver: (e: React.DragEvent) => void;
    handleDrop: (
      e: React.DragEvent,
      targetItem: { id: number | null; employeeId: number; date: string },
    ) => void;
  };
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export const TableProvider: React.FC<{
  value: TableContextType;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
};

export const useTableContext = () => {
  const context = useContext(TableContext);
  if (context === undefined) {
    throw new Error("useTableContext must be used within a TableProvider");
  }
  return context;
};
