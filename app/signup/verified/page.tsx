"use client"

import { useRouter } from "next/navigation";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function VerifiedPage() {
  const router = useRouter();

  return (
    <main
      className={`${plusJakartaSans.className} w-full min-h-screen grid grid-cols-5 bg-white`}
    >
      {/* Left panel */}
      <div className="hidden lg:block relative col-span-2">
        <img
          src="/image/Signup_hero.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute top-10 left-10 text-slate-900">
          <div className="flex items-center gap-2 mb-3">
            <img
              src="/image/Logo.png"
              alt="Nyangu"
            />
          </div>

          {/* <p className="text-sm">
            Where comfort{" "}
            <span className="underline">
              meets elegance.
            </span>
          </p>

          <p className="text-sm">
            Your stay, simplified.
          </p> */}
        </div>
      </div>

      {/* Right panel */}
      <div className="col-span-5 lg:col-span-3 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[525px] text-center">

          {/* Verification icon */}
          <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center">
            {/* <div className="absolute h-20 w-20 rounded-full bg-emerald-900" /> */}

            <div className="relative text-4xl text-white">
                <img src="/image/verified_icon.png" alt="verified" className=""/>
            </div>
          </div>

          {/* Heading */}
          <h1 className="mb-3 text-3xl font-bold text-slate-900">
            Your account has been verified!
          </h1>

          {/* Description */}
          <p className="mb-10 text-sm text-gray-500">
            Your email has been verified successfully
          </p>

          {/* Button */}
          <button
            onClick={() => router.push("/login")}
            className="h-14 w-full max-w-[360px] rounded-lg bg-emerald-900 text-sm font-medium text-white transition hover:bg-emerald-800"
          >
            Continue to Sign-In
          </button>

        </div>
      </div>
    </main>
  );
}