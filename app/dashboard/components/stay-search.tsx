"use client";

import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, Search } from "lucide-react";

const PROPERTY_TYPES = ["Apartments", "Studios", "Duplexes", "Penthouses"];
const BEDROOMS = ["1", "2", "3", "4", "5+"];
const AMENITIES = [
  "Wi-Fi",
  "Air Conditioning",
  "Swimming pool",
  "Room service",
  "Parking Space",
  "Fitness center",
];

function formatDate(value: string) {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00`);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function toDateValue(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

type StaySearchProps = {
  actionLabel?: string;
};

export default function StaySearch({
  actionLabel = "Search Stay",
}: StaySearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const today = toDateValue(new Date());
  const [checkIn, setCheckIn] = useState(() => {
    const requestedCheckIn = searchParams.get("checkIn") ?? "";
    return requestedCheckIn >= today ? requestedCheckIn : "";
  });
  const [checkOut, setCheckOut] = useState(searchParams.get("checkOut") ?? "");
  const requestedGuests = Number(searchParams.get("guests") ?? 1);
  const [guests, setGuests] = useState(
    Number.isFinite(requestedGuests) ? Math.max(1, requestedGuests) : 1,
  );
  const [guestOpen, setGuestOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(searchParams.get("type") ?? "");
  const [selectedBedrooms, setSelectedBedrooms] = useState(searchParams.get("bedrooms") ?? "");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    searchParams.get("amenities")?.split(",").filter(Boolean) ?? [],
  );
  const [maxPrice, setMaxPrice] = useState(Number(searchParams.get("maxPrice") ?? 250000));
  const [minRating, setMinRating] = useState(Number(searchParams.get("minRating") ?? 0));
  const checkInRef = useRef<HTMLInputElement>(null);
  const checkOutRef = useRef<HTMLInputElement>(null);

  const openDatePicker = (ref: React.RefObject<HTMLInputElement | null>) => {
    if (ref.current?.showPicker) {
      ref.current.showPicker();
    } else {
      ref.current?.focus();
    }
  };

  const searchStays = () => {
    if (checkIn && checkIn < today) {
      setCheckIn("");
      return;
    }

    const params = new URLSearchParams();
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    params.set("guests", String(guests));
    if (selectedType) params.set("type", selectedType);
    if (selectedBedrooms) params.set("bedrooms", selectedBedrooms);
    if (selectedAmenities.length) params.set("amenities", selectedAmenities.join(","));
    if (maxPrice < 250000) params.set("maxPrice", String(maxPrice));
    if (minRating) params.set("minRating", String(minRating));
    router.push(`/dashboard/listings?${params.toString()}`);
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((current) =>
      current.includes(amenity)
        ? current.filter((item) => item !== amenity)
        : [...current, amenity],
    );
  };

  const clearFilters = () => {
    setSelectedType("");
    setSelectedBedrooms("");
    setSelectedAmenities([]);
    setMaxPrice(250000);
    setMinRating(0);
  };

  const applyFilters = () => {
    searchStays();
    setFiltersOpen(false);
  };

  return (
    <div className="grid grid-cols-1 gap-3 mb-8 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]">
      <div
        onClick={() => openDatePicker(checkInRef)}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => event.key === "Enter" && openDatePicker(checkInRef)}
        className="cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-3 transition hover:border-emerald-400"
      >
        <p className="mb-1 text-xs text-black">Check-in</p>
        <div className="flex items-center gap-2">
          <img src="/image/Calendar_icon.png" alt="" className="h-4 w-4 opacity-60" />
          <span className={`text-sm ${checkIn ? "text-slate-900" : "text-gray-400"}`}>
            {formatDate(checkIn) || "Add date"}
          </span>
          <input
            ref={checkInRef}
            type="date"
            value={checkIn}
            min={today}
            onChange={(event) => {
              const selectedDate = event.target.value;
              if (selectedDate < today) return;
              setCheckIn(selectedDate);
              if (checkOut && selectedDate > checkOut) setCheckOut("");
            }}
            className="sr-only"
          />
        </div>
      </div>

      <div
        onClick={() => openDatePicker(checkOutRef)}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => event.key === "Enter" && openDatePicker(checkOutRef)}
        className="cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-3 transition hover:border-emerald-400"
      >
        <p className="mb-1 text-xs text-black">Check-out</p>
        <div className="flex items-center gap-2">
          <img src="/image/Calendar_icon.png" alt="" className="h-4 w-4 opacity-60" />
          <span className={`text-sm ${checkOut ? "text-slate-900" : "text-gray-400"}`}>
            {formatDate(checkOut) || "Add date"}
          </span>
          <input
            ref={checkOutRef}
            type="date"
            value={checkOut}
            min={checkIn || undefined}
            onChange={(event) => setCheckOut(event.target.value)}
            className="sr-only"
          />
        </div>
      </div>

      <div className="relative rounded-xl border border-gray-200 bg-white px-4 py-3">
        <p className="mb-1 text-xs text-black">Guests</p>
        <button
          type="button"
          onClick={() => setGuestOpen((open) => !open)}
          aria-expanded={guestOpen}
          className="flex w-full items-center gap-2 text-left"
        >
          <img src="/image/Addguest_icon.png" alt="" className="h-4 w-4 opacity-60" />
          <span className="text-sm text-slate-900">
            {guests} {guests === 1 ? "Guest" : "Guests"}
          </span>
        </button>
        {guestOpen && (
          <div className="absolute left-0 right-0 top-full z-20 mt-2 flex items-center justify-between rounded-xl border border-gray-200 bg-white p-3 shadow-lg">
            <span className="text-sm text-slate-700">Guests</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setGuests((count) => Math.max(1, count - 1))}
                aria-label="Remove guest"
                className="h-7 w-7 rounded-full border border-gray-300 text-lg leading-none text-slate-700"
              >
                -
              </button>
              <span className="w-4 text-center text-sm font-semibold">{guests}</span>
              <button
                type="button"
                onClick={() => setGuests((count) => Math.min(10, count + 1))}
                aria-label="Add guest"
                className="h-7 w-7 rounded-full border border-gray-300 text-lg leading-none text-slate-700"
              >
                +
              </button>
            </div>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={searchStays}
        className={`flex items-center justify-center gap-2 rounded-xl border px-5 py-3 transition ${"border-emerald-900 bg-emerald-900 text-white hover:bg-emerald-800"}`}
      >
        <Search size={24} />
        <span className="text-sm">{actionLabel}</span>
      </button>

      <div></div>
      <div></div>
      <div></div>
      <button type="button" onClick={() => setFiltersOpen(true)} className="flex items-center justify-center gap-2">
        <Filter size={20} color="#000" />
        <p className="text-sm">Filters</p>
      </button>

      {filtersOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-labelledby="filter-title">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-5 shadow-xl sm:p-7">
            <div className="mb-5 flex items-center justify-between">
              <h2 id="filter-title" className="text-lg font-semibold text-slate-900">Filters</h2>
              <button type="button" onClick={() => setFiltersOpen(false)} aria-label="Close filters" className="text-sm text-gray-500 hover:text-black">Close</button>
            </div>

            <div className="mb-5">
              <p className="mb-2 text-xs font-medium text-slate-700">Property Type</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                <button type="button" onClick={() => setSelectedType("")} className={`rounded-lg border px-3 py-2 text-sm ${!selectedType ? "border-emerald-900 bg-emerald-900 text-white" : "border-gray-200"}`}>All</button>
                {PROPERTY_TYPES.map((type) => (
                  <button type="button" key={type} onClick={() => setSelectedType(type)} className={`rounded-lg border px-3 py-2 text-sm ${selectedType === type ? "border-emerald-900 bg-emerald-900 text-white" : "border-gray-200"}`}>{type}</button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-medium text-slate-700">Price Range (Per Night)</p>
                <span className="text-xs text-gray-500">Up to ₦{maxPrice.toLocaleString("en-NG")}</span>
              </div>
              <input type="range" min="35000" max="250000" step="5000" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} className="w-full accent-emerald-800" />
            </div>

            <div className="mb-5">
              <p className="mb-2 text-xs font-medium text-slate-700">Bedrooms</p>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => setSelectedBedrooms("")} className={`rounded-lg border px-4 py-2 text-sm ${!selectedBedrooms ? "border-emerald-900 bg-emerald-900 text-white" : "border-gray-200"}`}>All</button>
                {BEDROOMS.map((bedroom) => (
                  <button type="button" key={bedroom} onClick={() => setSelectedBedrooms(bedroom)} className={`rounded-lg border px-4 py-2 text-sm ${selectedBedrooms === bedroom ? "border-emerald-900 bg-emerald-900 text-white" : "border-gray-200"}`}>{bedroom}</button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <p className="mb-2 text-xs font-medium text-slate-700">Amenities</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
                {AMENITIES.map((amenity) => (
                  <label key={amenity} className="flex items-center gap-2 text-sm text-gray-600">
                    <input type="checkbox" checked={selectedAmenities.includes(amenity)} onChange={() => toggleAmenity(amenity)} className="accent-emerald-800" />
                    {amenity}
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="mb-2 text-xs font-medium text-slate-700">Star Rating</p>
              <div className="flex flex-wrap gap-2">
                {[0, 1, 2, 3, 4, 5].map((rating) => (
                  <button type="button" key={rating} onClick={() => setMinRating(rating)} className={`rounded-lg border px-4 py-2 text-sm ${minRating === rating ? "border-emerald-900 bg-emerald-900 text-white" : "border-gray-200"}`}>{rating ? `★ ${rating}` : "All"}</button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 border-t border-gray-100 pt-4">
              <button type="button" onClick={clearFilters} className="flex-1 rounded-lg border border-gray-200 px-4 py-3 text-sm text-slate-700">Reset</button>
              <button type="button" onClick={applyFilters} className="flex-1 rounded-lg bg-emerald-900 px-4 py-3 text-sm text-white hover:bg-emerald-800">Apply Filters</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
