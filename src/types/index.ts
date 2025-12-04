import React from 'react';

export interface DefaultProps {
  children?: React.ReactElement | React.ReactElement[] | string;
  className?: string;
}

export interface RangeDataType {
  id: string;
  start: number;
  end: number;
  date?: string;
}

export interface HourToStringT {
  hr: number;
  min: number;
  amp: string;
}
export interface SlotOptionType {
  isDelButton?: boolean;
  isAddButton?: boolean;
  isMinSlot?: boolean;
  isDashSlot?: boolean;
  isHourSlot?: boolean;
  isOffline?: boolean;
}
export interface SlotDataType {
  options: SlotOptionType;
  slots: RangeDataType[];
}

export interface SlotsDataType {
  [key: string]: SlotDataType;
}
