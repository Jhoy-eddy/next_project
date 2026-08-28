import {
  BarChart2,
  Calendar,
  CalendarPlus,
  Home,
  Link2,
  Wallet,
} from "lucide-react";

const statCards = [
  {
    label: "New Bookings",
    icon: Calendar,
    value: "67",
    delta: "+20% vs last week",
  },
  {
    label: "Check-Ins Today",
    icon: Link2,
    value: "6",
    delta: "+13% vs last week",
  },
  {
    label: "Occupancy Rate",
    icon: Home,
    value: "77%",
    delta: "+8% vs last week",
  },
  {
    label: "Revenue (Weekly)",
    icon: BarChart2,
    value: "₦17,250,000",
    delta: "+20% vs last week",
  },
];

const quickActions = [
  { label: "Add New Listing", sub: "List a new property", icon: Home },
  { label: "Add Booking", sub: "Create a booking", icon: CalendarPlus },
  { label: "Calendar View", sub: "View booked date", icon: Calendar },
  { label: "Guest Check-In", sub: "Check-in arriving guests", icon: Link2 },
  { label: "Processed Payment", sub: "View & confirm payment", icon: Wallet },
];

const reservations = [
  {
    name: "Oladipo Stellar",
    property: "VI Beach Resort",
    room: "Room 102",
    checkIn: "April 25, 2026",
    checkOut: "April 29, 2026",
    status: "Confirmed",
    amount: "₦880,000",
  },
  {
    name: "Esther Nalubega",
    property: "VI Beach Resort",
    room: "Room 103",
    checkIn: "April 26, 2026",
    checkOut: "April 29, 2026",
    status: "Confirmed",
    amount: "₦120,000",
  },
  {
    name: "James Okello",
    property: "VI Beach Resort",
    room: "Room 104",
    checkIn: "April 27, 2026",
    checkOut: "April 30, 2026",
    status: "Confirmed",
    amount: "₦320,000",
  },
];

export default function ManagerOverviewPage() {
  return (
    <>
      <p className="mb-8 text-sm text-[#5B6B62]">
        Welcome back, Favour! Here&apos;s what&apos;s happening today.
      </p>

      <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map(({ label, icon: Icon, value, delta }) => (
          <article
            key={label}
            className="rounded-2xl border border-[#E1E4E0] bg-white p-5 shadow-sm"
          >
            <div className="mb-3 flex items-center gap-2 text-sm text-[#5B6B62]">
              <Icon size={16} />
              {label}
            </div>
            <p className="text-2xl font-semibold tracking-tight">{value}</p>
            <p className="mt-1 text-xs text-emerald-600">{delta}</p>
          </article>
        ))}
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-sm font-semibold">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
          {quickActions.map(({ label, sub, icon: Icon }) => (
            <button
              key={label}
              className="flex flex-col gap-2 rounded-2xl border border-[#E1E4E0] bg-white p-4 text-left shadow-sm transition-shadow hover:shadow-md"
            >
              <Icon size={18} className="text-[#0F3D2E]" />
              <span>
                <span className="block text-sm font-medium leading-tight">
                  {label}
                </span>
                <span className="mt-0.5 block text-xs text-[#5B6B62]">
                  {sub}
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-[#E1E4E0] bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-[#EEF0EE] px-5 py-4">
          <h2 className="text-sm font-semibold">Recent Reservations</h2>
          <button className="text-xs font-medium text-[#0F3D2E]">
            View all
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-180 text-sm">
            <thead className="bg-[#FAFAF9] text-left text-xs text-[#5B6B62]">
              <tr>
                <th className="px-5 py-3 font-medium">Guest</th>
                <th className="px-5 py-3 font-medium">Property</th>
                <th className="px-5 py-3 font-medium">Check-In</th>
                <th className="px-5 py-3 font-medium">Check-Out</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr
                  key={reservation.name}
                  className="border-t border-[#F0F1EF] hover:bg-[#FAFAF9]"
                >
                  <td className="px-5 py-4 font-medium">
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-800 text-xs font-semibold text-white"
                      >
                        {reservation.name
                          .split(" ")
                          .map((namePart) => namePart[0])
                          .join("")
                          .slice(0, 2)}
                      </span>
                      <span className="">{reservation.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div>{reservation.property}</div>
                    <div className="text-xs text-[#5B6B62]">
                      {reservation.room}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4">
                    {reservation.checkIn}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4">
                    {reservation.checkOut}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${reservation.status === "Confirmed" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}
                    >
                      {reservation.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 font-medium">
                    {reservation.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
