"use client";

import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";
import { LISTINGS } from "../../../../../data/listings";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

function formatNaira(value: number) {
  return `₦${value.toLocaleString("en-NG")}`;
}

function formatDate(value: string) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const MOCK_GUEST = {
  name: "Joy Edward",
  email: "joyedward124@gmail.com",
  phone: "+234 801 234 4567",
  idType: "National ID",
  idNumber: "1234 5678 9012",
};

export default function ReviewBookingPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const listing = LISTINGS.find((item) => item.id === params.slug);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [specialRequests, setSpecialRequests] = useState("");

  if (!listing) {
    return (
      <main
        className={`${plusJakartaSans.className} w-full min-h-screen flex items-center justify-center bg-[#f8f8f8] px-4`}
      >
        <p className="text-sm text-gray-500">Property not found.</p>
      </main>
    );
  }

  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";
  const guests = searchParams.get("guests") || "1";

  const nights =
    checkIn && checkOut
      ? Math.max(
          0,
          (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  const subtotal = listing.price * nights;
  const serviceFee = Math.round(subtotal * 0.1);
  const total = subtotal + serviceFee + (nights > 0 ? listing.cleaningFee : 0);

  const cancellationDate = checkIn
    ? formatDate(
        new Date(new Date(checkIn).getTime() - 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0]
      )
    : "";

  const Sidebar = (
    <>
      {!sidebarOpen && (
        <div className="lg:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between bg-white border-b border-gray-100 px-4 py-3">
          <img src="/image/Logo.png" alt="Nyangu" className="w-24" />
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100"
          >
            <img src="/image/hamburger.png" alt="Menu" className="w-5 h-5" />
          </button>
        </div>
      )}

      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`w-64 bg-white border-r border-gray-100 flex flex-col justify-between py-6 px-5 fixed lg:static inset-y-0 left-0 z-50 transform transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div>
          <div className="flex items-center gap-2 mb-1 px-1">
            <img src="/image/Logo.png" alt="Nyangu" className="w-32" />
          </div>
          <p className="text-sm text-gray-400 px-1 mb-8 ml-12">Stay in style</p>

          <nav className="flex flex-col gap-1">
            <Link href="/dashboard" className="w-full flex items-center justify-start gap-3 px-3 py-2.5 rounded-lg hover:bg-emerald-100 text-gray-600 font-medium text-sm">
              <img src="/image/Homeframe_icon.png" alt="" className="w-5 h-5 object-contain shrink-0" />
              <span>Home</span>
            </Link>
            <Link href="/listings" className="w-full flex items-center justify-start gap-3 px-3 py-2.5 rounded-lg hover:bg-emerald-100 text-gray-600 font-medium text-sm">
              <img src="/image/Browseproperty_icon.png" alt="" className="w-5 h-5 object-contain shrink-0" />
              <span>Browse Stay</span>
            </Link>
            <Link href="/dashboard/saved" className="w-full flex items-center justify-start gap-3 px-3 py-2.5 rounded-lg hover:bg-emerald-100 text-gray-600 font-medium text-sm">
              <img src="/image/Savedhomes_icon.png" alt="" className="w-5 h-5 object-contain shrink-0" />
              <span>Saved Stay</span>
            </Link>
            <Link href="/dashboard/bookings" className="w-full flex items-center justify-start gap-3 px-3 py-2.5 rounded-lg bg-emerald-100 font-medium text-sm">
              <img src="/image/Application_icon.png" alt="" className="w-5 h-5 object-contain shrink-0" />
              <span>Bookings</span>
            </Link>
            <Link href="/dashboard/favourites" className="w-full flex items-center justify-start gap-3 px-3 py-2.5 rounded-lg hover:bg-emerald-100 text-gray-600 font-medium text-sm">
              <img src="/image/Favourite_icon.png" alt="" className="w-5 h-5 object-contain shrink-0" />
              <span>Favourites</span>
            </Link>
          </nav>
        </div>

        <div className="mt-auto">
          <button
            onClick={() => router.push("/login")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-emerald-100 transition font-medium text-sm"
          >
            <img src="/image/logout_icon.png" alt="" className="w-5 h-5" />
            <span>Log out</span>
          </button>
        </div>
      </aside>
    </>
  );

  return (
    <main className={`${plusJakartaSans.className} w-full min-h-screen flex bg-[#f8f8f8]`}>
      {/* {Sidebar} */}
      <section className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-6 pt-20 lg:pt-6 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: booking details */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h1 className="text-base font-semibold text-slate-900 mb-1">
                Review Your Booking
              </h1>
              <p className="text-sm text-gray-400 mb-5">
                Please confirm your details before payment
              </p>

              <div className="flex gap-3 mb-5 pb-5 border-b border-gray-100">
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-20 h-16 object-cover rounded-lg shrink-0"
                />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{listing.title}</p>
                  <p className="text-xs text-gray-400 mb-1">{listing.location}</p>
                  <p className="text-xs text-gray-500">
                    {listing.beds} Beds &middot; {listing.baths} Bath &middot;{" "}
                    {listing.sqm} sqm
                    {listing.parking && <> &middot; Parking</>}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-5 pb-5 border-b border-gray-100">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Check-in</p>
                  <p className="text-sm font-medium text-slate-900">{formatDate(checkIn)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Check-out</p>
                  <p className="text-sm font-medium text-slate-900">{formatDate(checkOut)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Stay</p>
                  <p className="text-sm font-medium text-slate-900">
                    {nights} Night{nights === 1 ? "" : "s"}
                  </p>
                </div>
              </div>

              <div className="mb-5 pb-5 border-b border-gray-100">
                <p className="text-sm font-semibold text-slate-900 mb-2">Guest Details</p>
                <p className="text-sm text-slate-700">{MOCK_GUEST.name}</p>
                <p className="text-sm text-gray-500">{MOCK_GUEST.email} </p>
                <p className="text-sm text-gray-500">{MOCK_GUEST.phone}</p>
                <p className="text-sm text-gray-500">{guests} Guests</p>
                <p className="text-sm text-gray-500">
                  ID: {MOCK_GUEST.idType} - {MOCK_GUEST.idNumber}
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900 mb-2">Special Requests</p>
                <textarea
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Any special requests? (optional)"
                  rows={2}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none resize-none"
                />
              </div>
            </div>

            {/* Right: price breakdown */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 h-fit">
              <p className="text-sm font-semibold text-slate-900 mb-4">Price Breakdown</p>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>
                  {formatNaira(listing.price)} x {nights} night{nights === 1 ? "" : "s"}
                </span>
                <span>{formatNaira(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Service Fee (10%)</span>
                <span>{formatNaira(serviceFee)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-3">
                <span>Cleaning Fee</span>
                <span>{formatNaira(nights > 0 ? listing.cleaningFee : 0)}</span>
              </div>
              <div className="flex justify-between text-base font-semibold text-slate-900 pt-3 border-t border-gray-100 mb-4">
                <span>Total</span>
                <span>{formatNaira(total)}</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-emerald-700 mb-4">
                <span>✓</span>
                <span>Free cancellation before {cancellationDate}</span>
              </div>

              <p className="text-xs text-gray-400 mb-5">
                By confirming, you agree to our Terms &amp; Conditions and House Rules
              </p>

              <div className="flex gap-3 mb-3">
                <button
                  onClick={() => router.back()}
                  className="flex-1 border border-gray-200 text-gray-700 text-sm font-medium py-2.5 rounded-lg hover:bg-gray-50 transition"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    const query = new URLSearchParams({
                      slug: listing.id,
                      checkIn,
                      checkOut,
                      guests,
                      total: String(total),
                      cardLast4: searchParams.get("cardLast4") || "4348",
                    }).toString();
                    sessionStorage.setItem("nyangu-booking", query);
                    router.push(`/dashboard/booking?${query}`);
                  }}
                  className="flex-1 bg-emerald-800 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-emerald-900 transition"
                >
                  Confirm &amp; Pay {formatNaira(total)}
                </button>
              </div>
              <p className="text-xs text-gray-400 text-center">
                🔒 Your payment is secure and encrypted
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}