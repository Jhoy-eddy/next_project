"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";
import { LISTINGS, type Listing } from "../../data/listings";
import StaySearch from "../components/stay-search";
import {
  getSavedListingIds,
  SAVED_LISTINGS_EVENT,
  toggleSavedListing,
} from "../data/saved-listings";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

function getStayDates(checkIn: string, checkOut: string) {
  if (!checkIn) return [];

  const dates: string[] = [];
  const current = new Date(`${checkIn}T00:00:00`);
  const lastDate = new Date(`${(checkOut || checkIn)}T00:00:00`);

  while (current <= lastDate) {
    dates.push(current.toISOString().slice(0, 10));
    current.setDate(current.getDate() + 1);
  }

  return dates;
}


const PROPERTY_TYPES: Listing["type"][] = [
  "Apartments",
  "Houses",
  "Studios",
  "Duplexes",
  "Penthouses",
];

const AMENITIES = [
  "Wi-Fi",
  "Air Conditioning",
  "Swimming pool",
  "Room service",
  "Parking Space",
  "Fitness center",
];

const BEDROOM_OPTIONS = [
  { label: "1 Bedroom", value: 1 },
  { label: "2 Bedrooms", value: 2 },
  { label: "3 Bedrooms", value: 3 },
  { label: "4+ Bedrooms", value: 4 },
];

const MIN_PRICE = 65000;
const MAX_PRICE = 250000;

function formatNaira(value: number) {
  return `₦${value.toLocaleString("en-NG")}`;
}

function ListingsContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const searchParams = useSearchParams();

  const checkIn = searchParams.get("checkIn") ?? "";
  const checkOut = searchParams.get("checkOut") ?? "";
  const requestedGuests = Number(searchParams.get("guests") ?? 1);
  const guests = Number.isFinite(requestedGuests)
    ? Math.max(1, requestedGuests)
    : 1;

  const [selectedTypes, setSelectedTypes] = useState<Listing["type"][]>(
    searchParams.get("type") ? [searchParams.get("type") as Listing["type"]] : [],
  );
  const [selectedBedrooms, setSelectedBedrooms] = useState<number[]>(
    searchParams.get("bedrooms")
      ? [Number(searchParams.get("bedrooms") === "5+" ? 4 : searchParams.get("bedrooms"))]
      : [],
  );
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    searchParams.get("amenities")?.split(",").filter(Boolean) ?? [],
  );
  const [maxPrice, setMaxPrice] = useState(
    Number(searchParams.get("maxPrice") ?? MAX_PRICE),
  );
  const [minRating, setMinRating] = useState(
    Number(searchParams.get("minRating") ?? 0),
  );
  const [sortBy, setSortBy] = useState<
    "Recommended" | "Price: Low to High" | "Price: High to Low" | "Top Rated"
  >("Recommended");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const syncSavedListings = () => setFavorites(new Set(getSavedListingIds()));
    syncSavedListings();
    window.addEventListener(SAVED_LISTINGS_EVENT, syncSavedListings);
    window.addEventListener("storage", syncSavedListings);
    return () => {
      window.removeEventListener(SAVED_LISTINGS_EVENT, syncSavedListings);
      window.removeEventListener("storage", syncSavedListings);
    };
  }, []);

  useEffect(() => {
    const bedrooms = searchParams.get("bedrooms");
    setSelectedTypes(
      searchParams.get("type")
        ? [searchParams.get("type") as Listing["type"]]
        : [],
    );
    setSelectedBedrooms(
      bedrooms ? [Number(bedrooms === "5+" ? 4 : bedrooms)] : [],
    );
    setSelectedAmenities(searchParams.get("amenities")?.split(",").filter(Boolean) ?? []);
    setMaxPrice(Number(searchParams.get("maxPrice") ?? MAX_PRICE));
    setMinRating(Number(searchParams.get("minRating") ?? 0));
  }, [searchParams]);

  const toggleFavorite = (id: string) => {
    setFavorites(new Set(toggleSavedListing(id)));
  };

  const toggleFromList = <T,>(
    list: T[],
    value: T,
    setList: (v: T[]) => void,
  ) => {
    setList(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
    );
  };

  const filteredListings = useMemo(() => {
    const requestedDates = getStayDates(checkIn, checkOut);

    let results = LISTINGS.filter((listing) => {
      const matchesType =
        selectedTypes.length === 0 || selectedTypes.includes(listing.type);
      const matchesBedrooms =
        selectedBedrooms.length === 0 ||
        selectedBedrooms.some((b) =>
          b === 4 ? listing.beds >= 4 : listing.beds === b,
        );
      const matchesAmenities =
        selectedAmenities.length === 0 ||
        selectedAmenities.every((a) => listing.amenities.includes(a));
      const matchesPrice = listing.price <= maxPrice;
      const matchesGuests = listing.maxGuests >= guests;
      const matchesRating = listing.rating >= minRating;
      const matchesDates = requestedDates.every((date) =>
        listing.availableDates.includes(date),
      );
      return (
        matchesType &&
        matchesBedrooms &&
        matchesAmenities &&
        matchesPrice &&
        matchesGuests &&
        matchesRating &&
        matchesDates
      );
    });

    if (sortBy === "Price: Low to High") {
      results = [...results].sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price: High to Low") {
      results = [...results].sort((a, b) => b.price - a.price);
    } else if (sortBy === "Top Rated") {
      results = [...results].sort((a, b) => b.rating - a.rating);
    }

    return results;
  }, [
    selectedTypes,
    selectedBedrooms,
    selectedAmenities,
    maxPrice,
    sortBy,
    guests,
    checkIn,
    checkOut,
    minRating,
  ]);

  return (
    <main
      className={`${plusJakartaSans.className} w-full min-h-screen flex bg-[#f8f8f8]`}
    >
      <section className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-6 pt-20 lg:pt-6 overflow-y-auto">
        {/* Top bar */}

        <StaySearch actionLabel="Modify search" />

        {/* Results header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <p className="text-sm font-medium text-slate-900">
            {filteredListings.length} stays found in Lekki, Lagos
          </p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-slate-700 outline-none"
            >
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Top Rated</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters */}
          {/* <aside className="w-full lg:w-64 shrink-0 bg-white border border-gray-200 rounded-xl p-4 h-fit">
            <button className="text-xs font-medium text-emerald-700 border border-emerald-200 rounded-full px-3 py-1.5 mb-5">
              + More Filters
            </button>

            <div className="mb-6">
              <p className="text-sm font-semibold text-slate-900 mb-3">
                Popular Filters
              </p>
              <div className="flex flex-col gap-2">
                {PROPERTY_TYPES.map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() =>
                        toggleFromList(selectedTypes, type, setSelectedTypes)
                      }
                      className="accent-emerald-700"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm font-semibold text-slate-900 mb-3">
                Price Range (Night)
              </p>
              <input
                type="range"
                min={MIN_PRICE}
                max={MAX_PRICE}
                step={5000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-emerald-700"
              />
              <p className="text-xs text-gray-500 mt-2">
                Budget range ({formatNaira(MIN_PRICE)} - {formatNaira(maxPrice)}
                )
              </p>
            </div>

            <div className="mb-6">
              <p className="text-sm font-semibold text-slate-900 mb-3">
                Bedrooms
              </p>
              <div className="flex flex-col gap-2">
                {BEDROOM_OPTIONS.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedBedrooms.includes(option.value)}
                      onChange={() =>
                        toggleFromList(
                          selectedBedrooms,
                          option.value,
                          setSelectedBedrooms,
                        )
                      }
                      className="accent-emerald-700"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900 mb-3">
                Amenities
              </p>
              <div className="flex flex-col gap-2">
                {AMENITIES.map((amenity) => (
                  <label
                    key={amenity}
                    className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedAmenities.includes(amenity)}
                      onChange={() =>
                        toggleFromList(
                          selectedAmenities,
                          amenity,
                          setSelectedAmenities,
                        )
                      }
                      className="accent-emerald-700"
                    />
                    {amenity}
                  </label>
                ))}
              </div>
            </div>
          </aside> */}

          {/* Listings */}
          <div className="flex-1 flex flex-col gap-4">
            {filteredListings.length === 0 && (
              <div className="flex min-h-135 flex-col items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-12 text-center">
                <img
                  src="/image/empty_listinga.png"
                  alt=""
                  className="mb-5 object-contain"
                />
                <h2 className="text-lg font-bold text-slate-900">No Stay found</h2>
                <p className="mt-2 max-w-xl text-sm text-slate-900">
                  No stay match your search. Please adjust your filters or search criteria and try again.
                </p>
                <button
                  type="button"
                  onClick={() => router.push(pathname)}
                  className="mt-3 h-11 w-40 rounded-lg bg-[#005442] text-sm text-white transition-colors hover:bg-[#003f32]"
                >
                  Reset filters
                </button>
              </div>
            )}

            {filteredListings.map((listing) => (
              <Link
                key={listing.id}
                href={`/dashboard/listings/${listing.id}`}
                className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row gap-4 hover:shadow-md transition"
              >
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full sm:w-48 h-40 sm:h-32 object-cover rounded-lg shrink-0"
                />

                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-col justify-between h-full py-2">
                    <div className="flex items-start justify-between sm:justify-start gap-3">
                      <h3 className="text-sm font-semibold text-slate-900">
                        {listing.title}
                      </h3>
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          toggleFavorite(listing.id);
                        }}
                        aria-label="Toggle favorite"
                        className="sm:hidden text-lg"
                      >
                        {favorites.has(listing.id) ? "♥" : "♡"}
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">
                      {listing.location}
                    </p>
                    <p className="text-xs text-gray-500 mb-2">
                      {listing.beds} Beds &middot; {listing.baths} Bath &middot;{" "}
                      {listing.sqm} sqm
                    </p>
                    <p className="text-sm font-semibold text-slate-900">
                      {formatNaira(listing.price)}
                      <span className="text-gray-400 font-normal"> /night</span>
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-between gap-2 h-full py-3">
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        toggleFavorite(listing.id);
                      }}
                      aria-label="Toggle favorite"
                      className="hidden sm:block text-lg"
                    >
                      {favorites.has(listing.id) ? "♥" : "♡"}
                    </button>
                    <span className="text-xs font-medium text-slate-700">
                      ★ {listing.rating.toFixed(1)} ({listing.reviews})
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ListingsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8f8f8]" />}>
      <ListingsContent />
    </Suspense>
  );
}
