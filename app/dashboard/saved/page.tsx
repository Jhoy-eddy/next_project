"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LISTINGS } from "../../data/listings";
import {
  getSavedListingIds,
  SAVED_LISTINGS_EVENT,
  toggleSavedListing,
} from "../data/saved-listings";

function formatNaira(value: number) {
  return `₦${value.toLocaleString("en-NG")}`;
}

export default function SavedPage() {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    const syncSavedListings = () => setSavedIds(getSavedListingIds());
    syncSavedListings();
    window.addEventListener(SAVED_LISTINGS_EVENT, syncSavedListings);
    window.addEventListener("storage", syncSavedListings);
    return () => {
      window.removeEventListener(SAVED_LISTINGS_EVENT, syncSavedListings);
      window.removeEventListener("storage", syncSavedListings);
    };
  }, []);

  const savedListings = savedIds
    .map((id) => LISTINGS.find((listing) => listing.id === id))
    .filter((listing) => listing !== undefined);

  return (
    <main className="min-h-screen bg-[#f8f8f8] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Saved stays</h1>
          <p className="mt-1 text-sm text-gray-500">{savedListings.length} saved properties</p>
        </div>
        <Link href="/dashboard/listings" className="text-sm font-medium text-emerald-700 hover:text-emerald-900">
          Browse stays
        </Link>
      </div>

      {savedListings.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
          <p className="text-sm text-gray-500">You have not saved any stays yet.</p>
          <Link href="/dashboard/listings" className="mt-4 inline-block text-sm font-medium text-emerald-700">
            Find a stay
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {savedListings.map((listing) => (
            <article key={listing.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <Link href={`/dashboard/listings/${listing.id}`}>
                <img src={listing.image} alt={listing.title} className="h-48 w-full object-cover" />
                <div className="p-4">
                  <h2 className="text-sm font-semibold text-slate-900">{listing.title}</h2>
                  <p className="mt-1 text-xs text-gray-500">{listing.location}</p>
                  <p className="mt-3 text-sm font-semibold text-emerald-900">
                    {formatNaira(listing.price)} <span className="font-normal text-gray-400">/night</span>
                  </p>
                </div>
              </Link>
              <div className="border-t border-gray-100 px-4 py-3">
                <button
                  type="button"
                  onClick={() => setSavedIds(toggleSavedListing(listing.id))}
                  className="text-sm font-medium text-gray-600 hover:text-red-600"
                >
                  Remove saved stay
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
