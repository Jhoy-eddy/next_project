"use client";

import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  ChevronRight,
  Gem,
  Heart,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type RoleCardProps = {
  image: string;
  imageAlt: string;
  title: string;
  accent: string;
  description: string;
  onClick: () => void;
};

function RoleCard({
  image,
  imageAlt,
  title,
  accent,
  description,
  onClick,
}: RoleCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex min-h-[380px] w-full flex-col overflow-hidden rounded-[10px] border border-[#005241] bg-white p-2 text-center shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#00614d] focus:ring-offset-2"
    >
      <img
        src={image}
        alt={imageAlt}
        className="h-[218px] w-full rounded-[7px] object-cover"
      />
      <div className="flex flex-1 flex-col px-3 pb-4 pt-4">
        <h2 className="text-[17px] font-semibold tracking-tight text-black">
          {title} <span className="text-[#005844]">{accent}</span>
        </h2>
        <span className="mx-auto mt-1 h-px w-11 bg-[#005844]" />
        <p className="mx-auto mt-3 max-w-[245px] text-[12px] leading-[1.12] text-black">
          {description}
        </p>
        <span className="ml-auto mt-auto flex h-8 w-8 items-center justify-center rounded-full bg-[#005844] text-white transition group-hover:bg-[#003f31]">
          <ChevronRight size={18} strokeWidth={1.8} />
        </span>
      </div>
    </button>
  );
}

export default function Signup() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white font-sans text-black">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[39.4%_60.6%]">
        <section className="relative hidden min-h-screen overflow-hidden bg-white lg:block">
          <div className="h-[120vh] relative">
            <div className="absolute top-0 bottom-0 h-full bg-blue-500 z-50">
              <div className="bg-blue-500 h-full"></div>
            </div>
            <img
              src="/image/Signup_hero.png"
              alt="Modern Nyangu home"
              className="h-full w-full object-cover object-[48%_center]"
            />
          </div>
          {/* <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-white via-white/85 to-transparent" /> */}
          <div className="absolute left-[11%] top-9 z-10">
            <img src="/image/logo_white.png" alt="Nyangu" className="w-[205px]" />
            {/* <div className="mt-8 text-[20px] font-medium leading-[1.05] tracking-tight">
              <p>Where comfort</p>
              <p className="inline-block pb-1">
                <span className="border-b border-[#005844]">meets</span>{" "}
                elegance.
              </p>
              <p className="mt-1">
                Comfort, curated for{" "}
                <span className="text-[#005844]">you.</span>
              </p>
            </div> */}
          </div>
        </section>

        <section className="flex min-h-screen flex-col px-5 py-8 sm:px-10 lg:px-12 xl:px-16">
          <div className="mx-auto flex w-full max-w-[668px] flex-1 flex-col justify-center">
            <div className="mb-14 text-center lg:mb-18">
              <p className="flex items-center justify-center gap-1 text-[13px] font-medium text-[#005844]">
                Welcome to Nyangu <Sparkles size={15} strokeWidth={1.7} />
              </p>
              <h1 className="mt-1 text-[25px] font-bold leading-none tracking-tight sm:text-[27px]">
                Let&apos;s get you started
              </h1>
              <p className="mt-1 text-[13px] text-[#333]">
                Choose how you want to use Nyangu
              </p>
            </div>

            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-7">
              <RoleCard
                image="/image/Guestt.png"
                imageAlt="Property manager presenting analytics"
                title="Sign up as a"
                accent="Guest"
                description="Discover amazing stay, built for seamless travels."
                onClick={() => router.push("/signup/register?role=manager")}
              />
              <RoleCard
                image="/image/Managerr.png"
                imageAlt="Guests relaxing in a bedroom"
                title="Sign up as a"
                accent="Manager"
                description="Create and manage your property listings, all from a single dashboard."
                onClick={() => router.push("/signup/register?role=user")}
              />
            </div>

            <p className="mt-12 text-center text-[13px] text-black sm:mt-14">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="inline-flex items-center font-medium text-[#005844] hover:underline"
              >
                Sign in{" "}
                <ArrowUpRight className="ml-0.5" size={14} strokeWidth={2} />
              </button>
            </p>
          </div>

          <div className="mx-auto mt-8 grid w-full max-w-[560px] grid-cols-2 text-[9px] text-[#262626] sm:grid-cols-3 sm:divide-x sm:divide-gray-300">
            <div className="flex items-center justify-start gap-2 px-4 py-3 sm:px-6 sm:py-0">
              <ShieldCheck
                size={18}
                className="text-[#005844]"
                strokeWidth={1.6}
              />
              <span>
                <b className="block text-[10px] font-medium ">Comfort</b>Rest
                easy, always
              </span>
            </div>
            <div className="flex items-center justify-start gap-2 border-l border-gray-300 px-4 py-3 sm:border-0 sm:px-6 sm:py-0">
              <Gem size={18} className="text-[#005844]" strokeWidth={1.6} />
              <span>
                <b className="block text-[10px] font-medium">Verified Stays</b>
                Thoroughly vetted
              </span>
            </div>
            <div className="col-span-2 flex items-center justify-center gap-2 px-4 py-3 sm:col-span-1 sm:justify-start sm:px-6 sm:py-0">
              <Heart size={18} className="text-[#005844]" strokeWidth={1.6} />
              <span>
                <b className="block text-[10px] font-medium">Seamless Payments</b>
               Effortless & Secure
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
