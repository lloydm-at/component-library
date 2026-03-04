import React from "react";
import type { DateRange } from "react-day-picker";
import { ACalendarProps } from "./ACalendar.types";
import { Calendar } from "../ui/calendar";
import { cn } from "../../lib/utils";

export const ACalendar = ({
  mode,
  selected,
  onSelect,
  showtime = false,
  timezone,
  className,
  captionlayout,
}: ACalendarProps) => {
  const [internalSelected, setInternalSelected] = React.useState<
    Date | DateRange | undefined
  >(selected);

  const handleSelect = (date: Date | DateRange | undefined) => {
    setInternalSelected(date);
    onSelect?.(date as Date | DateRange);
  };

  const formatDisplayDate = (date: Date | DateRange | undefined): string => {
    if (!date) return "Select date";

    const timeFormatter = showtime
      ? {
          hour: "2-digit" as const,
          minute: "2-digit" as const,
          second: "2-digit" as const,
        }
      : {};

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      ...timeFormatter,
      ...(timezone && { timeZone: timezone }),
    };

    const withCurrentTime = (d: Date) => {
      if (!showtime) return d;
      const now = new Date();
      const merged = new Date(d.getTime());
      merged.setHours(
        now.getHours(),
        now.getMinutes(),
        now.getSeconds(),
        now.getMilliseconds(),
      );
      return merged;
    };

    if (date instanceof Date) {
      return new Intl.DateTimeFormat("en-US", options).format(
        withCurrentTime(date),
      );
    }

    if ("from" in date) {
      const fromStr = new Intl.DateTimeFormat("en-US", options).format(
        withCurrentTime(date.from!),
      );
      const toStr = date.to
        ? new Intl.DateTimeFormat("en-US", options).format(
            withCurrentTime(date.to!),
          )
        : "";
      return `${fromStr} - ${toStr}`;
    }

    return "No date selected";
  };

  const calendarProps = {
    mode,
    selected: internalSelected,
    onSelect: handleSelect,
    captionLayout: captionlayout === "dropdown" ? "dropdown" : "label",
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <Calendar
        className={cn(className)}
        {...(calendarProps as React.ComponentProps<typeof Calendar>)}
      />

      {showtime && internalSelected && (
        <div className="rounded-md border border-input bg-muted/50 p-3 text-sm">
          <p className="font-medium text-foreground">
            {timezone ? `Selected (${timezone}):` : "Selected:"}
          </p>
          <p className="text-muted-foreground mt-1">
            {formatDisplayDate(internalSelected)}
          </p>
        </div>
      )}
    </div>
  );
};

export default ACalendar;
