export type Listing = {
  id: string;
  title: string;
  location: string;
  beds: number;
  baths: number;
  sqm: number;
  price: number;
  rating: number;
  reviews: number;
  type: "Apartments" | "Houses" | "Studios" | "Duplexes" | "Penthouses";
  amenities: string[];
  image: string;

  images: string[];
  description: string;
  parking: boolean;
  maxGuests: number;
  cleaningFee: number;
  availableDates: string[];
};

function createAvailableDates(start: string, end: string) {
  const dates: string[] = [];
  const current = new Date(`${start}T00:00:00`);
  const lastDate = new Date(`${end}T00:00:00`);

  while (current <= lastDate) {
    dates.push(current.toISOString().slice(0, 10));
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

export const LISTINGS: Listing[] = [
  {
    id: "cozy-2br-lekki",
    title: "2-Bedroom Apartment",
    location: "Lekki Phase 1, Lagos",
    beds: 2,
    baths: 2,
    sqm: 100,
    price: 85000,
    rating: 4.8,
    reviews: 150,
    type: "Apartments",
    amenities: [
      "Wi-Fi",
      "Air Conditioning",
      "Swimming pool",
      "Parking Space",
      "Smart TV",
      "Kitchen",
      "Washer",
      "Housekeeping",
    ],
    image: "/image/BDL_icon.png",
    
    images: [
      "/image/BDL_icon.png",
      "/image/BDL_icon.png",
      "/image/BDL_icon.png",
      "/image/BDL_icon.png",

    ],
   description: 
   "Experience comfort and elegance in this beautifully furnished 2-bedroom apartment in the heart of Lekki Phase 1. Enjoy 24/7 power, high-speed Wi-Fi, smart Tv, a fully equipped kitchen, and premium security.",
   parking: true,
    maxGuests: 4,
   cleaningFee: 5000,
  availableDates: createAvailableDates("2026-01-01", "2026-12-31"),
  },

  {
    id: "luxury-beach-resort-vi",
    title: "Luxury Beach Resort",
    location: "Victoria Island, Lagos",
    beds: 3,
    baths: 2,
    sqm: 180,
    price: 120000,
    rating: 4.0,
    reviews: 88,
    type: "Penthouses",
    amenities: [
      "Wi-Fi",
      "Air Conditioning",
      "Swimming pool",
      "Fitness center",
      "Room service",
      "Parking Space",
      "Bathtub",
      "Refrigerator",
    ],
    image: "/image/BRV_icon.png",

  images: [
    "/image/BRV_icon.png",
    "/image/BRV_icon.png",
    "/image/BRV_icon.png",
    "/image/BRV_icon.png",
  ],
  description: 
  "Experience",
  parking: true,
  maxGuests: 4,
  cleaningFee: 5000,
  availableDates: createAvailableDates("2026-02-01", "2026-11-30"),
  },

  {
    id: "luxury-3br-duplex-chevron",
    title: "Luxury 3-Bedroom Duplex",
    location: "Chevron Drive, Lekki",
    beds: 3,
    baths: 2,
    sqm: 200,
    price: 210000,
    rating: 4.9,
    reviews: 98,
    type: "Duplexes",
    amenities: [
      "Wi-Fi",
      "Air Conditioning",
      "Room service",
      "Parking Space",
      "Smart TV",
      "Kitchen",
      "Workspace",
      "Housekeeping",
    ],
    image: "/image/BDIL_icon.png",

   images: [
    "/image/BDIL_icon.png",
    "/image/BDIL_icon.png",
    "/image/BDIL_icon.png",
    "/image/BDIL_icon.png",
  ],
  description: 
  "Experience",
  parking: true,
  maxGuests: 4,
  cleaningFee: 5000,
  availableDates: createAvailableDates("2026-03-15", "2026-12-31"),
  },

  {
    id: "modern-studio-ikoyi",
    title: "Modern Studio Apartment",
    location: "Ikoyi, Lagos",
    beds: 1,
    baths: 1,
    sqm: 88,
    price: 65000,
    rating: 4.5,
    reviews: 130,
    type: "Studios",
    amenities: [
      "Wi-Fi",
      "Air Conditioning",
      "Fitness center",
      "Room service",
      "Parking Space",
      "Kitchen",
      "Washer",
      "Workspace",
    ],
    image: "/image/MSA_icon.png",
    
   images: [
    "/image/MSA_icon.png",
    "/image/MSA_icon.png",
    "/image/MSA_icon.png",
    "/image/MSA_icon.png",
  ],  
  description:
  "Experience",
  parking: true,
  maxGuests: 5,
  cleaningFee: 5000,
  availableDates: createAvailableDates("2026-01-15", "2026-10-31"),
  },
];