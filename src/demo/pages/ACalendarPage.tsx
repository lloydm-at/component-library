import { Fragment, useState } from "react";
import type { DateRange } from "react-day-picker";
import { ACalendar } from "../../components/ACalendar";

function ACalendarPage() {
  const [singleDate, setSingleDate] = useState<Date>();
  const [rangeDate, setRangeDate] = useState<DateRange>();

  return (
    <Fragment>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">
          ACalendar Component
        </h1>
        <p className="text-slate-400">
          Determine your schedule with precision using ACalendar, our versatile
          date selection component.
        </p>
      </div>
      <div className="relative z-10 p-8 pb-24 flex items-start justify-center">
        <div className="relative z-0 max-w-6xl mx-auto space-y-16 p-8 border-4 border-[rgb(82,82,91)] rounded">
          <div
            className="bg-white/50 p-8 rounded "
            style={{ paddingBottom: "6rem" }}
          >
            <h1 className="mb-6 text-3xl font-bold text-foreground">
              Single Date Calendar (Dropdown and Buttons)
            </h1>
            <div className="flex flex-wrap gap-6 justify-evenly">
              <div className="flex-shrink-0 mx-3 mb-6">
                <ACalendar
                  mode="single"
                  selected={singleDate}
                  onSelect={(date) => setSingleDate(date as Date)}
                  showtime={true}
                  captionlayout="dropdown"
                  className="max-w-md rounded-lg bg-blue-500 text-white p-6"
                />
              </div>

              <div className="flex-shrink-0 mx-3 mb-6">
                <ACalendar
                  mode="single"
                  selected={singleDate}
                  onSelect={(date) => setSingleDate(date as Date)}
                  showtime={true}
                  timezone="UTC"
                  captionlayout="buttons"
                  className="max-w-md rounded-lg bg-orange-500 text-white p-6"
                />
              </div>
            </div>
          </div>

          <div
            className="bg-white/50 p-8 rounded "
            style={{ paddingBottom: "6rem" }}
          >
            <h1 className="mb-6 text-3xl font-bold text-foreground">
              Date Range Calendar (Dropdown and Buttons)
            </h1>
            <div className="flex flex-wrap gap-6 justify-evenly">
              <div className="flex-shrink-0 mx-3 mb-6">
                <ACalendar
                  mode="range"
                  selected={rangeDate}
                  onSelect={(date) => setRangeDate(date as DateRange)}
                  showtime={true}
                  timezone="UTC"
                  captionlayout="dropdown"
                  className="max-w-md rounded-lg bg-blue-500 text-white p-6"
                />
              </div>

              <div className="flex-shrink-0 mx-3 mb-6">
                <ACalendar
                  mode="range"
                  selected={rangeDate}
                  onSelect={(date) => setRangeDate(date as DateRange)}
                  showtime={true}
                  timezone="UTC"
                  captionlayout="buttons"
                  className="max-w-md rounded-lg bg-orange-500 text-white p-6"
                />
              </div>
            </div>
          </div>

          <div
            className="bg-white/50 p-8 rounded pb-24 rounded "
            style={{ paddingBottom: "6rem" }}
          >
            <h1 className="mb-6 text-3xl font-bold text-foreground">
              Calendars without time (Dropdown and Buttons)
            </h1>
            <div className="flex flex-wrap gap-6 justify-evenly">
              <div className="flex-shrink-0 mx-3 mb-6">
                <ACalendar
                  mode="range"
                  selected={rangeDate}
                  onSelect={(date) => setRangeDate(date as DateRange)}
                  showtime={false}
                  timezone="UTC"
                  captionlayout="dropdown"
                  className="max-w-md rounded-lg bg-blue-500 text-white p-6"
                />
              </div>

              <div className="flex-shrink-0 mx-3 mb-6">
                <ACalendar
                  mode="range"
                  selected={rangeDate}
                  onSelect={(date) => setRangeDate(date as DateRange)}
                  showtime={false}
                  captionlayout="buttons"
                  className="max-w-md rounded-lg bg-orange-500 text-white p-6"
                />
              </div>
            </div>
          </div>
          <div className="h-24" aria-hidden="true" />
        </div>
      </div>
    </Fragment>
  );
}

export default ACalendarPage;
