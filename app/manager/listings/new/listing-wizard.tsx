"use client";

import Link from "next/link";
import {
  AirVent,
  Bath,
  BellRing,
  Baby,
  Bike,
  BookOpen,
  CarFront,
  ChevronDown,
  ChevronLeft,
  Clapperboard,
  Coffee,
  ConciergeBell,
  CookingPot,
  Building2,
  ChefHat,
  CircleDot,
  Dumbbell,
  Flower2,
  Gamepad2,
  Laptop,
  Luggage,
  Martini,
  Microwave,
  PawPrint,
  Plus,
  Refrigerator,
  Route,
  Search,
  ShieldCheck,
  Shirt,
  SprayCan,
  Speaker,
  Tv,
  TreePine,
  Trophy,
  Umbrella,
  Utensils,
  WashingMachine,
  Waves,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

const steps = [
  "Property Details",
  "Amenities",
  "Pricing",
  "Guest policies",
  "Review",
];
const amenities = [
  "Wi-Fi",
  "Air Conditioning",
  "Swimming Pool",
  "Smart TV",
  "Parking",
  "Fitness center",
  "24/7 Security",
  "Laundry service",
  "Room service",
];
const amenityIcons: Record<string, LucideIcon> = {
  "Wi-Fi": Wifi,
  "Air Conditioning": AirVent,
  "Swimming Pool": Waves,
  "Smart TV": Tv,
  Parking: CarFront,
  "Fitness center": Dumbbell,
  "24/7 Security": ShieldCheck,
  "Laundry service": WashingMachine,
  "Room service": BellRing,
  "Work-space": Laptop,
  "Coffee/tea maker": Coffee,
  Towels: Waves,
  Toiletries: Bath,
  "Mini fridge": Refrigerator,
  Refrigerator,
  Microwave,
  Oven: CookingPot,
  Dishwasher: Utensils,
  Kettle: Coffee,
  Kitchenware: Utensils,
  "Streaming service": Tv,
  "Board games": Gamepad2,
  Books: BookOpen,
  "Sound system": Speaker,
  "Game console": Gamepad2,
  Patio: Umbrella,
  Garden: Flower2,
  "Beach access": Waves,
  "Outdoor dining": Utensils,
  "BBQ grill": CookingPot,
  "Daily housekeeping": WashingMachine,
  "Airport shuttle": CarFront,
  "Luggage storage": Luggage,
  "Cultery & dishes": Utensils,
  "Oven & stove": CookingPot,
  "Dining area": ChefHat,
  "Fire extinguisher": ShieldCheck,
  "Cleaning supplies": SprayCan,
  "Cooking hub": CookingPot,
  "Basic pantry": Refrigerator,
  "Game rooms": Gamepad2,
  "Movie night": Clapperboard,
  "Night club": Martini,
  spa: Waves,
  "Tennis court": Trophy,
  "Basketball court": CircleDot,
  "Rooftop lounge": Building2,
  "Jogging trails": Route,
  "Picnic area": TreePine,
  "Bike rentals": Bike,
  "Concierge service": ConciergeBell,
  "24 hours security": ShieldCheck,
  "Dry cleaning": Shirt,
  "Valet parking": CarFront,
  Babysitting: Baby,
  "Pet service": PawPrint,
};
const amenityCategories = {
  Popular: amenities,
  Room: [
    "Work-space",
    "Coffee/tea maker",
    "Towels",
    "Smart TV",
    "Toiletries",
    "Mini fridge",
  ],
  Kitchen: ["Mini fridge", "Microwave","Cultery & dishes" ,"Oven & stove","Dining area", "Fire extinguisher", "Cleaning supplies", "Cooking hub", "Basic pantry"],
  Entertainment: ["Game rooms", "Movie night", "Night club", "spa", "Tennis court", "Basketball court"],
  Outdoors: ["Patio", "Rooftop lounge", "Jogging trails", "Picnic area", "Bike rentals", "Swimming Pool"],
  Services: ["Concierge service", "24 hours security","Room service", "Dry cleaning", "Valet parking", "Babysitting", "Pet service"],
};
type AmenityCategory = keyof typeof amenityCategories;
const categories = Object.keys(amenityCategories) as AmenityCategory[];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="mb-9 flex max-w-2xl justify-between gap-1">
      {steps.map((label, index) => {
        const number = index + 1;
        return (
          <div
            className="relative flex min-w-0 flex-1 flex-col items-center gap-2 text-center text-xs"
            key={label}
          >
            {index < steps.length - 1 && (
              <span className="absolute left-[56%] top-3 h-px w-[88%] bg-[#C7CDCA]" />
            )}
            <span
              className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full border text-xs ${number === current ? "border-[#005442] bg-[#005442] text-white" : "border-[#BFC6C3] bg-[#F4F5F3] text-[#3B4540]"}`}
            >
              {number}
            </span>
            <span
              className={
                number === current
                  ? "font-medium text-[#16241C]"
                  : "text-[#16241C]"
              }
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function Field({
  label,
  placeholder,
  value,
}: {
  label: string;
  placeholder?: string;
  value?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium">{label}</span>
      <input
        defaultValue={value}
        placeholder={placeholder}
        className="h-12 w-full rounded-lg border border-[#D4D9D7] bg-white px-4 text-xs outline-none focus:border-[#005442]"
      />
    </label>
  );
}

export default function ListingWizard() {
  const [step, setStep] = useState(1);
  const [propertyImages, setPropertyImages] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    "Work-space",
    "Coffee/tea maker",
    "Towels",
  ]);
  const [selectedCategory, setSelectedCategory] = useState<AmenityCategory>("Room");
  const [search, setSearch] = useState("");
  const matchingAmenities = amenityCategories[selectedCategory].filter((item) =>
    item.toLowerCase().includes(search.toLowerCase()),
  );
  const toggleAmenity = (amenity: string) =>
    setSelectedAmenities((current) =>
      current.includes(amenity)
        ? current.filter((item) => item !== amenity)
        : [...current, amenity],
    );
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setPropertyImages((current) => [...current, ...imageUrls]);
  };
  const next = () => setStep((current) => Math.min(5, current + 1));
  const back = () => setStep((current) => Math.max(1, current - 1));

  return (
    <section className="mx-auto">
      <Link
        href="/manager/listings"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium hover:text-[#005442]"
      >
        <ChevronLeft size={18} />
        Back to listings
      </Link>
      <StepIndicator current={step} />

      {step === 1 && (
        <div className="grid gap-6 lg:grid-cols-[1fr_1.05fr]">
          <div className="space-y-5">
            <Field label="Property Name" value="Victoria Island Beach Resort" />
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium">
                Property Type
              </span>
              <span className="relative block">
                <select
                  defaultValue=""
                  required
                  className="h-12 w-full appearance-none rounded-lg border border-[#D4D9D7] bg-white px-4 text-xs outline-none focus:border-[#005442]"
                >
                  <option value="" disabled>
                    Select property type
                  </option>
                  <option value="Resort">Resort</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villas">Villas</option>
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#8A9490]"
                />
              </span>
            </label>
            <Field label="Location" placeholder="Enter address or location" />
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium">
                Description
              </span>
              <textarea
                placeholder="Tell guests about the property..."
                maxLength={500}
                className="h-36 w-full resize-none rounded-lg border border-[#D4D9D7] bg-white p-4 text-xs outline-none focus:border-[#005442]"
              />
              <span className="-mt-8 mr-3 block text-right text-[10px] text-[#4D5752]">
                0/500
              </span>
            </label>
          </div>
          <div className="rounded-2xl border border-[#E0E4E2] p-4 shadow-sm">
            <h2 className="mb-2 text-sm font-semibold">Property Preview</h2>
            {propertyImages.length === 0 ? (
              <label className="flex h-[300px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#BFC6C3] bg-[#F8FAF9] text-center">
                <span className="text-sm font-semibold text-[#16241C]">
                  Add property photos
                </span>
                <span className="mt-2 text-xs text-[#56615B]">
                  Upload images to preview your listing
                </span>
                <span className="mt-4 rounded-lg bg-[#005442] px-4 py-2 text-xs font-medium text-white">
                  Choose files
                </span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="sr-only"
                />
              </label>
            ) : (
              <>
                <img
                  src={propertyImages[0]}
                  alt="Uploaded property preview"
                  className="h-[300px] w-full rounded-lg object-cover"
                />
                <div className="mt-2 grid grid-cols-5 gap-2">
                  {propertyImages.slice(0, 5).map((imageUrl, index) => (
                    <div className="relative" key={imageUrl}>
                      <img
                        src={imageUrl}
                        alt={`Uploaded property photo ${index + 1}`}
                        className="h-14 w-full rounded-md object-cover"
                      />
                      {index === 4 && propertyImages.length > 5 && (
                        <span className="absolute inset-0 flex items-center justify-center rounded-md bg-black/50 text-sm font-semibold text-white">
                          +{propertyImages.length - 5}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <label className="mt-3 inline-flex cursor-pointer text-xs font-medium text-[#005442] hover:underline">
                  Add more photos
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="sr-only"
                  />
                </label>
              </>
            )}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <p className="mb-2 text-sm">
            Choose all amenities available at your property
          </p>
          <label className="mb-6 flex h-10 max-w-xl items-center gap-2 rounded-lg border border-[#D4D9D7] bg-white px-4">
            <Search size={18} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search amenities"
              className="w-full bg-transparent text-xs outline-none"
            />
          </label>
          <div className="grid gap-8 md:grid-cols-[140px_1fr]">
            <nav className="flex flex-col space-y-2 text-xs">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(category);
                    setSearch("");
                  }}
                  className={`block w-full rounded-lg px-3 py-2 text-left ${category === selectedCategory ? "bg-emerald-100 text-[#005442]" : "hover:bg-white"}`}
                >
                  {category}
                </button>
              ))}
            </nav>
            <div>
              <h2 className="mb-3 text-sm font-semibold">{selectedCategory} Amenities</h2>
              <div className="grid max-w-md grid-cols-2 gap-3 sm:grid-cols-3">
                {matchingAmenities.map((amenity) => (
                  <button
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    key={amenity}
                    className={`flex h-28 flex-col items-center justify-center gap-2 rounded-lg border text-xs font-medium ${selectedAmenities.includes(amenity) ? "border-[#005442] bg-emerald-50 text-[#005442]" : "border-[#E1E4E2] bg-white text-[#005442]"}`}
                  >
                    {(() => {
                      const Icon = amenityIcons[amenity] ?? BellRing;
                      return <Icon size={18} />;
                    })()}
                    {amenity}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="grid max-w-3xl gap-8 md:grid-cols-[205px_1fr]">
          <div className="space-y-5">
            <h2 className="text-sm font-semibold">Pricing Details</h2>
            <Field label="Base Nightly Rate" value="₦100,000" />
            <Field label="Cleaning Fee" value="₦5,000" />
            <Field label="Service Fee" value="10%" />
          </div>
          <div className="self-end rounded-xl bg-white px-3 py-4 shadow-sm">
            <h2 className="text-sm font-semibold">Seasonal Pricing</h2>
            <p className="mb-3 text-[10px] text-[#56615B]">
              Set different prices for off and peak seasons
            </p>
            <button className="mb-2 flex items-center gap-2 rounded-lg border border-[#E1E4E2] px-4 py-2 text-xs">
              <Plus size={20} /> <span className="font-semibold">Add Season</span>
            </button>
            <div className="rounded-lg bg-[#EEF0EF] p-3 text-[10px]">
              <div className="mb-4 flex justify-between font-semibold">
                <span>Season</span>
                <span>Nightly Rate</span>
              </div>
              {[
                ["Off season (April–July, rainy season)", "₦77,000"],
                ["Peak season (November–March, dry season)", "₦100,000"],
                [
                  "Holiday season (Christmas, New year, Easter, Eid)",
                  "₦125,000",
                ],
              ].map(([season, price]) => (
                <div
                  key={season}
                  className="mb-4 flex justify-between last:mb-0"
                >
                  <span>{season}</span>
                  <span className="font-semibold">{price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="grid max-w-4xl gap-5 md:grid-cols-[215px_1fr]">
          <div>
            <h2 className="mb-3 text-sm font-semibold">
              Event Permission Policy
            </h2>
            {[
              [
                "Event Authorization",
                "Guests must ask for approval before parties, meetings, or gatherings on hotel premises.",
              ],
              [
                "Venue Use",
                "Conference rooms, banquet halls, and lounges must be booked in advance.",
              ],
              [
                "Noise & Courtesy",
                "Approved events must respect quiet hours and avoid disturbing other guests.",
              ],
              [
                "Compliance",
                "All events must follow hotel safety regulations and local laws.",
              ],
            ].map(([title, text]) => (
              <div key={title} className="mb-4 text-[10px]">
                <strong className="block text-xs">{title}</strong>
                {text}
              </div>
            ))}
          </div>
          <div className="rounded-xl bg-white p-3 shadow-sm">
            <h2 className="mb-2 text-sm font-semibold">Guest Policies</h2>
            <div className="rounded-lg border border-[#D4D9D7] p-4 text-[10px] leading-relaxed">
              {[
                "Respect Quiet Hours",
                "Visitor Policy",
                "Power Usage",
                "Water Conservation",
                "No Parties",
                "Smoking Policy",
                "Pet Rules",
                "Check-in/Checkout",
                "Cleanliness Agreement",
              ].map((title) => (
                <p className="mb-2" key={title}>
                  <strong className="block text-sm">{title}</strong>Please
                  respect this policy to help us keep every guest&apos;s stay
                  comfortable and safe.
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 5 && (
        <div>
          <div className="mb-6 rounded-lg border border-[#F0D5BC] bg-[#FFF0E0] px-5 py-3 text-xs text-[#764719]">
            When you publish a property, it enters a 3-day review window. During
            this time, our team verifies the details to ensure everything meets
            hosting standards.
          </div>
          <div className="max-w-2xl rounded-xl bg-white p-3 shadow-sm">
            <h2 className="mb-2 text-sm font-semibold">Listing summary</h2>
            <div className="flex gap-2">
              <img
                src="/image/Property_Image2.png"
                alt="Listing preview"
                className="h-40 w-44 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="text-sm font-semibold">Luxury Beach Resort</h3>
                <p className="mt-2 text-xs">Standard Rooms · 2 Guests</p>
                <p className="mt-2 text-xs text-[#56615B]">
                  Victoria Island, Lagos
                </p>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {[
                    ["Nightly Rate", "₦100,000"],
                    ["Cleaning Fee", "₦5,000"],
                    ["Service Fee", "10%"],
                    ["Guest Policy", "Included"],
                  ].map(([label, value]) => (
                    <div
                      className="rounded-lg border border-[#E1E4E2] p-2 text-center text-[10px]"
                      key={label}
                    >
                      <span className="block">{label}</span>
                      <strong>{value}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 flex justify-end gap-3">
        <button
          onClick={step === 1 ? undefined : back}
          className="h-10 w-36 rounded-lg border border-[#D4D9D7] bg-white text-xs"
        >
          {step === 1 ? "Cancel" : "Back"}
        </button>
        {step < 5 ? (
          <button
            onClick={next}
            className="h-10 w-36 rounded-lg bg-[#005442] text-xs text-white"
          >
            Next
          </button>
        ) : (
          <Link
            href="/manager/listings"
            className="flex h-10 w-36 items-center justify-center rounded-lg bg-[#005442] text-xs text-white"
          >
            Publish Listing
          </Link>
        )}
      </div>
    </section>
  );
}
