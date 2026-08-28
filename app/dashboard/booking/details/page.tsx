"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Plus_Jakarta_Sans } from "next/font/google";
import { LISTINGS } from "../../../data/listings";
import { ChevronLeft } from "lucide-react";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

function formatDate(value: string) {
  if (!value) return "Not selected";
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatNaira(value: number) {
  return `₦${value.toLocaleString("en-NG")}`;
}

const qrPattern = [
  "1111111001011111111",
  "1000001011011000001",
  "1011101000011011101",
  "1011101011011011101",
  "1011101001011011101",
  "1000001010011000001",
  "1111111010101111111",
  "0000000011010000000",
  "1101011110011010111",
  "0011110011110001100",
  "1110011010011110011",
  "0000000011100011010",
  "1111111010111010011",
  "1000001011001110100",
  "1011101001110011111",
  "1011101010011010001",
  "1011101001100111011",
  "1000001010111001100",
  "1111111011001010111",
];

function BookingQr() {
  return (
    <div className="grid h-28 w-28 grid-cols-19 gap-0.5 rounded-md border border-gray-200 bg-white p-2">
      {qrPattern.flatMap((row, rowIndex) =>
        [...row].map((cell, columnIndex) => (
          <span
            key={`${rowIndex}-${columnIndex}`}
            className={cell === "1" ? "bg-slate-900" : "bg-white"}
          />
        )),
      )}
    </div>
  );
}

export default function BookingDetailsPage() {
  const searchParams = useSearchParams();
  const listing = LISTINGS.find((item) => item.id === searchParams.get("slug")) || LISTINGS[0];
  const guests = searchParams.get("guests") || "2";
  const total = Number(searchParams.get("total")) || listing.price;
  const cardLast4 = searchParams.get("cardLast4") || "4348";

  return (
    <div className={`${plusJakartaSans.className} min-h-[calc(100vh-110px)] rounded-xl border border-gray-200 bg-white p-4 sm:p-5`}>
      <div className="mx-auto max-w-265 rounded-xl border border-gray-200 bg-white p-5 shadow-[0_5px_18px_rgba(15,23,42,0.08)] sm:p-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_270px]">
          <section>
            <h1 className="text-lg font-semibold text-slate-950">Booking Details</h1>
            <p className="mt-1 text-xs text-gray-500">Confirmation code</p>
            <div className="mt-1 flex flex-wrap items-center gap-3">
              <p className="text-base font-semibold text-slate-950">NYG-2066-YKWGO</p>
              <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs text-emerald-800">Confirmed</span>
            </div>

            <div className="mt-3 flex gap-2">
              <img src={listing.images[0]} alt={listing.title} className="h-47 w-44 rounded-lg object-cover" />
              <div className="min-w-0 text-sm text-slate-800">
                <p className="font-semibold">Cozy 2-Bedroom Apartment</p>
                <p className="mt-1">{listing.location}</p>
                <dl className="mt-2 grid grid-cols-[1fr_auto] gap-x-8 gap-y-1">
                  <dt>Check-in</dt><dd>{formatDate(searchParams.get("checkIn") || "2026-12-24")}</dd>
                  <dt>Check-out</dt><dd>{formatDate(searchParams.get("checkOut") || "2026-12-31")}</dd>
                  <dt>Guests</dt><dd>{guests} Guests</dd>
                  <dt>Total Paid</dt><dd>{formatNaira(total)}</dd>
                  <dt>Payment Method</dt><dd>Visa **** **** {cardLast4}</dd>
                </dl>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <button className="h-10 rounded-lg border border-gray-200 text-xs text-slate-700 hover:bg-gray-50">View Receipt</button>
              <button className="h-10 rounded-lg border border-gray-200 text-xs text-slate-700 hover:bg-gray-50">Add to Calendar</button>
              <button className="h-10 rounded-lg border border-gray-200 text-xs text-slate-700 hover:bg-gray-50">Get Directions</button>
            </div>
          </section>

          <aside className="border-t border-gray-200 pt-5 text-sm text-slate-800 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <h2 className="text-base font-semibold text-slate-950">Contact Information</h2>
            <p className="mt-2">♟ &nbsp;+234 801 234 4567</p>
            <p className="mt-2">✉ &nbsp;helpdesk@nyangu.com</p>
            <div className="mt-3 flex gap-2">
              <button aria-label="Message host" className="h-10 w-14 rounded-lg border border-gray-200 text-lg">▰</button>
              <button aria-label="Call host" className="h-10 w-14 rounded-lg border border-gray-200 text-lg">⌕</button>
            </div>
            <h2 className="mt-6 text-base font-semibold text-slate-950">Property Address</h2>
            <p className="mt-2">777 Placeholder Road</p>
            <p className="mt-1">{listing.location}</p>
            <div className="mt-4 flex justify-center lg:justify-start"><BookingQr /></div>
            <p className="mt-4 text-center font-semibold text-emerald-900 lg:text-left">Show at Check-in</p>
          </aside>
        </div>
      </div>
      <Link href="/dashboard/listings" className="mx-auto mt-5 flex max-w-265 items-center gap-1 text-xs text-emerald-800 hover:underline">
        <ChevronLeft size={15} aria-hidden="true" />
        Back to listings
      </Link>
    </div>
  );
}
