"use client";

import { ChevronLeft, MoreVertical } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Room = "suite" | "deluxe" | "standard";

type Reservation = {
  name: string;
  room: Room;
  checkIn: string;
  checkOut: string;
};

const reservations: Reservation[] = [
  { name: "Esther Nalubega", room: "standard", checkIn: "April 26, 2026", checkOut: "April 30, 2026" },
  { name: "Oladipo Stellar", room: "suite", checkIn: "April 25, 2026", checkOut: "April 29, 2026" },
  { name: "Sarah kim", room: "deluxe", checkIn: "May 1, 2026", checkOut: "May 8, 2026" },
  { name: "James Okello", room: "deluxe", checkIn: "April 27, 2026", checkOut: "April 30, 2026" },
];

const roomLabels: { key: Room; label: string }[] = [
  { key: "suite", label: "Suite" },
  { key: "deluxe", label: "Deluxe" },
  { key: "standard", label: "Standard" },
];

const roomNames: Record<Room, string> = {
  suite: "Suite Room",
  deluxe: "Deluxe Room",
  standard: "Standard Room",
};

export default function CalendarListPage() {
  const [selectedRooms, setSelectedRooms] = useState<Record<Room, boolean>>({
    suite: true,
    deluxe: true,
    standard: true,
  });

  const filteredReservations = reservations.filter(
    (reservation) => selectedRooms[reservation.room]
  );

  return (
    <div className="mx-auto">
      <div className="mb-7">
        <Link
          href="/manager/calendar"
          className="flex items-center gap-2 text-sm text-[#16241C] hover:text-[#0F3D2E]"
        >
          <ChevronLeft size={17} />
          Back to calendar
        </Link>
      </div>

      <div className="grid gap-8 xl:grid-cols-[165px_minmax(0,1fr)] xl:gap-7">
        <aside>
          <section className="mb-8">
            <h2 className="mb-4 text-xs font-semibold">Rooms</h2>
            <div className="space-y-3">
              {roomLabels.map(({ key, label }) => (
                <label key={key} className="flex cursor-pointer items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={selectedRooms[key]}
                    onChange={(event) =>
                      setSelectedRooms({ ...selectedRooms, [key]: event.target.checked })
                    }
                    className="h-3 w-3 accent-[#004B3D]"
                  />
                  {label}
                </label>
              ))}
            </div>
          </section>

          <section>
            {/* <h2 className="mb-3 text-xs font-semibold">Reservations</h2> */}
            {/* <div className="space-y-3">
              {reservations.map((reservation) => (
                <div key={reservation.name} className="flex items-center gap-2">
                  <span className="h-8 w-8 shrink-0 rounded-full bg-[#004B3D]" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[11px] font-medium">{reservation.name}</p>
                    <p className="text-[10px] text-[#526159]">{roomNames[reservation.room]}</p>
                  </div>
                  <button aria-label={`Actions for ${reservation.name}`} className="text-[#004B3D] hover:text-[#16241C]"><MoreVertical size={16} /></button>
                </div>
              ))}
            </div> */}
          </section>
        </aside>

        <section className="min-w-0 min-h-95 overflow-hidden rounded-xl bg-white p-4 shadow-[0_2px_8px_rgba(22,36,28,0.04)] sm:p-5">
          <h2 className="mb-5 text-xs font-medium">Calendar List View</h2>
          <div className="w-full max-w-full overflow-x-auto">
            <table className="w-full min-w-142.5 border-separate border-spacing-0 text-[11px]">
              <thead>
                <tr className="bg-[#E4E5E4] text-left text-[10px]">
                  <th className="whitespace-nowrap px-2 py-2 font-medium sm:px-3">Guest</th>
                  <th className="whitespace-nowrap px-2 py-2 font-medium sm:px-3">Room Type</th>
                  <th className="whitespace-nowrap px-2 py-2 font-medium sm:px-3">Check-In</th>
                  <th className="whitespace-nowrap px-2 py-2 font-medium sm:px-3">Check-Out</th>
                  <th className="w-6" />
                </tr>
              </thead>
              <tbody>
                {filteredReservations.map((reservation) => (
                  <tr key={reservation.name} className="border-b border-[#F0F1F0]">
                    <td className="whitespace-nowrap px-2 py-2.5 font-medium sm:px-3">
                      <div className="flex items-center gap-2">
                        <span className="h-8 w-8 shrink-0 rounded-full bg-[#004B3D]" />
                        <span>{reservation.name}</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-2 py-2.5 sm:px-3">{roomNames[reservation.room]}</td>
                    <td className="whitespace-nowrap px-2 py-2.5 sm:px-3">{reservation.checkIn}</td>
                    <td className="whitespace-nowrap px-2 py-2.5 sm:px-3">{reservation.checkOut}</td>
                    <td className="px-1"><button aria-label={`More actions for ${reservation.name}`}><MoreVertical size={15} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredReservations.length === 0 && <p className="py-10 text-center text-xs text-[#647168]">No reservations for the selected rooms.</p>}
          </div>
        </section>
      </div>

      <div className="mt-2 flex justify-end">
        <Link href="/manager/calendar" className="flex h-8 w-27.5 items-center justify-center rounded-lg border border-[#D9DEDA] text-[10px] hover:bg-white">Back</Link>
      </div>
    </div>
  );
}
