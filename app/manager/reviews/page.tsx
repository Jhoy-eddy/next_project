"use client";

import { ChevronLeft, Filter, MoreVertical, Star, X } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

type ReviewStatus = "unread" | "replied" | "flagged";
type ReviewTab = "all" | ReviewStatus;

type Review = {
  id: number;
  guest: string;
  stay: string;
  rating: number;
  comment: string;
  time: string;
  image: string;
  status: ReviewStatus;
};

const reviews: Review[] = [
  {
    id: 1,
    guest: "Esther Nalubega",
    stay: "April 26 - April 29, 2026",
    rating: 4.7,
    comment: "The staff made me feel so welcome, every smile felt genuine and heartfelt.",
    time: "2h ago",
    image: "/image/Property_Image2.png",
    status: "unread",
  },
  {
    id: 2,
    guest: "Adebayo Adeyemi",
    stay: "April 26 - April 29, 2026",
    rating: 2.6,
    comment: "The staff were friendly and helpful, but the room needed better maintenance.",
    time: "8d ago",
    image: "/image/Property_Image2.png",
    status: "flagged",
  },
  {
    id: 3,
    guest: "Ngozi Nwosu",
    stay: "April 21 - April 24, 2026",
    rating: 2.2,
    comment: "The photos looked much better than the actual hotel. The facilities felt neglected.",
    time: "12d ago",
    image: "/image/Property_Image2.png",
    status: "replied",
  },
  {
    id: 4,
    guest: "Hauwa Alabi",
    stay: "April 18 - April 21, 2026",
    rating: 4.1,
    comment: "The beds were comfortable and check-in was easy. I would happily stay again.",
    time: "15d ago",
    image: "/image/Property_Image2.png",
    status: "replied",
  },
];

const tabs: { key: ReviewTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "unread", label: "Unread" },
  { key: "replied", label: "Replied" },
 
];

function ReviewStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5 text-[#004B3D]" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} size={14} fill={star <= Math.round(rating) ? "currentColor" : "none"} strokeWidth={1.5} />
      ))}
      <span className="ml-1 text-[11px] text-[#16241C]">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function ReviewsPage() {
  const [activeTab, setActiveTab] = useState<ReviewTab>("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [minimumRating, setMinimumRating] = useState(0);
  const [responding, setResponding] = useState<Review | null>(null);
  const [response, setResponse] = useState("");
  const [sentFor, setSentFor] = useState<number[]>([]);

  const visibleReviews = useMemo(
    () => reviews.filter((review) => {
      const matchesTab = activeTab === "all" || review.status === activeTab;
      return matchesTab && review.rating >= minimumRating;
    }),
    [activeTab, minimumRating],
  );

  const openResponse = (review: Review) => {
    setResponding(review);
    setResponse("");
  };

  const sendResponse = () => {
    if (!responding || !response.trim()) return;
    setSentFor((current) => [...current, responding.id]);
    setResponding(null);
  };

  return (
    <div className="mx-auto max-w-[1180px]">
      <div className="mb-2 flex items-center justify-between">
        <Link href="/manager" className="flex items-center gap-2 text-sm text-[#16241C] hover:text-[#0F3D2E]">
          <ChevronLeft size={17} /> Back to overview
        </Link>
        <button type="button" onClick={() => setFilterOpen(true)} className="flex items-center gap-2 rounded-lg bg-[#004B3D] px-5 py-2.5 text-xs text-white hover:bg-[#00382D]">
          {minimumRating ? `Filtered by ${minimumRating}+ stars` : "Filter by"} <Filter size={15} />
        </button>
      </div>

      <p className="mb-2 text-xs text-[#16241C]">Learn more about your property with reviews</p>
      <div className="mb-5 flex max-w-[430px] overflow-x-auto border-b border-[#D1D8D3]">
        {tabs.map((tab) => {
          const count = tab.key === "all" ? reviews.length : reviews.filter((review) => review.status === tab.key).length;
          return (
            <button key={tab.key} type="button" onClick={() => setActiveTab(tab.key)} className={`whitespace-nowrap border-b-2 px-4 py-2 text-[11px] transition-colors ${activeTab === tab.key ? "border-[#004B3D] font-medium text-[#004B3D]" : "border-transparent text-[#16241C] hover:text-[#004B3D]"}`}>
              {tab.label} ({count})
            </button>
          );
        })}
      </div>

      <section className="grid max-w-[700px] grid-cols-1 gap-3 md:grid-cols-2">
        {visibleReviews.map((review) => (
          <article key={review.id} className="rounded-xl border border-[#D9DEDA] bg-white p-3 shadow-[0_1px_3px_rgba(22,36,28,0.03)]">
            <div className="mb-4 flex items-center justify-between text-[11px] text-[#16241C]">
              <span>{review.status === "unread" ? "New review" : `${review.rating.toFixed(0)}-star review`}</span>
              <span>{review.time}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2">
                <span className="h-10 w-10 shrink-0 rounded-full bg-[#004B3D]" />
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium">{review.guest}</p>
                  <p className="text-[10px]">Stayed {review.stay}</p>
                </div>
              </div>
              <img src={review.image} alt="Property" className="h-[60px] w-[78px] rounded-md object-cover" />
            </div>
            <div className="mt-3"><ReviewStars rating={review.rating} /></div>
            <p className="mt-2 min-h-10 text-[10px] leading-[1.4] text-[#16241C]">{review.comment}</p>
            <button type="button" onClick={() => openResponse(review)} className="mt-4 w-full rounded-lg bg-[#004B3D] py-2.5 text-[11px] text-white hover:bg-[#00382D]">
              {sentFor.includes(review.id) || review.status === "replied" ? "View & response" : "View & respond"}
            </button>
          </article>
        ))}
        {visibleReviews.length === 0 && <p className="rounded-xl border border-[#D9DEDA] bg-white p-8 text-center text-xs text-[#647168] md:col-span-2">No reviews match these filters.</p>}
      </section>

      {filterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4" onMouseDown={() => setFilterOpen(false)}>
          <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-xl" onMouseDown={(event) => event.stopPropagation()}>
            <div className="mb-5 flex items-center justify-between"><h2 className="text-sm font-semibold">Filter reviews</h2><button type="button" aria-label="Close filters" onClick={() => setFilterOpen(false)}><X size={18} /></button></div>
            <p className="mb-2 text-xs font-medium">Minimum star rating</p>
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2, 3, 4, 5].map((rating) => <button key={rating} type="button" onClick={() => setMinimumRating(rating)} className={`rounded-lg border px-3 py-2 text-xs ${minimumRating === rating ? "border-[#004B3D] bg-[#004B3D] text-white" : "border-[#D9DEDA]"}`}>{rating ? `${rating}+ stars` : "All ratings"}</button>)}
            </div>
            <button type="button" onClick={() => setFilterOpen(false)} className="mt-5 w-full rounded-lg bg-[#004B3D] py-3 text-xs text-white">Apply filter</button>
          </div>
        </div>
      )}

      {responding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4" onMouseDown={() => setResponding(null)}>
          <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-xl" onMouseDown={(event) => event.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between"><div><h2 className="text-sm font-semibold">Respond to review</h2><p className="mt-1 text-xs text-gray-500">{responding.guest}</p></div><button type="button" aria-label="Close response dialog" onClick={() => setResponding(null)}><MoreVertical size={18} /></button></div>
            <textarea value={response} onChange={(event) => setResponse(event.target.value)} placeholder="Write your response..." className="h-24 w-full resize-none rounded-lg border border-[#D9DEDA] p-3 text-xs outline-none focus:border-[#004B3D]" />
            <button type="button" disabled={!response.trim()} onClick={sendResponse} className="mt-3 w-full rounded-lg bg-[#004B3D] py-3 text-xs text-white disabled:cursor-not-allowed disabled:opacity-40">Send response</button>
          </div>
        </div>
      )}
    </div>
  );
}
