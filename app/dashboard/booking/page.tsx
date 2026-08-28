"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function BookingSubmittedPage() {
  const searchParams = useSearchParams();
  const [bookingQuery, setBookingQuery] = useState<string | null>(null);

  useEffect(() => {
    const query = searchParams.toString() || sessionStorage.getItem("nyangu-booking");
    setBookingQuery(query);
  }, [searchParams]);

  if (!bookingQuery) {
    return (
      <div className="flex min-h-[calc(100vh-110px)] items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-16">
        <div className="text-center">
          <h1 className="text-base font-semibold text-slate-950">No bookings yet</h1>
          <p className="mt-2 text-xs text-gray-500">Your confirmed bookings will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-110px)] items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-16">
      <div className="flex max-w-sm flex-col items-center text-center">
        <div className="mb-2 flex h-18 w-18 items-center justify-center rounded-full bg-[#003E30] text-5xl text-white">
          <span className="-mt-1">✓</span>
        </div>
        <h1 className="text-sm font-bold text-slate-950">Booking Submitted!</h1>
        <p className="mt-1 text-[11px] text-slate-800">
          Your booking request has been placed successfully.
        </p>
        <Link
          href={`/dashboard/booking/details?${bookingQuery}`}
          className="mt-4 flex h-8 w-36 items-center justify-center rounded-md bg-[#003E30] text-[11px] font-medium text-white transition hover:bg-emerald-800"
        >
          View Booking
        </Link>
      </div>
    </div>
  );
}
