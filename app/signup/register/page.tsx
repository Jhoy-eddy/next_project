"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

type Country = {
  id: string;
  code: string;
  name: string;
  flag: string;
  flagUrl?: string;
};

const REST_COUNTRIES_URL =
  "https://restcountries.com/v3.1/all?fields=name,flags,idd";

export default function Register() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [role, setRole] = useState<"user" | "manager" | null>(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [selectedCountryId, setSelectedCountryId] = useState("NG");
  const [isCountryMenuOpen, setIsCountryMenuOpen] = useState(false);

  const countryCodes = [
    { code: "+234", name: "Nigeria", flag: "/images/flag_icon.png" },
    { code: "+233", name: "Ghana", flag: "🇬🇭" },
    { code: "+254", name: "Kenya", flag: "🇰🇪" },
    { code: "+27", name: "South Africa", flag: "🇿🇦" },
    { code: "+1", name: "United States", flag: "🇺🇸" },
    { code: "+44", name: "United Kingdom", flag: "🇬🇧" },
  ];

  // Retained while the REST Countries request is loading or unavailable.
  void countryCodes;

  const fallbackCountries: Country[] = [
    {
      id: "NG",
      code: "+234",
      name: "Nigeria",
      flag: "\u{1F1F3}\u{1F1EC}",
      flagUrl: "/image/flag_icon.png",
    },
    { id: "GH", code: "+233", name: "Ghana", flag: "\u{1F1EC}\u{1F1ED}" },
    { id: "KE", code: "+254", name: "Kenya", flag: "\u{1F1F0}\u{1F1EA}" },
    { id: "ZA", code: "+27", name: "South Africa", flag: "\u{1F1FF}\u{1F1E6}" },
    { id: "US", code: "+1", name: "United States", flag: "\u{1F1FA}\u{1F1F8}" },
    {
      id: "GB",
      code: "+44",
      name: "United Kingdom",
      flag: "\u{1F1EC}\u{1F1E7}",
    },
  ];

  const [countries, setCountries] = useState<Country[]>(fallbackCountries);

  const selectedCountry =
    countries.find((country) => country.id === selectedCountryId) ??
    countries[0];
  const countryCode = selectedCountry.code;

  useEffect(() => {
    const selectedRole = searchParams.get("role");

    if (selectedRole === "user" || selectedRole === "manager") {
      setRole(selectedRole);
    }
  }, [searchParams]);

  useEffect(() => {
    let cancelled = false;

    async function loadCountries() {
      try {
        const response = await fetch(REST_COUNTRIES_URL);

        if (!response.ok) {
          throw new Error("Could not load country data");
        }

        const data: Array<{
          name: { common: string };
          cca2: string;
          flags: { svg: string; png: string; alt?: string };
          idd: { root?: string; suffixes?: string[] };
        }> = await response.json();

        const apiCountries = data
          .flatMap((country) => {
            if (!country.idd.root || !country.idd.suffixes?.length) {
              return [];
            }

            return country.idd.suffixes.map((suffix) => ({
              id: country.cca2,
              code: `${country.idd.root}${suffix}`,
              name: country.name.common,
              flag: country.flags.alt ?? country.name.common,
              flagUrl:
                country.flags.svg?.trim() ||
                country.flags.png?.trim() ||
                undefined,
            }));
          })
          .sort((first, second) => first.name.localeCompare(second.name));

        if (!cancelled && apiCountries.length > 0) {
          setCountries(apiCountries);
        }
      } catch {
        // Keep the small local list usable when the API is unavailable.
      }
    }

    loadCountries();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!agree) {
      alert("Please agree to the Privacy Policy.");
      return;
    }

    router.push(`/signup/verify-email?role=${role}`);
  };

  return (
    <main className="w-full min-h-screen flex flex-col md:flex-row">
      <section className="relative w-full md:w-2/5 min-h-[400px] md:min-h-screen overflow-hidden md:block hidden">
        <img
          src="/image/Signup_hero.png"
          alt="Nyangu property"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/20 to-transparent" />

        <div className="absolute left-[11%] top-9 z-10">
          <img src="/image/Logo.png" alt="Nyangu" className="w-40 md:w-48" />

          {/* <div className="mt-8">
            <p className="text-lg md:text-xl text-slate-800 leading-relaxed">
              Where comfort
              <br />
              <span className="underline underline-offset-4">
                meets elegance.
              </span>
            </p>

            <p className="text-lg md:text-xl text-slate-800 mt-2">
              Your stay, simplified.
            </p>
          </div> */}
        </div>
      </section>

      {/* ================= RIGHT SIDE ================= */}

      <section className="w-full md:w-3/5 min-h-screen flex items-center justify-center px-6 sm:px-10 lg:px-16 py-12">
        <form onSubmit={handleSubmit} className="w-full max-w-2xl">
          {/* Heading */}

          <div className="text-left mb-8">
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900">
              Create an account
            </h1>

            <p className="text-sm text-gray-500 mt-2">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="text-emerald-800 font-medium"
              >
                Sign in
              </button>
            </p>
          </div>

          {/* Full Name */}

          <div className="mb-4">
            <label className="block text-sm text-slate-700 mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full h-12 border border-gray-200 rounded-lg px-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>

          {/* Email */}

          <div className="mb-4">
            <label className="block text-sm text-slate-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-12 border border-gray-200 rounded-lg px-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>

          {/* Phone Number */}

          {/* <div className="mb-4">
            <label className="block text-sm text-slate-700 mb-2">
              Phone Number
            </label>

            <div className="flex h-auto">

              <select className="">
                <option className="flex items-center gap-2">
                    <Image src="/image/flag_icon.png" alt="flag"  width={100} height={20} className="h-auto"/>
                    <p>+234</p>
                </option>
              </select>

              <input
                type="tel"
                placeholder="xxx xxx xxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="flex-1 h-12 border border-l-0 border-gray-200 rounded-r-lg px-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />

            </div>
          </div> */}

          <div className="mb-4">
            <label className="mb-2 block text-sm text-slate-700">
              Phone Number
            </label>

            <div className="flex h-12">
              <div className="relative w-32 shrink-0">
                {selectedCountry.flagUrl ? (
                  <img
                    src={selectedCountry.flagUrl}
                    alt={`${selectedCountry.name} flag`}
                    className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-6 -translate-y-1/2 object-cover"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-lg"
                  >
                    {selectedCountry.flag}
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => setIsCountryMenuOpen((isOpen) => !isOpen)}
                  aria-expanded={isCountryMenuOpen}
                  aria-haspopup="listbox"
                  className="h-12 w-full rounded-l-lg border border-gray-200 bg-white pb-0 pl-10 pr-7 pt-0 text-left text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  {countryCode}
                </button>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                  <ChevronDown size={18} />
                </span>

                {isCountryMenuOpen && (
                  <div
                    role="listbox"
                    aria-label="Country code"
                    className="absolute left-0 top-full z-20 mt-1 max-h-64 w-72 overflow-y-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
                  >
                    {countries.map((country) => (
                      <button
                        key={`${country.id}-${country.code}`}
                        type="button"
                        role="option"
                        aria-selected={country.id === selectedCountry.id}
                        onClick={() => {
                          setSelectedCountryId(country.id);
                          setIsCountryMenuOpen(false);
                        }}
                        className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm hover:bg-emerald-50 focus:bg-emerald-50 focus:outline-none"
                      >
                        {country.flagUrl ? (
                          <img
                            src={country.flagUrl}
                            alt=""
                            className="h-4 w-6 shrink-0 object-cover"
                          />
                        ) : (
                          <span className="w-6 shrink-0 text-lg">
                            {country.flag}
                          </span>
                        )}
                        <span className="truncate">{country.name}</span>
                        <span className="ml-auto text-gray-500">
                          {country.code}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <input
                type="tel"
                placeholder="xxx xxx xxxx"
                value={phone}
                maxLength={11}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="h-12 min-w-0 flex-1 rounded-r-lg border border-l-0 border-gray-200 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>
          </div>

          {/* Password */}

          <div className="mb-4">
            <label className="block text-sm text-slate-700 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-12 border border-gray-200 rounded-lg px-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>

          {/* Confirm Password */}

          <div className="mb-5">
            <label className="block text-sm text-slate-700 mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full h-12 border border-gray-200 rounded-lg px-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>

          <label className="flex items-center gap-2 mt-3 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="rounded border-gray-300"
            />

            <span>
              I agree to the <span className="underline text-[#003E30] mb-2">Privacy Policy</span>
            </span>
          </label>

          <button
            type="submit"
            className="w-full h-12 bg-emerald-900 hover:bg-emerald-800 text-white rounded-lg text-sm font-medium transition mt-3"
          >
            Create Account
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-[#000000] font-medium"
            >
              Sign-up-with
            </button>
          </p>

          <div className="flex items-center justify-center gap-3 w-full mt-4">
            <Link href={""}>
              <img
                src="/image/Facebook_icon.png"
                alt="Facebook login"
                className="h-10 w-10"
              />
            </Link>

            <Link href={""}>
              <img src="/image/Google_icon.png" alt="" className="h-9 w-9" />
            </Link>

            <Link href={""}>
              <img src="/image/Apple_icon.png" alt="" className="h-9 w-9" />
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
