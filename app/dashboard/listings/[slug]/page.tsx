"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";
import { LISTINGS, type Listing} from "../../../data/listings";
import { Bath, BedDouble, CarFront, Ruler } from "lucide-react";
import {
  getSavedListingIds,
  SAVED_LISTINGS_EVENT,
  toggleSavedListing,
} from "../../data/saved-listings";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

function formatDate(value: string) {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00`);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatNaira(value: number) {
  return `₦${value.toLocaleString("en-NG")}`;
}

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const AMENITY_ICONS: Record<string, string> = {
  "Wi-Fi": "/image/wifi_icon.png",
  "Air Conditioning": "/image/Airconditioning_icon.png",
  "Swimming pool": "/image/Spa_icon.png",
  "Fitness center": "/image/comfort_icon.png",
  "Room service": "/image/comfort_icon.png",
  "Parking Space": "/image/Free parking_icon.png",
  "Smart TV": "/image/workspace_icon.png",
  Kitchen: "/image/Kitchen_icon.png",
  Washer: "/image/washer_icon.png",
  Workspace: "/image/workspace_icon.png",
  Bathtub: "/image/bathtub_icon.png",
  Refrigerator: "/image/refrigerator_icon.png",
  Housekeeping: "/image/comfort_icon.png",
};

function toDateValue(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function dateFromValue(value: string) {
  return new Date(`${value}T00:00:00`);
}

function monthLabel(month: Date) {
  return month.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export default function PropertyDetailPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const listing = LISTINGS.find(
    (Item) => Item.id ===params.slug
);

  const [activeImage, setActiveImage] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [saved, setSaved] = useState(false);
  const [checkingAvailability, setcheckingAvailablity] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [selectingDate, setSelectingDate] = useState<"checkIn" | "checkOut">("checkIn");
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  useEffect(() => {
    const syncSavedState = () => setSaved(getSavedListingIds().includes(listing?.id ?? ""));
    syncSavedState();
    window.addEventListener(SAVED_LISTINGS_EVENT, syncSavedState);
    window.addEventListener("storage", syncSavedState);
    return () => {
      window.removeEventListener(SAVED_LISTINGS_EVENT, syncSavedState);
      window.removeEventListener("storage", syncSavedState);
    };
  }, [listing?.id]);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const diff =
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
      (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : 0;
  }, [checkIn, checkOut]);

  if (!listing) {
    return (
      <main
        className={`${plusJakartaSans.className} w-full min-h-screen flex items-center justify-center bg-[#f8f8f8] px-4`}
      >
        <div className="text-center">
          <h1 className="text-lg font-semibold text-slate-900 mb-2">
            Property not found
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            This listing may have been removed or the link is incorrect.
          </p>
          <Link
            href="/listings"
            className="text-sm font-medium text-emerald-700 hover:text-emerald-900 transition"
          >
            &larr; Back to listings
          </Link>
        </div>
      </main>
    );
  }

  const subtotal = listing.price * nights;
  const serviceFee = Math.round(subtotal * 0.1);
  const total = subtotal + serviceFee + (nights > 0 ? listing.cleaningFee : 0);

  const visibleThumbnails = listing.images.slice(1, 5);
  const remainingCount = listing.images.length - 5;
  const today = toDateValue(new Date());

  const openCalendar = (field: "checkIn" | "checkOut") => {
    const selected = field === "checkIn" ? checkIn : checkOut;
    const base = selected ? dateFromValue(selected) : new Date();
    setCalendarMonth(new Date(base.getFullYear(), base.getMonth(), 1));
    setSelectingDate(field);
    setDatePickerOpen(true);
  };

  const selectDate = (value: string) => {
    if (value < today || (selectingDate === "checkOut" && (!checkIn || value <= checkIn))) return;
    if (selectingDate === "checkIn") {
      setCheckIn(value);
      if (checkOut && value >= checkOut) setCheckOut("");
      setSelectingDate("checkOut");
      return;
    }
    setCheckOut(value);
    setDatePickerOpen(false);
  };

  const renderMonth = (month: Date) => {
    const firstDay = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
    const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    return (
      <section className="px-4 py-3" aria-label={monthLabel(month)}>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-900">{monthLabel(month)}</p>
          <span className="text-sm text-emerald-700">✓</span>
        </div>
        <div className="grid grid-cols-7 text-center text-[8px] font-medium uppercase tracking-wide text-gray-400">
          {DAY_NAMES.map((day) => <span key={day}>{day.slice(0, 2)}</span>)}
        </div>
        <div className="mt-2 grid grid-cols-7 gap-y-1 text-center">
          {Array.from({ length: firstDay }, (_, index) => <span key={`blank-${index}`} />)}
          {Array.from({ length: daysInMonth }, (_, index) => {
            const value = toDateValue(new Date(month.getFullYear(), month.getMonth(), index + 1));
            const isDisabled = value < today || !listing.availableDates.includes(value) || (selectingDate === "checkOut" && (!checkIn || value <= checkIn));
            const isStart = value === checkIn;
            const isEnd = value === checkOut;
            const isInRange = Boolean(checkIn && checkOut && value > checkIn && value < checkOut);
            return (
              <button key={value} type="button" disabled={isDisabled} onClick={() => selectDate(value)} className={`mx-auto flex h-6 w-6 items-center justify-center rounded-full text-[11px] transition ${isStart || isEnd ? "bg-emerald-700 font-semibold text-white" : isInRange ? "bg-emerald-50 text-emerald-900" : isDisabled ? "cursor-not-allowed text-gray-300" : "text-slate-700 hover:bg-emerald-50"}`}>
                {index + 1}
              </button>
            );
          })}
        </div>
      </section>
    );
  };


  return (
    <main
      className={`${plusJakartaSans.className} w-full min-h-screen bg-[#f7f9fa] px-4 py-6 sm:px-6 lg:px-8`}
    >
      <div className="mx-auto max-w-[1200px]">
        <button
          onClick={() => router.back()}
          className="mb-7 flex items-center gap-2 text-xs font-medium text-slate-700 transition hover:text-emerald-800"
        >
          <span className="text-lg leading-none">‹</span> Back to listings
        </button>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_330px]">
          {/* Left: gallery + details */}
          <div className="rounded-xl border border-gray-200 bg-white p-3.5 shadow-sm sm:p-4">
            <div className="relative mb-2 overflow-hidden rounded-lg">
              <img
                src={listing.images[activeImage]}
                alt={listing.title}
                className="h-56 w-full object-cover sm:h-[360px]"
              />
              <button
                onClick={() => setSaved(new Set(toggleSavedListing(listing.id)).has(listing.id))}
                aria-label="Toggle favorite"
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg shadow-sm"
              >
                {saved ? "♥" : "♡"}
              </button>
            </div>

            {listing.images.length > 1 && (
              <div className="mb-3 grid grid-cols-5 gap-2">
                {listing.images.slice(0, 4).map((img, idx) => (
                  <button
                    key={img}
                    onClick={() => setActiveImage(idx)}
                    className={`h-12 overflow-hidden rounded-md border-2 transition sm:h-14 ${
                      activeImage === idx
                        ? "border-emerald-700"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
                {listing.images.length > 4 && (
                  <button
                    onClick={() => setActiveImage(4)}
                    className="relative h-12 overflow-hidden rounded-md sm:h-14"
                  >
                    <img
                      src={listing.images[4]}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    {remainingCount > 0 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-sm font-medium text-white">
                        +{remainingCount}
                      </div>
                    )}
                  </button>
                )}
              </div>
            )}

            <h1 className="mb-1 text-base font-semibold text-slate-900 sm:text-lg">
              {listing.title}
            </h1>
            <p className="mb-3 text-xs text-gray-500">⌖ {listing.location}</p>

            <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-gray-600">
              <span className="inline-flex items-center gap-1">
                <BedDouble size={15} aria-hidden="true" />
                {listing.beds} Beds
              </span>
              <span className="inline-flex items-center gap-1">
                <Bath size={15} aria-hidden="true" />
                {listing.baths} Bath
              </span>
              <span className="inline-flex items-center gap-1">
                <Ruler size={15} aria-hidden="true" />
                {listing.sqm} sqm
              </span>
              {listing.parking && (
                <span className="inline-flex items-center gap-1">
                  <CarFront size={15} aria-hidden="true" />
                  Parking
                </span>
              )}
            </div>

            <p className="mb-6 text-sm font-semibold text-emerald-900">
              {formatNaira(listing.price)}
              <span className="text-xs font-normal text-gray-400"> /night</span>
            </p>

            <div className="mb-6 border-t border-gray-100 pt-5">
              <h2 className="mb-2 text-base font-semibold text-slate-900">
                About this property
              </h2>
              <p className="text-sm font-medium leading-relaxed text-gray-600">
                {listing.description}
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-xs font-semibold text-slate-900">
                Amenities
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {listing.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2 text-xs text-gray-600"
                  >
                    <img
                      src={AMENITY_ICONS[amenity] ?? "/image/check_icon.png"}
                      alt=""
                      className="h-4 w-4 shrink-0 object-contain"
                    />
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: booking card */}
          <aside className="h-fit rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:sticky lg:top-6">
            <p className="mb-5 text-sm font-semibold text-slate-900">
              {formatNaira(listing.price)}
              <span className="text-xs font-normal text-gray-500"> /night</span>
            </p>

            <div className="mb-3 grid grid-cols-1 gap-3">
              <button
                type="button"
                onClick={() => openCalendar("checkIn")}
                className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 px-3 py-3 text-left transition hover:border-emerald-300"
              >
                <span className="text-xs text-slate-900">
                  <span className="mb-1 block text-[10px] text-gray-500">Check-in</span>
                  {formatDate(checkIn) || "Select date"}
                </span>
                <span className="text-xs text-gray-400">▦</span>
              </button>

              <button
                type="button"
                onClick={() => openCalendar("checkOut")}
                className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 px-3 py-3 text-left transition hover:border-emerald-300"
              >
                <span className="text-xs text-slate-900">
                  <span className="mb-1 block text-[10px] text-gray-500">Check-out</span>
                  {formatDate(checkOut) || "Select date"}
                </span>
                <span className="text-xs text-gray-400">▦</span>
              </button>
            </div>

            <div className="mb-5">
              <label className="mb-1 block text-[10px] text-gray-500">Guests</label>
              <div className="relative">
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-3 text-xs text-slate-900 outline-none"
                >
                  {Array.from({ length: listing.maxGuests }, (_, i) => i + 1).map(
                    (n) => (
                      <option key={n} value={n}>
                        {n} Guest{n > 1 ? "s" : ""}
                      </option>
                    ),
                  )}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">⌄</span>
              </div>
            </div>

            <div className="mb-4 border-t border-gray-100 pt-4">
              <p className="mb-3 text-xs font-semibold text-slate-900">Booking Summary</p>
              <div className="mb-2 flex justify-between text-[10px] text-gray-600">
                <span>{formatNaira(listing.price)} x {nights || 0} night{nights === 1 ? "" : "s"}</span>
                <span>{formatNaira(subtotal)}</span>
              </div>
              <div className="mb-2 flex justify-between text-[10px] text-gray-600">
                <span>Service Fee (10%)</span>
                <span>{formatNaira(serviceFee)}</span>
              </div>
              <div className="mb-3 flex justify-between text-[10px] text-gray-600">
                <span>Cleaning Fee</span>
                <span>{formatNaira(nights > 0 ? listing.cleaningFee : 0)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-3 text-xs font-semibold text-slate-900">
                <span>Total</span>
                <span className="text-emerald-800">{formatNaira(total)}</span>
              </div>
            </div>

            <button
              disabled={nights === 0}
              onClick={() =>{
                setcheckingAvailablity(true);
                setTimeout(() => {
                  const query = new URLSearchParams({
                    checkIn,
                    checkOut,
                    guests: String(guests),
                  }).toString();
                  router.push(`/dashboard/listings/${listing.id}/payment?${query}`);
                }, 1800);
              }}
              className="mb-2 w-full rounded-lg bg-emerald-900 py-3 text-xs font-medium text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Book Now
            </button>
            <button
              onClick={() => setSaved(new Set(toggleSavedListing(listing.id)).has(listing.id))}
              className="mb-3 w-full rounded-lg border border-emerald-800 py-3 text-xs font-medium text-emerald-900 transition hover:bg-emerald-50"
            >
              {saved ? "♥ Saved" : "♡ Save for Later"}
            </button>
            <p className="text-center text-[10px] text-gray-400">
              ◉ Your data is safe
            </p>
          </aside>
        </div>
      </div>

      {checkingAvailability && (
  <>
    <div className="fixed inset-0 bg-black/50 z-[60]" />
    <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-8 flex flex-col items-center text-center">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-emerald-700 rounded-full animate-spin mb-5" />
        <h3 className="text-base font-semibold text-slate-900 mb-2">
          Almost ready - preparing your booking details...
        </h3>
        <p className="text-sm text-gray-500">
          Please wait while we get everything set up for you.
        </p>
      </div>
    </div>
  </>
)}

      {datePickerOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-start justify-center bg-black/55 px-4 pt-5 sm:items-center sm:pt-0"
          role="dialog"
          aria-modal="true"
          aria-label="Select booking dates"
          onMouseDown={() => setDatePickerOpen(false)}
        >
          <div
            className="w-full max-w-[290px] overflow-hidden rounded-lg bg-white shadow-2xl"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
              <div>
                <p className="text-xs font-semibold text-slate-900">Select your dates</p>
                <p className="text-[10px] text-[#000000]">{selectingDate === "checkIn" ? "Choose check-in" : "Choose check-out"}</p>
              </div>
              <button type="button" onClick={() => setDatePickerOpen(false)} className="text-lg leading-none text-gray-400 hover:text-slate-700" aria-label="Close calendar">×</button>
            </div>
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-2">
              <button type="button" onClick={() => setCalendarMonth((month) => new Date(month.getFullYear(), month.getMonth() - 1, 1))} className="rounded p-1 text-slate-700 hover:bg-gray-100" aria-label="Previous month">‹</button>
              <span className="text-[11px] font-medium text-gray-500">{monthLabel(calendarMonth)}</span>
              <button type="button" onClick={() => setCalendarMonth((month) => new Date(month.getFullYear(), month.getMonth() + 1, 1))} className="rounded p-1 text-slate-700 hover:bg-gray-100" aria-label="Next month">›</button>
            </div>
            {renderMonth(calendarMonth)}
            <div className="border-t border-gray-100" />
            {renderMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1))}
          </div>
        </div>
      )}
    
    </main>
  );
}
