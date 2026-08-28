"use client";

import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";
import { LISTINGS } from "../../../../data/listings";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function PaymentPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const listing = LISTINGS.find((item) => item.id === params.slug);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "bank" | "ussd" | "wallet"
  >("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-lg font-semibold text-slate-900 mb-6">
            Complete your booking
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-sm font-semibold text-slate-900 mb-3">
                Select Payment Method
              </h2>
              <div className="flex flex-col gap-2">
                {[
                  { id: "card", label: "Card", desc: "Visa, Mastercard, Verve" },
                  { id: "bank", label: "Bank Transfer", desc: "Make a transfer from your bank" },
                  { id: "ussd", label: "USSD", desc: "Pay securely with USSD" },
                  { id: "wallet", label: "Wallet", desc: "Pay with wallet account" },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id as typeof paymentMethod)}
                    className={`flex items-center justify-between border rounded-lg px-4 py-3 text-left transition bg-white ${
                      paymentMethod === method.id
                        ? "border-emerald-700"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-900">{method.label}</p>
                      <p className="text-xs text-gray-400">{method.desc}</p>
                    </div>
                    {paymentMethod === method.id && (
                      <span className="w-5 h-5 rounded-full bg-emerald-700 flex items-center justify-center text-white text-xs">
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <button
                onClick={() => router.back()}
                className="mt-4 border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-50 transition"
              >
                Back
              </button>
            </div>

            <div>
              {paymentMethod === "card" && (
                <>
                  <h2 className="text-sm font-semibold text-slate-900 mb-3">Card Details</h2>
                  <div className="flex flex-col gap-3 mb-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Card Holder Name</label>
                      <input
                        type="text"
                        placeholder="Full name on card"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mb-6">
                    🔒 Your payment is secure and encrypted
                  </p>
                </>
              )}

              <button
                onClick={() => {
                  const query = new URLSearchParams({
                    checkIn,
                    checkOut,
                    guests,
                    method: paymentMethod,
                    cardLast4: cardNumber.replace(/\s/g, "").slice(-4) || "4348",
                  }).toString();
                  router.push(`/dashboard/listings/${listing.id}/payment/review?${query}`);
                }}
                className="w-full bg-emerald-800 text-white text-sm font-medium py-3 rounded-lg hover:bg-emerald-900 transition"
              >
                Authorize Payment Method
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}