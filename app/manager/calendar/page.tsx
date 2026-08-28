"use client"
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Room = "suite" | "deluxe" | "standard";

type Reservation = {
  name: string;
  room: Room;
  checkIn: string;
  checkOut: string;
  accentColor: string;
};

const reservations: Reservation[] = [
  {
    name: "Sarah",
    room: "suite",
    checkIn: "2026-05-05",
    checkOut: "2026-05-08",
    accentColor: "bg-emerald-900",
  },
  {
    name: "James",
    room: "deluxe",
    checkIn: "2026-05-15",
    checkOut: "2026-05-18",
    accentColor: "bg-amber-600",
  },
  {
    name: "Stella",
    room: "suite",
    checkIn: "2026-05-20",
    checkOut: "2026-05-24",
    accentColor: "bg-sky-700",
  },
  {
    name: "Esther",
    room: "standard",
    checkIn: "2026-05-15",
    checkOut: "2026-05-17",
    accentColor: "bg-rose-700",
  },
];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 1));
  const [yearPickerOpen, setYearPickerOpen] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState({
    suite: true,
    deluxe: true,
    standard: true,
  });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const selectYear = (selectedYear: number) => {
    setCurrentDate(new Date(selectedYear, month, 1));
    setYearPickerOpen(false);
  };

  const calendarDays = Array.from(
    { length: firstDay + daysInMonth },
    (_, index) => {
      if (index < firstDay) return null;

      return index - firstDay + 1;
    }
  );

  const filteredReservations = reservations.filter(
    (reservation) => selectedRooms[reservation.room]
  );

  const reservationsForDay = (day: number) => {
    const date = new Date(year, month, day);

    return filteredReservations.filter((reservation) => {
      const checkIn = new Date(`${reservation.checkIn}T00:00:00`);
      const checkOut = new Date(`${reservation.checkOut}T00:00:00`);

      return date >= checkIn && date < checkOut;
    });
  };

  return (
    <main className="min-h-screen bg-white px-6 py-8 md:px-10">
      {/* Header */}
      <div className="mb-8">
        {/* <h1 className="text-2xl font-semibold text-slate-900">
          Calendar
        </h1> */}

        <Link
          href="/manager"
          className="mt-6 flex items-center text-sm text-gray-500 hover:text-emerald-800"
        >
          <ChevronLeft /> Back to overview
        </Link>
      </div>

      <div className="flex flex-col gap-10 xl:flex-row">
        {/* Left Side */}
        <aside className="w-full xl:w-[230px]">
          {/* Rooms */}
          <div className="mb-8">
            <h2 className="mb-4 text-sm font-semibold text-slate-900">
              Rooms
            </h2>

            <div className="flex flex-col gap-4 text-sm text-gray-600">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedRooms.suite}
                  onChange={(e) =>
                    setSelectedRooms({
                      suite: e.target.checked,
                      deluxe: selectedRooms.deluxe,
                      standard: selectedRooms.standard,
                    })
                  }
                  className="h-4 w-4 accent-emerald-800"
                />
                Suite
              </label>

              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedRooms.deluxe}
                  onChange={(e) =>
                    setSelectedRooms({
                      ...selectedRooms,
                      deluxe: e.target.checked,
                    })
                  }
                  className="h-4 w-4 accent-emerald-800"
                />
                Deluxe
              </label>

              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedRooms.standard}
                  onChange={(e) =>
                    setSelectedRooms({
                      ...selectedRooms,
                      standard: e.target.checked,
                    })
                  }
                  className="h-4 w-4 accent-emerald-800"
                />
                Standard
              </label>
            </div>
          </div>

          {/* Reservations */}
          <div>
            <h2 className="mb-4 text-sm font-semibold text-slate-900">
              Reservations
            </h2>

            <div className="flex flex-col gap-4">
              {reservations.map((reservation, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3"
                >
                  <div
                    className={`h-8 w-8 rounded-full bg-emerald-700`}
                  />

                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      {reservation.name}
                    </p>

                    {/* <p className="text-xs capitalize text-gray-500">
                      {reservation.room} · {reservation.checkIn} to {reservation.checkOut}
                    </p> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Calendar */}
        <section className="flex-1">
          {/* Month Navigation */}
          <div className="mb-8 flex items-center justify-between gap-4">
            <button
              onClick={previousMonth}
              aria-label="Previous month"
              className="flex items-center gap-3 rounded-lg px-1 py-2 text-gray-800 hover:bg-gray-100"
            >
              <ChevronLeft size={22} strokeWidth={2.5} />
              <span className="text-xl font-medium">{monthName}</span>
            </button>

            <div className="flex items-center gap-2">
              <div className="relative">
              <button
                type="button"
                onClick={() => setYearPickerOpen((open) => !open)}
                aria-expanded={yearPickerOpen}
                className="flex min-w-[220px] items-center justify-between rounded-lg border border-gray-300 bg-white px-5 py-2 text-lg text-gray-900 shadow-sm hover:border-gray-400"
              >
                <span>
                  {currentDate.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="text-gray-400"><ChevronDown size={24} /></span>
              </button>
              {yearPickerOpen && (
                <div className="absolute right-0 top-full z-20 mt-2 max-h-52 w-full overflow-y-auto rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
                  {Array.from({ length: 11 }, (_, index) => year - 5 + index).map((optionYear) => (
                    <button
                      key={optionYear}
                      type="button"
                      onClick={() => selectYear(optionYear)}
                      className={`block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-emerald-50 ${optionYear === year ? "font-semibold text-emerald-800" : "text-gray-700"}`}
                    >
                      {monthName} 1, {optionYear}
                    </button>
                  ))}
                </div>
              )}
              </div>
              <button
                type="button"
                onClick={nextMonth}
                aria-label="Next month"
                className="rounded-lg p-2 text-gray-800 hover:bg-gray-100"
              >
                <span className="text-2xl leading-none"><ChevronRight size={24} /></span>
              </button>
            </div>
          </div>

          {/* Week Days */}
          <div className="grid grid-cols-7 border-b border-gray-200">
            {[
              ["Sunday", "Sun"],
              ["Monday", "Mon"],
              ["Tuesday", "Tue"],
              ["Wednesday", "Wed"],
              ["Thursday", "Thu"],
              ["Friday", "Fri"],
              ["Saturday", "Sat"],
            ].map(([day, shortDay]) => (
              <div
                key={day}
                className="py-4 text-center text-xs font-medium text-gray-500"
              >
                <span className="sm:hidden">{shortDay}</span>
                <span className="hidden sm:inline">{day}</span>
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`relative min-h-[90px] border-b border-r border-gray-100 p-3 sm:min-h-[110px] ${
                  day && reservationsForDay(day).length > 0 ? "bg-emerald-50" : "bg-white"
                }`}
              >
                {day && (
                  <>
                    <span
                      className={`text-sm ${
                        reservationsForDay(day).length > 0
                          ? "text-emerald-950"
                          : "text-gray-500"
                      }`}
                    >
                      {day}
                    </span>

                    <div className="absolute inset-x-3 bottom-2 flex flex-wrap gap-x-2 gap-y-1">
                      {reservationsForDay(day).map((reservation) => (
                        <span
                          key={`${reservation.name}-${reservation.checkIn}`}
                          className="flex items-center gap-1 text-[9px] leading-none text-slate-700"
                        >
                          <span
                            className={`h-1.5 w-1.5 shrink-0 rounded-full ${reservation.accentColor}`}
                          />
                          <span className="whitespace-nowrap">{reservation.name}</span>
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="flex w-full justify-end">
        <Link href={"/manager/calendar/list"} className="bg-emerald-900 text-white py-3 px-6 rounded-lg">List View</Link>
      </div>
    </main>
  );
}