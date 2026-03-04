import type { DateRange } from "react-day-picker";

export interface ACalendarProps {
  mode?: "single" | "multiple" | "range";
  selected?: Date | DateRange;
  onSelect?: (date: Date | DateRange) => void;
  showtime?: boolean;
  timezone?: string;
  className?: string;
  captionlayout?: "dropdown" | "buttons";
}
