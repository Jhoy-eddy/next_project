"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
const navigation = [
  { href: "/dashboard", label: "Home", icon: "/image/Homeframe_icon.png" },
  {
    href: "/dashboard/listings",
    label: "Browse Stay",
    icon: "/image/Browseproperty_icon.png",
  },
  {
    href: "/dashboard/saved",
    label: "Saved Stay",
    icon: "/image/Savedhomes_icon.png",
  },
  {
    href: "/dashboard/booking",
    label: "Bookings",
    icon: "/image/Application_icon.png",
  },
  // {
  //   href: "/dashboard/favourites",
  //   label: "Favourites",
  //   icon: "/image/Favourite_icon.png",
  // },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <main
      className={`${plusJakartaSans.className} flex min-h-screen w-full bg-[#F8f8f8]`}
    >
      {!sidebarOpen && (
        <div className="fixed inset-x-0 top-0 z-30 flex items-center justify-between border-b border-gray-100 bg-white px-4 py-3 lg:hidden">
          <img src="/image/Logo.png" alt="Nyangu" className="w-24" />
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-gray-100"
          >
            <img src="/image/hamburger.png" alt="" className="h-5 w-5" />
          </button>
        </div>
      )}
      {sidebarOpen && (
        <button
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 -translate-x-full flex-col justify-between border-r border-gray-100 bg-white px-5 py-6 transition-transform duration-200 lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : ""}`}
      >
        <div>
          <img src="/image/Logo.png" alt="Nyangu" className="w-32" />
          <p className="mb-8 ml-12 text-sm text-gray-400">Stay in style</p>
          <nav className="flex flex-col gap-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${pathname === item.href ? "bg-[#D9FCE8] text-[#005240]" : "text-gray-600"}`}
              >
                <img
                  src={item.icon}
                  alt=""
                  className="h-5 w-5 shrink-0 object-contain"
                />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <button
          onClick={() => router.push("/login")}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-600 hover:bg-emerald-100"
        >
          <img src="/image/logout_icon.png" alt="" className="h-5 w-5" />
          Log out
        </button>
      </aside>
      <section className="min-w-0 flex-1 overflow-y-auto bg-white px-4 pb-6 pt-20 sm:px-6 lg:px-8 lg:pt-6">
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center rounded-xl border border-gray-200 bg-white px-4 py-3 sm:max-w-xl">
            <img
              src="/image/Search_icon.png"
              alt=""
              className="mr-3 h-5 w-5 shrink-0 opacity-60"
            />
            <input
              type="search"
              placeholder="Search properties, locations..."
              aria-label="Search properties"
              className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
          </div>
          <div className="flex items-center justify-between gap-4 sm:ml-6 sm:justify-end">
            <button
              aria-label="Notifications"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100"
            >
              <img
                src="/image/Notification_button.png"
                alt=""
                className="h-10 w-10"
              />
            </button>
            <div className="relative">
              <Link href="/dashboard/profile" className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-200 text-sm font-semibold text-emerald-800">
                  JE
                </span>
                <span className="hidden text-left text-sm leading-tight sm:block">
                  <span className="block text-gray-400">Welcome back</span>
                  <span className="font-semibold text-slate-900">
                    Joy Edward
                  </span>
                </span>
                <img
                  src="/image/Expand_button.png"
                  alt=""
                  className="ml-1 block h-9 w-9 opacity-50 lg:hidden"
                />
              </Link>
            </div>
          </div>
        </header>
        {children}
      </section>
    </main>
  );
}
