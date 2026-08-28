"use client";

import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  Home,
  PieChart,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Range = "week" | "month";
type RevenueCategory = "suites" | "services" | "deluxe" | "standard";

const data = {
  week: {
    label: "April 1 - April 7, 2026",
    occupancy: "77%",
    bookings: "67",
    revenue: "₦17,250,000",
    average: "₦6,237,000",
  },
  month: {
    label: "April 1 - April 30, 2026",
    occupancy: "82%",
    bookings: "248",
    revenue: "₦64,800,000",
    average: "₦8,100,000",
  },
};

const statCards = [
  { key: "occupancy", label: "Occupancy Rate", icon: Home },
  { key: "bookings", label: "New Bookings", icon: CalendarDays },
  { key: "revenue", label: "Revenue (Weekly)", icon: PieChart },
  { key: "average", label: "Average daily revenue", icon: PieChart },
] as const;

const transactions = [
  {
    guest: "Oladipo Stellar",
    amount: "₦880,000",
    date: "April 25, 2026",
    category: "suites",
  },
  {
    guest: "Esther Nalubega",
    amount: "₦120,000",
    date: "April 26, 2026",
    category: "standard",
  },
  {
    guest: "James Okello",
    amount: "₦320,000",
    date: "April 27, 2026",
    category: "deluxe",
  },
  {
    guest: "Amina Yusuf",
    amount: "₦660,000",
    date: "May 1, 2026",
    category: "services",
  },
  {
    guest: "kaelith Thandor",
    amount: "₦660,000",
    date: "May 1, 2026",
    category: "deluxe",
  },
  {
    guest: "Sarah Kim",
    amount: "₦860,000",
    date: "May 1, 2026",
    category: "suites",
  },
];

const pieSegments: {
  category: RevenueCategory;
  label: string;
  percentage: string;
  color: string;
  path: string;
}[] = [
  {
    category: "suites",
    label: "Suites",
    percentage: "30%",
    color: "#005B73",
    path: "M100 100 L38 39 A86 86 0 0 1 161 39 Z",
  },
  {
    category: "services",
    label: "Services",
    percentage: "15%",
    color: "#E51B45",
    path: "M100 100 L161 39 A86 86 0 0 1 186 100 L100 100 Z",
  },
  {
    category: "deluxe",
    label: "Deluxe",
    percentage: "35%",
    color: "#005440",
    path: "M100 100 L186 100 A86 86 0 0 1 100 186 Z",
  },
  {
    category: "standard",
    label: "Standard",
    percentage: "20%",
    color: "#703708",
    path: "M100 100 L100 186 A86 86 0 0 1 38 39 Z",
  },
];

export default function AnalyticsChartPage() {
  const [range, setRange] = useState<Range>("week");
  const [selectedCategory, setSelectedCategory] =
    useState<RevenueCategory | null>(null);
  const selectedData = data[range];
  const filteredTransactions = selectedCategory
    ? transactions.filter(
        (transaction) => transaction.category === selectedCategory,
      )
    : transactions;

  return (
    <div className="mx-auto max-w-[1180px]">
      <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/manager/analytics"
          className="order-2 flex items-center gap-2 text-sm hover:text-[#0F3D2E] sm:order-1"
        >
          <ChevronLeft size={17} />
          Back to overview
        </Link>
        <label className="relative order-1 w-full sm:order-2 sm:w-auto">
          <span className="sr-only">Analytics date range</span>
          <select
            value={range}
            onChange={(event) => setRange(event.target.value as Range)}
            className="w-full appearance-none rounded-xl border border-[#D9DEDA] bg-white py-3 pl-4 pr-11 text-xs shadow-sm outline-none focus:border-[#0F3D2E] sm:w-[200px]"
          >
            <option value="week">{data.week.label}</option>
            <option value="month">{data.month.label}</option>
          </select>
          <ChevronDown
            size={15}
            className="pointer-events-none absolute right-4 top-3.5"
          />
        </label>
      </div>

      <section className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map(({ key, label, icon: Icon }) => (
          <article
            key={key}
            className="rounded-xl border border-[#0F5A48] px-3 py-3"
          >
            <div className="mb-2 flex items-center gap-2 text-[11px]">
              <Icon size={17} strokeWidth={1.6} />
              {label}
            </div>
            <p className="text-lg font-medium tracking-tight">
              {selectedData[key]}
            </p>
            <p className="mt-1 text-[11px] text-[#0F5A48]">
              +{key === "occupancy" ? "8" : "20"}%{" "}
              <span className="text-[#16241C]">vs last week</span>
            </p>
          </article>
        ))}
      </section>

      <div className="grid items-start gap-5 lg:grid-cols-[205px_minmax(0,1fr)]">
        <section>
          <h2 className="mb-5 text-xs font-semibold text-[#0F5A48]">
            Revenue chart
          </h2>
          <div className="relative mx-auto h-[155px] w-[155px]">
            <svg
              viewBox="0 0 200 200"
              className="h-full w-full"
              role="img"
              aria-label="Revenue by room type"
            >
              {pieSegments.map((segment) => (
                <path
                  key={segment.category}
                  d={segment.path}
                  fill={segment.color}
                  stroke="#F4F5F3"
                  strokeWidth="5"
                  className="cursor-pointer transition-opacity focus:outline-none"
                  style={{ outline: "none" }}
                  opacity={
                    selectedCategory && selectedCategory !== segment.category
                      ? "0.35"
                      : "1"
                  }
                  onClick={() =>
                    setSelectedCategory(
                      segment.category === selectedCategory
                        ? null
                        : segment.category,
                    )
                  }
                  onMouseDown={(event) => event.preventDefault()}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      setSelectedCategory(
                        segment.category === selectedCategory
                          ? null
                          : segment.category,
                      );
                    }
                  }}
                />
              ))}
              <text
                x="100"
                y="57"
                textAnchor="middle"
                fill="white"
                fontSize="12"
                fontWeight="600"
              >
                <tspan x="100" dy="0">30%</tspan>
                <tspan x="100" dy="14">Suites</tspan>
              </text>
              <text
                x="157"
                y="75"
                textAnchor="middle"
                fill="white"
                fontSize="11"
                fontWeight="600"
              >
                15%
              </text>
              <text
                x="157"
                y="89"
                textAnchor="middle"
                fill="white"
                fontSize="11"
                fontWeight="600"
              >
                Services
              </text>
              <text
                x="139"
                y="130"
                textAnchor="middle"
                fill="white"
                fontSize="12"
                fontWeight="600"
              >
                <tspan x="139" dy="0">35%</tspan>
                <tspan x="139" dy="14">Deluxe</tspan>
              </text>
              <text
                x="63"
                y="116"
                textAnchor="middle"
                fill="white"
                fontSize="12"
                fontWeight="600"
              >
                20%
              </text>
              <text
                x="63"
                y="130"
                textAnchor="middle"
                fill="white"
                fontSize="12"
                fontWeight="600"
              >
                Standard
              </text>
            </svg>
          </div>
          <p className="mt-3 text-center text-[10px] text-[#647168]">
            {selectedCategory
              ? `Showing ${selectedCategory} transactions`
              : "Select a segment to filter"}
          </p>
          <button className="mt-3 w-full rounded-md bg-[#004B3D] px-3 py-3 text-[11px] text-white transition-colors hover:bg-[#00382D]">
            View Booking Transactions
          </button>
        </section>

        <section className="min-w-0">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-medium">Transactions</h2>
            <Link
              href="/manager/analytics"
              className="text-xs text-[#0F5A48] hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[610px] border-separate border-spacing-y-2 text-[11px]">
              <thead className="bg-white text-left text-[10px]">
                <tr>
                  <th className="px-3 py-2 font-medium">PAYMENT ID</th>
                  <th className="px-3 py-2 font-medium">GUEST</th>
                  <th className="px-3 py-2 font-medium">AMOUNT</th>
                  <th className="px-3 py-2 font-medium">STATUS</th>
                  <th className="px-3 py-2 font-medium">DATE &amp; TIME</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.guest} className="bg-white">
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <span className="h-9 w-9 shrink-0 rounded-full bg-[#004B3D]" />
                        PAY-22323567
                      </div>
                    </td>
                    <td className="px-3 py-3">{transaction.guest}</td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {transaction.amount}
                    </td>
                    <td className="px-3 py-3">
                      <span className="rounded-full bg-[#DDF7E9] px-2 py-1 text-[#05613D]">
                        Completed
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {transaction.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredTransactions.length === 0 && (
              <p className="py-8 text-center text-xs text-[#647168]">
                No transactions for this category.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
