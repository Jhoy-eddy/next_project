"use client";

import Link from "next/link";
import { Suspense } from "react";
import StaySearch from "./components/stay-search";

export default function Dashboard() {
  return (
    <>
        <Suspense fallback={<div className="mb-8 h-20" />}>
          <StaySearch />
        </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 bg-[#F8F7F3] rounded-2xl p-6 sm:p-8 mb-10 items-center">
        <div>
          <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-2">
            Find your perfect stay
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight mb-3">
            Comfortable stays, unforgettable experiences
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Book hotels where convienence meets comfort
          </p>
          <button className="bg-emerald-800 text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-emerald-900 transition">
            Explore Stays
          </button>
        </div>

        <div className="rounded-xl overflow-hidden">
          <img
            src="/image/Apartment_image.png"
            alt="Comfortable living room"
            className="w-full h-56 sm:h-64 object-cover rounded-xl"
          />
        </div>
      </div>

      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-slate-900">
            Browse by category
          </h2>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          <button className="bg-white border border-gray-200 rounded-xl px-3 py-5 flex flex-col items-center justify-center gap-3 hover:bg-gray-50 transition">
            <img
              src="/image/luxuryhotel_icon.png"
              alt="luxury hotel icon"
              className="w-7 h-7 object-contain"
            />
            <span className="text-xs text-gray-600 text-center">
              Luxury Hotels
            </span>
          </button>

          <button className="bg-white border border-gray-200 rounded-xl px-3 py-5 flex flex-col items-center justify-center gap-3 hover:bg-gray-50 transition">
            <img
              src="/image/Beachresort_icon.png"
              alt="Beach resort icon"
              className="w-7 h-7 object-contain"
            />
            <span className="text-xs text-gray-600 text-center">
              Beach Resorts
            </span>
          </button>

          <button className="bg-white border border-gray-200 rounded-xl px-3 py-5 flex flex-col items-center justify-center gap-3 hover:bg-gray-50 transition">
            <img
              src="/image/cityhotel_icon.png"
              alt="City Hotels"
              className="w-7 h-7 object-contain"
            />
            <span className="text-xs text-gray-600 text-center">
              City Hotels
            </span>
          </button>

          <button className="bg-white border border-gray-200 rounded-xl px-3 py-5 flex flex-col items-center justify-center gap-3 hover:bg-gray-50 transition">
            <img
              src="/image/StudioApartment_icon.png"
              alt="Studio Apartment"
              className="w-7 h-7 object-contain"
            />
            <span className="text-xs text-gray-600 text-center">
              Studio Apartment
            </span>
          </button>

          <button className="bg-white border border-gray-200 rounded-xl px-3 py-5 flex flex-col items-center justify-center gap-3 hover:bg-gray-50 transition">
            <img
              src="/image/Spa_icon.png"
              alt="Spa & Wellness"
              className="w-7 h-7 object-contain"
            />
            <span className="text-xs text-gray-600 text-center">
              Spa & Wellness
            </span>
          </button>

          <button className="bg-white border border-gray-200 rounded-xl px-3 py-5 flex flex-col items-center justify-center gap-3 hover:bg-gray-50 transition">
            <img
              src="/image/Budgetstays_icon.png"
              alt="Budget Stays"
              className="w-7 h-7 object-contain"
            />
            <span className="text-xs text-gray-600 text-center">
              Budget Stays
            </span>
          </button>

          <button className="bg-white border border-gray-200 rounded-xl px-3 py-5 flex flex-col items-center justify-center gap-3 hover:bg-gray-50 transition">
            <img
              src="/image/viewsuite_icon.png"
              alt="Villas & Suites"
              className="w-7 h-7 object-contain"
            />
            <span className="text-xs text-gray-600 text-center">
              Villas & suites
            </span>
          </button>
        </div>
      </div>

      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-slate-900">
            Popular stays in Lagos
          </h2>
          <Link
            href="/dashboard/listings"
            className="text-xs font-medium text-emerald-700 hover:text-emerald-900 transition"
          >
            View all
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="bg-white border border-gray-200 rounded-xl overflow-hidden text-left hover:shadow-md transition group">
            <div className="w-full h-36 sm:h-40 bg-gray-100 overflow-hidden">
              <img
                src="/image/BDL_icon.png"
                alt="2-Bedroom Apartment in Lekki"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>
            <div className="p-3">
              <p className="text-sm font-medium text-slate-900 leading-snug mb-1">
                2-Bedroom Apartment in Lekki
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <img
                    src="/image/Star_icon.png"
                    alt="rating"
                    className="w-3.5 h-3.5"
                  />
                  <span className="text-xs font-medium text-slate-700">
                    4.8
                  </span>
                  <span className="text-xs text-gray-400">(150)</span>
                </div>
                <span className="text-xs font-semibold text-slate-900">
                  ₦85,000
                  <span className="text-gray-400 font-normal">/night</span>
                </span>
              </div>
            </div>
          </button>

          <button className="bg-white border border-gray-200 rounded-xl overflow-hidden text-left hover:shadow-md transition group">
            <div className="w-full h-36 sm:h-40 bg-gray-100 overflow-hidden">
              <img
                src="/image/BRV_icon.png"
                alt="Beach Resort in Victoria Island"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>
            <div className="p-3">
              <p className="text-sm font-medium text-slate-900 leading-snug mb-1">
                Beach Resort in Victoria Island
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <img
                    src="/image/Star_icon.png"
                    alt="rating"
                    className="w-3.5 h-3.5"
                  />
                  <span className="text-xs font-medium text-slate-700">
                    4.0
                  </span>
                  <span className="text-xs text-gray-400">(180)</span>
                </div>
                <span className="text-xs font-semibold text-slate-900">
                  ₦120,000
                  <span className="text-gray-400 font-normal">/night</span>
                </span>
              </div>
            </div>
          </button>

          <button className="bg-white border border-gray-200 rounded-xl overflow-hidden text-left hover:shadow-md transition group">
            <div className="w-full h-36 sm:h-40 bg-gray-100 overflow-hidden">
              <img
                src="/image/BDIL_icon.png"
                alt="Luxury 3-Bedroom Duplex in Lekki"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>
            <div className="p-3">
              <p className="text-sm font-medium text-slate-900 leading-snug mb-1">
                Luxury 3-Bedroom Duplex in Lekki
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <img
                    src="/image/Star_icon.png"
                    alt="rating"
                    className="w-3.5 h-3.5"
                  />
                  <span className="text-xs font-medium text-slate-700">
                    4.9
                  </span>
                  <span className="text-xs text-gray-400">(200)</span>
                </div>
                <span className="text-xs font-semibold text-slate-900">
                  ₦210,000
                  <span className="text-gray-400 font-normal">/night</span>
                </span>
              </div>
            </div>
          </button>

          <button className="bg-white border border-gray-200 rounded-xl overflow-hidden text-left hover:shadow-md transition group">
            <div className="w-full h-36 sm:h-40 bg-gray-100 overflow-hidden">
              <img
                src="/image/MSA_icon.png"
                alt="Modern Studio Apartment"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>
            <div className="p-3">
              <p className="text-sm font-medium text-slate-900 leading-snug mb-1">
                Modern Studio Apartment
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <img
                    src="/image/Star_icon.png"
                    alt="rating"
                    className="w-3.5 h-3.5"
                  />
                  <span className="text-xs font-medium text-slate-700">
                    4.5
                  </span>
                  <span className="text-xs text-gray-400">(88)</span>
                </div>
                <span className="text-xs font-semibold text-slate-900">
                  ₦65,000
                  <span className="text-gray-400 font-normal">/night</span>
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
