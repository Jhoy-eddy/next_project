import Image from "next/image";
import Link from "next/link";

const popularStays = [
  {
    image: "/image/BDL_icon.png",
    title: "2-Bedroom Apartment in Lekki",
    rating: "4.8 (120)",
  },
  // {
  //   image: "/image/BRV_icon.png",
  //   title: "Beach Resort in Victoria Island",
  //   rating: "4.2 (118)",
  // },
  {
    image: "/image/BDIL_icon.png",
    title: "Luxury 3-Bedroom Duplex in Lekki",
    rating: "4.9 (140)",
  },
  {
    image: "/image/hf.png",
    title: "Luxury 3-Bedroom Suite in Lekki",
    rating: "4.4 (126)",
  },
  {
    image: "/image/MSA_icon.png",
    title: "Modern Studio Apartment",
    rating: "4.5 (130)",
  },
];

const avatars = [
  "/image/Guest_image.png",
  "/image/Guestt.png",
  "/image/Guest_image.png",
  "/image/Guestt.png",
];

const benefits = [
  { icon: "/image/sr_icon.png", title: "Smart Reservations", text: "Manage bookings across all channels in real-time." },
  { icon: "/image/QE_icon.png", title: "Quality Experience", text: "Personalize every stay and build lasting memories." },
  { icon: "/image/p_management.png", title: "Property Management", text: "Manage multiple listings at ease from one dashboard." },
  { icon: "/image/comfort_icon.png", title: "Secure & Reliable", text: "Triple-layer verification & 24/7 support, you can count on." },
  { icon: "/image/handshake_icon.png", title: "Easy & Transparent", text: "Compare and choose with all the important information in one place." },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fbfcfc] text-[#0a0d0d]">
      <nav className="mx-auto flex h-14 w-11/12 items-center justify-between border-b border-gray-200 px-5 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-semibold"
        >
          <div className="flex  items-center justify-center rounded-full text-[9px] text-white">
            <img src="/image/Logo.png" alt="logo" className="" />
          </div>
          
        </Link>
        <div className="hidden items-center gap-7 text-sm text-gray-700 sm:flex">
          <a href="#about" className="hover:text-[#004c3a]">
            About
          </a>
          <a href="#stays" className="hover:text-[#004c3a]">
            Manage Listings
          </a>
          <a href="#about" className="hover:text-[#004c3a]">
            Host on Nyangu
          </a>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <Link
            href="/login"
            className="flex h-7 w-24 items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-[12px]"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="flex h-7 w-24 items-center justify-center rounded-full bg-[#004c3a] text-white hover:bg-[#00382b]"
          >
            Sign up
          </Link>
        </div>
      </nav>

      <section
        id="about"
        className="mx-auto grid w-11/12 gap-6 px-5 pb-5 pt-3 sm:px-8 lg:grid-cols-[1fr_1.03fr] lg:gap-9"
      >
        <div className="flex flex-col justify-center py-5 lg:py-8">
          <span className="mb-5 inline-flex w-fit items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700">
            <span className="text-[#004c3a]">★</span> 4.5 Rating
          </span>
          <h1 className="max-w-147.5 text-5xl font-medium leading-[0.97] tracking-[-0.04em] sm:text-6xl lg:text-[68px]">
            Find the best
            <br />
            stays.
          </h1>
          <p className="mt-5 max-w-90 text-[12px] leading-[1.35] text-gray-700">
            Every stay is verified, every booking secure. Nyangu connects you to
            comfort, quality, and peace of mind wherever you go.
          </p>
          <div className="mt-5 flex gap-2">
            <Link
              href="/login"
              className="flex h-8 w-20 items-center justify-center rounded-full border border-gray-200 bg-white text-[11px]"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="flex h-8 w-20 items-center justify-center rounded-full bg-[#004c3a] text-[9px] text-white hover:bg-[#00382b]"
            >
              Get Started
            </Link>
          </div>
          <div className="mt-7 flex items-center gap-2 text-[10px] text-gray-600">
            <div className="flex -space-x-1.5">
              {avatars.map((src, index) => (
                <Image
                  key={`${src}-${index}`}
                  src={src}
                  alt=""
                  width={24}
                  height={24}
                  className="h-6 w-6 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
            <span>Trusted by users. Trusted by hotels.</span>
          </div>
        </div>
        <div className="relative min-h-75 overflow-hidden rounded-lg sm:min-h-105 lg:min-h-127.5">
          <Image
            src="/image/Z_global.png"
            alt="Modern Nyangu stay"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 52vw"
          />
        </div>
      </section>

      <section id="stays" className="bg-[#f4f5f3]  px-3 pb-8 sm:px-5">
        <div className="rounded-t-md mx-auto w-11/12 px-2.5 py-2 mb-4">
          <h2 className="text-xl font-medium tracking-[-0.03em] sm:text-2xl my-4">
            Explore popular stays in Lagos
          </h2>
          <div className="grid grid-cols-1 gap-3 px-2.5 pb-3 sm:grid-cols-3 lg:grid-cols-4">
            {popularStays.map((stay) => (
              <Link
                href="/dashboard/listings"
                key={stay.title}
                className="group min-w-0"
              >
                <div className="relative aspect-[1.33] overflow-hidden rounded-md">
                  <Image
                    src={stay.image}
                    alt={stay.title}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 20vw"
                  />
                </div>
                <p className="mt-1 truncate text-[12px] font-medium text-gray-800">
                  {stay.title}
                </p>
                <p className="text-[10px] text-gray-600">
                  <span className="text-[#004c3a]">★</span> {stay.rating}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 bg-white px-3 py-7 sm:px-5">
        <h2 className="mb-5 text-center text-lg font-semibold">Why choose Nyangu?</h2>
        <div className="mx-auto grid w-11/12 gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {benefits.map((benefit) => (
            <article key={benefit.title} className="flex min-h-32 flex-col items-center justify-center rounded-md border border-[#80a99e] px-4 py-4 text-center">
              <Image src={benefit.icon} alt="" width={25} height={25} className="mb-3 h-6 w-6 object-contain" />
              <h3 className="text-[12px] font-semibold">{benefit.title}</h3>
              <p className="mt-1 max-w-36 text-[10px] leading-tight text-gray-600">{benefit.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-11/12 px-3 pb-3 sm:px-5">
        <div className="relative flex min-h-40 items-center overflow-hidden rounded-md sm:min-h-48">
          <Image src="/image/Hotel_image.png" alt="Beautiful Nyangu spaces" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-black/25" />
          <h2 className="relative z-10 px-5 text-3xl font-semibold tracking-tight text-white sm:px-12 sm:text-4xl">Beautiful spaces for every kind of stay</h2>
        </div>
      </section>

      <footer className="bg-[#f1f2f2] px-5 pb-4 pt-6 text-[8px] text-gray-600 sm:px-8">
        <div className="mx-auto grid w-11/12 gap-7 sm:grid-cols-[1.7fr_0.8fr_0.8fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <div className="flex items-center justify-center rounded-full text-[9px] text-white">
                <img src="/image/Logo.png" alt="logo" className=""/>
              </div>
            
            </Link>
            <p className="mt-3 max-w-64 text-[10px] leading-relaxed">Finding your next stay should be stress-free and certain, which is the belief at Nyangu. Our platform is designed with your peace of mind at the top priority, every listing is carefully vetted, every host is thoroughly verified, ensuring every decision you make is a happy one.</p>
            <div className="mt-2 flex gap-2 text-[10px] text-[#004c3a]">
              <div><img src="/image/linkedin_icon.png" alt="linkedin" className="" /></div>
              <div><img src="/image/instagram.png" alt="instagram" className=""/> </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-base uppercase  text-slate-900">Legal</h3>
            <div className="mt-4 text-[10px] space-y-2"><p>Privacy & cookies</p><p>Terms & conditions</p><p>Help center</p><p>Contact us</p></div>
          </div>
          <div>
            <h3 className="font-semibold uppercase  text-base text-slate-900">Company</h3>
            <div className="mt-4 text-[10px] space-y-2"><p>About Nyangu</p><p>How we work</p></div>
          </div>
          <div>
            <h3 className="font-semibold uppercase  text-base text-slate-900">Offices</h3>
            <div className="mt-4 text-[12px] space-y-2"><p><strong>Lagos</strong><br />4 Adetola street, Abiodun Bero Estate,<br />Iseri Magodo, Lagos, Nigeria</p><p><strong>US</strong><br />8 The Green, Suite B, Dover, DE 19901, USA</p></div>
          </div>
        </div>
        <div className="mx-auto mt-5 flex w-11/12 flex-col justify-between gap-2 border-t border-gray-200 pt-4 text-[10px] sm:flex-row"><span>© 2025 Nyangu Technologies Ltd. All rights reserved. | RC 8864464</span><span>™ 2026 Nyangu. All trademarks protected.</span></div>
      </footer>
    </main>
  );
}
