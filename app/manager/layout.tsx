"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart2,
  Bell,
  Calendar,
  ClipboardList,
  Home,
  Menu,
  Star,
  X,
} from "lucide-react";
import { useState } from "react";

const navigation = [
  { href: "/manager", label: "Overview", icon: Home },
  { href: "/manager/listings", label: "Listings", icon: ClipboardList },
  { href: "/manager/calendar", label: "Calendar", icon: Calendar },
  { href: "/manager/analytics", label: "Analytics", icon: BarChart2 },
  { href: "/manager/reviews", label: "Reviews", icon: Star },
];

function getPageTitle(pathname: string) {
  if (pathname === "/manager") return "Overview";
  if (pathname === "/manager/listings") return "Your Listings";
  if (pathname === "/listing/new" || pathname === "/manager/listings/new") return "Add New Listing";

  const segment = pathname.split("/").filter(Boolean).at(-1) ?? "manager";
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function ManagerLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const title = getPageTitle(pathname);

  return (
    <div className="flex min-h-screen bg-[#F4F5F3] text-[#16241C]">
      {menuOpen && (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 -translate-x-full flex-col bg-[#0F3D2E] px-5 py-6 text-white transition-transform md:static md:translate-x-0 ${
          menuOpen ? "translate-x-0" : ""
        }`}
      >
        <div className="mb-10 flex items-center justify-between px-1">
          <img src="/image/logo_white.png" alt="Nyangu" className="h-8 w-auto" />
          <button
            aria-label="Close navigation"
            className="rounded-lg p-1 hover:bg-white/10 md:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
        <nav className="flex flex-col gap-1">
          {navigation.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center w-full gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                  active
                    ? "bg-white font-medium text-[#0F3D2E]"
                    : "text-emerald-100/80 hover:bg-white/10"
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto border-t border-white/10 pt-4">
          <p className="text-sm font-medium">Favour Daniel</p>
          <p className="text-xs text-emerald-200/70">VI Beach Resort</p>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[#E1E4E0] bg-[#F4F5F3]/95 px-4 backdrop-blur sm:px-8">
          <div className="flex items-center gap-3">
            <button
              aria-label="Open navigation"
              className="rounded-lg p-2 hover:bg-white md:hidden"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={21} />
            </button>
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          </div>
          <button
            aria-label="Notifications"
            className="relative rounded-full border border-[#E1E4E0] bg-white p-2.5 shadow-sm"
          >
            <Bell size={18} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500" />
          </button>
        </header>
        <main className="px-4 py-6 sm:px-8 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
