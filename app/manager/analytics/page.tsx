"use client";

import {
  BarChart3,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  CircleHelp,
  Home,
  PieChart,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type AnalyticsRange = "week" | "month";

const analyticsData = {
  week: {
    label: "April 1 - April 7, 2026",
    occupancy: "77%",
    bookings: "67",
    revenue: "₦17,250,000",
    average: "₦6,237,000",
    points:
      "0,205 65,176 130,188 195,172 260,191 325,164 390,178 455,175 520,187 585,164 650,177 715,142 780,55 845,42",
    dates: [
      "01 Apr",
      "02 Apr",
      "03 Apr",
      "04 Apr",
      "05 Apr",
      "06 Apr",
      "07 Apr",
    ],
  },
  month: {
    label: "April 1 - April 27, 2026",
    occupancy: "82%",
    bookings: "248",
    revenue: "₦64,800,000",
    average: "₦8,100,000",
    points:
      "0,190 65,172 130,182 195,150 260,168 325,130 390,154 455,112 520,126 585,98 650,110 715,78 780,55 845,38",
    dates: [
      "01 Apr",
      "06 Apr",
      "11 Apr",
      "16 Apr",
      "21 Apr",
      "26 Apr",
      "30 Apr",
    ],
  },
};

const statCards = [
  { key: "occupancy", label: "Occupancy Rate", icon: Home },
  { key: "bookings", label: "New Bookings", icon: CalendarDays },
  { key: "revenue", label: "Revenue (Weekly)", icon: PieChart },
  { key: "average", label: "Average daily revenue", icon: PieChart },
] as const;

export default function AnalyticsPage() {
  const [range, setRange] = useState<AnalyticsRange>("week");
  const data = analyticsData[range];

  return (
    <div className="mx-auto max-w-[1180px]">
      <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/manager"
          className="order-2 flex items-center gap-2 text-sm hover:text-[#0F3D2E] sm:order-1"
        >
          <ChevronLeft size={17} />
          Back to overview
        </Link>
        <label className="relative order-1 w-full sm:order-2 sm:w-auto">
          <span className="sr-only">Analytics date range</span>
          <select
            value={range}
            onChange={(event) => setRange(event.target.value as AnalyticsRange)}
            className="w-full appearance-none rounded-xl border border-[#D9DEDA] bg-white py-3 pl-4 pr-11 text-xs shadow-sm outline-none focus:border-[#0F3D2E] sm:w-[200px]"
          >
            <option value="week">{analyticsData.week.label}</option>
            <option value="month">{analyticsData.month.label}</option>
          </select>
          <ChevronDown
            size={15}
            className="pointer-events-none absolute right-4 top-3.5"
          />
        </label>
      </div>

      <section className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map(({ key, label, icon: Icon }) => (
          <article
            key={key}
            className="rounded-xl border border-[#0F5A48] px-3 py-3"
          >
            <div className="mb-2 flex items-center gap-2 text-[11px]">
              <Icon size={17} strokeWidth={1.6} />
              {label}
            </div>
            <p className="text-lg font-medium tracking-tight">{data[key]}</p>
            <p className="mt-1 text-[11px] text-[#0F5A48]">
              +{key === "occupancy" ? "8" : "20"}%{" "}
              <span className="text-[#16241C]">vs last week</span>
            </p>
          </article>
        ))}
      </section>

      <section className="rounded-xl border border-[#E5E8E5] bg-white px-4 py-7 shadow-[0_1px_3px_rgba(22,36,28,0.04)] sm:px-7 sm:py-8">
        <div className="mb-8 flex items-center gap-2">
          <h2 className="text-base font-semibold">Revenue Overview</h2>
          <CircleHelp size={15} className="text-[#7A8780]" />
        </div>
        <div className="overflow-x-auto pb-1">
          <div className="min-w-[650px]">
            <div className="flex h-[270px]">
              <div className="flex w-12 shrink-0 flex-col justify-between pb-1 text-[11px] text-[#647168]">
                {["240K", "200K", "160K", "120K", "80K", "40K", "0K"].map(
                  (value) => (
                    <span key={value}>{value}</span>
                  ),
                )}
              </div>
              <div className="relative flex-1">
                <div className="absolute inset-0 flex flex-col justify-between pb-1">
                  {[0, 1, 2, 3, 4, 5, 6].map((line) => (
                    <div key={line} className="border-t border-[#EEF1EE]" />
                  ))}
                </div>
                <svg
                  viewBox="0 0 845 205"
                  preserveAspectRatio="none"
                  className="absolute inset-x-0 top-0 h-[205px] w-full overflow-visible"
                  aria-label="Revenue trend chart"
                  role="img"
                >
                  <polyline
                    points={data.points}
                    fill="none"
                    stroke="#00A46C"
                    strokeWidth="2.2"
                    vectorEffect="non-scaling-stroke"
                  />
                  <circle
                    cx="130"
                    cy={range === "week" ? "188" : "182"}
                    r="4"
                    fill="#00A46C"
                    stroke="white"
                    strokeWidth="3"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
                <div className="absolute left-[15%] top-[36%] hidden w-[126px] rounded-xl border border-[#F1F3F1] bg-white p-3 text-[10px] shadow-[0_3px_12px_rgba(22,36,28,0.04)] sm:block">
                  <p className="mb-2 text-[#4D5A52]">02 Apr, 2026</p>
                  <p className="flex items-center gap-2 text-[#7A8780]">
                    <span className="h-2 w-2 rounded-full bg-[#00A46C]" />
                    Revenue: <strong className="text-[#16241C]">₦</strong>
                  </p>
                </div>
                <div className="absolute inset-x-0 top-[205px] flex justify-between pt-5 text-[11px] text-[#647168]">
                  {data.dates.map((date) => (
                    <span key={date}>{date}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-2 flex justify-end">
        <Link href={"/manager/analytics/chart"} className="flex items-center gap-2 rounded-md bg-[#004B3D] px-9 py-3 text-xs text-white transition-colors hover:bg-[#00382D]">
          <BarChart3 size={15} />
          Chart View
        </Link>
      </div>
    </div>
  );
}
