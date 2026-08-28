"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const HERO_IMAGE_SRC = "/image/Apartment_image.png";
const LOGO_SRC = "/image/Logo.png";

const RESEND_SECONDS = 45;

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "your email";
  const role =
    searchParams.get("role") === "hotelManager"
      ? "hotelManager"
      : "regularUser";

  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const codeInputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const formattedTime = `00:${String(secondsLeft).padStart(2, "0")}`;

  const handleResend = () => {
    if (secondsLeft > 0) return;
    setSecondsLeft(RESEND_SECONDS);
    // Demo-only: no real email is sent since there's no backend yet.
  };

  const handleSimulateVerification = () => {
    router.push(`/signup/verified?role=${role}`);
  };

  const updateCode = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const nextCode = [...code];
    nextCode[index] = digit;
    setCode(nextCode);
    if (digit && index < 5) codeInputRefs.current[index + 1]?.focus();
  };

  const handleCodeKeyDown = (index: number, key: string) => {
    if (key === "Backspace" && !code[index] && index > 0) {
      codeInputRefs.current[index - 1]?.focus();
    }
  };

  const handleCodePaste = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 6).split("");
    if (!digits.length) return;
    setCode([...digits, ...Array(6 - digits.length).fill("")]);
    codeInputRefs.current[digits.length - 1]?.focus();
  };

  return (
    <main
      className={`${plusJakartaSans.className} grid min-h-screen w-full grid-cols-1 bg-white lg:grid-cols-5`}
    >
      {/* Left panel */}
      <div className="hidden lg:block relative col-span-2">
        <img
          src="/image/Signup_hero.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-10 left-10 text-slate-900">
          <div className="flex items-center gap-2 mb-1">
            <img src="/image/logo_white.png" alt="Nyangu" />
            {/* <span className="text-xl font-bold">Nyangu</span> */}
          </div>
          {/* <p className="text-sm">
            Where comfort <span className="underline">meets elegance.</span>
          </p>
          <p className="text-sm">Your stay, simplified.</p> */}
        </div>
      </div>

      {/* Right panel */}
      <div className="col-span-1 flex w-full flex-col items-center justify-center px-4 py-8 sm:px-6 sm:py-12 lg:col-span-3">
        <div className="w-full max-w-[525px] rounded-xl border border-emerald-900 bg-white px-4 py-12 text-center sm:px-12 sm:py-24">
          {/* <div className="text-5xl mb-6">📧</div> */}

          <h1 className="mb-2 text-2xl font-bold text-black sm:text-3xl">
            Verify your email
          </h1>
          <p className="mb-6 text-sm text-black sm:text-base">
            Your 6-digit code was sent to you via email
          </p>
          <div className="mb-7 grid w-full grid-cols-6 gap-1.5 sm:flex sm:justify-center sm:gap-3">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(element) => {
                  codeInputRefs.current[index] = element;
                }}
                type="text"
                inputMode="numeric"
                autoComplete={index === 0 ? "one-time-code" : "off"}
                value={digit}
                onChange={(event) => updateCode(index, event.target.value)}
                onKeyDown={(event) => handleCodeKeyDown(index, event.key)}
                onPaste={(event) => {
                  event.preventDefault();
                  handleCodePaste(event.clipboardData.getData("text"));
                }}
                aria-label={`Verification code digit ${index + 1}`}
                className="h-12 min-w-0 w-full rounded-lg border border-gray-200 bg-gray-50 text-center text-lg font-semibold text-slate-900 outline-none transition focus:border-emerald-800 focus:ring-2 focus:ring-emerald-100 sm:h-14 sm:w-12"
              />
            ))}
          </div>
          <button
            onClick={handleSimulateVerification}
            className="mb-5 h-16 w-full max-w-[220px] rounded-lg bg-emerald-900 text-base font-medium text-white transition hover:bg-emerald-800"
          >
            Verify
          </button>
          <p className="text-base text-gray-600">
            Didn&apos;t receive the code?{" "}
            <button
              onClick={handleResend}
              disabled={secondsLeft > 0}
              className={`font-medium transition ${secondsLeft > 0 ? "cursor-not-allowed text-gray-400" : "text-emerald-900 hover:text-emerald-700"}`}
            >
              Request again{secondsLeft > 0 ? ` (${formattedTime})` : ""}
            </button>
          </p>

          {false && (
            <>
              <h1 className="text-xl font-bold text-slate-900 mb-4">
                Verify your email
              </h1>

              <p className="text-sm text-gray-500 mb-1">
                We&apos;ve sent a verification link to{" "}
                <span className="text-sm font-medium text-slate-900 mb-4">
                  {email}
                </span>
              </p>
              {/* <p className="text-sm font-medium text-slate-900 mb-4">{email}</p> */}

              {/* <p className="text-sm text-gray-500 mb-6">
            Click the link in the email to verify your account
          </p> */}

              <button
                onClick={handleResend}
                disabled={secondsLeft > 0}
                className={`text-sm font-medium mb-4 transition ${
                  secondsLeft > 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-emerald-700 hover:text-emerald-900"
                }`}
              >
                Resend email {secondsLeft > 0 ? `[${formattedTime}]` : ""}
              </button>

              <div>
                <Link
                  href={`/signup/register?role=${role}`}
                  className="text-sm text-gray-500 hover:text-slate-700 transition"
                >
                  Use a different email
                </Link>
              </div>

              {/* Demo-only helper since there's no backend to actually send/verify email yet */}
              <button
                onClick={handleSimulateVerification}
                className="mt-10 text-xs text-gray-300 hover:text-gray-400 transition underline"
              >
                (Demo) Simulate clicking the verification link
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
