"use client";

import Link from "next/link";
import { ChevronLeft, MoreVertical, Plus, Star } from "lucide-react";
import { useState } from "react";

type ListingStatus = "Published" | "Unpublished" | "Under Review" | "Draft";

const listings: Array<{
  name: string;
  location: string;
  rooms: number;
  rating: string;
  reviews: number;
  image: string;
  status: ListingStatus;
}> = [
  {
    name: "Luxury Beach Resort",
    location: "Victoria Island, Lagos",
    rooms: 12,
    rating: "4.8",
    reviews: 120,
    image: "/image/LBR.png",
    status: "Published",
  },
  {
    name: "Atlantic Horizon villas",
    location: "Eko Atlantic City, Lagos",
    rooms: 6,
    rating: "4.8",
    reviews: 220,
    image: "/image/AHV.png",
    status: "Published",
  },
  {
    name: "Emerald Coast Retreat",
    location: "Victoria Island, Lagos",
    rooms: 15,
    rating: "4.9",
    reviews: 135,
    image: "/image/ECR.png",
    status: "Published",
  },
  {
    name: "Palm Grove Residence",
    location: "Banana Island, Lagos",
    rooms: 3,
    rating: "4.6",
    reviews: 122,
    image: "/image/shortlet_image1.png",
    status: "Unpublished",
  },
  {
    name: "The Marina House",
    location: "Victoria Island, Lagos",
    rooms: 5,
    rating: "4.5",
    reviews: 81,
    image: "/image/TMR.png",
    status: "Unpublished",
  },
  {
    name: "Boutique Lagoon Retreat",
    location: "Lekki Phase 1, Lagos",
    rooms: 13,
    rating: "4.4",
    reviews: 110,
    image: "/image/BLRR.png",
    status: "Under Review",
  },
  {
    name: "The Garden Court",
    location: "Ikoyi, Lagos",
    rooms: 8,
    rating: "4.7",
    reviews: 96,
    image: "/image/TGC.png",
    status: "Draft",
  },
];

const filters: Array<"All" | ListingStatus> = [
  "All",
  "Published",
  "Unpublished",
  "Under Review",
  "Draft",
];

export default function ManagerListingsPage() {
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>("All");
  const visibleListings = listings.filter(
    (listing) => activeFilter === "All" || listing.status === activeFilter,
  );

  return (
    <section className="">
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/manager"
          className="inline-flex items-center gap-2 text-sm font-medium hover:text-[#0F3D2E]"
        >
          <ChevronLeft size={18} />
          Back to overview
        </Link>
        <Link
          href="/manager/listings/new"
          className="inline-flex items-center gap-2 rounded-lg bg-[#004B3A] px-4 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#003d30]"
        >
          <Plus size={18} />
          Add New Listing
        </Link>
      </div>

      <p className="mb-2 text-sm text-[#343a37]">
        Manage all your properties in one place
      </p>
      <div className="mb-4 flex overflow-x-auto border-b border-[#CFD4D1]">
        {filters.map((filter) => {
          const count =
            filter === "All"
              ? listings.length
              : listings.filter((listing) => listing.status === filter).length;
          const active = activeFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 border-b-2 px-4 py-2 text-xs font-medium transition-colors ${
                active
                  ? "border-[#005442] text-[#004B3A]"
                  : "border-transparent text-[#1E2622] hover:text-[#004B3A]"
              }`}
            >
              {filter} ({count})
            </button>
          );
        })}
      </div>

      <div className="divide-y divide-transparent">
        {visibleListings.map((listing) => (
          <article
            key={listing.name}
            className="flex items-center gap-3 py-3 sm:gap-5 sm:py-5"
          >
            <img
              src={listing.image}
              alt=""
              className="h-[92px] w-[123px] shrink-0 rounded-xl object-cover sm:h-[114px] sm:w-[123px]"
            />
            <div className="min-w-0 flex-1 self-stretch py-0.5">
              <h2 className="truncate text-sm font-semibold">{listing.name}</h2>
              <p className="mt-1 truncate text-xs text-[#343a37]">
                {listing.location}
              </p>
              <div className="mt-2 flex items-center gap-2 text-xs text-[#1E2622]">
                <span>{listing.rooms} Rooms</span>
                <span className="inline-flex items-center gap-1">
                  <Star
                    size={14}
                    fill="currentColor"
                    className="text-[#005442]"
                  />
                  {listing.rating} ({listing.reviews})
                </span>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-3 sm:gap-6">
              <button className="hidden h-10 w-[115px] rounded-xl border border-[#D6DBD8] text-xs font-medium hover:bg-white sm:block">
                View
              </button>
              <button
                aria-label={`More options for ${listing.name}`}
                className="rounded-lg p-2 text-[#005442] hover:bg-white"
              >
                <MoreVertical size={21} strokeWidth={3} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
