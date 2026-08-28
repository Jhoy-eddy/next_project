"use client";

import { Camera, ChevronDown, MapPin, Mail, Phone } from "lucide-react";
import { useState } from "react";

const tabs = ["Overview", "Bookings", "Saved Stays", "Reviews", "Settings"];

export default function ProfilePage() {
	const [activeTab, setActiveTab] = useState("Overview");
	const [appNotifications, setAppNotifications] = useState(true);
	const [emailNotifications, setEmailNotifications] = useState(true);

	return (
		<main className="mx-auto max-w-6xl">
			<section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
				<div className="relative flex min-h-36 flex-col justify-end bg-[#f5f3ee] px-7 py-5 sm:min-h-36 sm:flex-row sm:items-center sm:justify-between">
					<img
						src="/image/Hero_section.png"
						alt=""
						className="absolute inset-y-0 right-0 h-full w-1/2 object-cover opacity-90"
					/>
					<div className="relative z-10 flex items-center gap-4">
						<div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 text-3xl font-medium text-emerald-950">
							JE
							<button
								type="button"
								aria-label="Change profile photo"
								className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-white text-slate-800 shadow-sm"
							>
								<Camera size={15} />
							</button>
						</div>
						<div className="space-y-1 text-sm text-slate-800">
							<h1 className="text-base font-semibold text-slate-950">Joy Edward</h1>
							<p className="flex items-center gap-2 text-xs"><Mail size={14} /> joyedward124@gmail.com</p>
							<p className="flex items-center gap-2 text-xs"><Phone size={14} /> +234 801 234 4567</p>
							<p className="flex items-center gap-2 text-xs"><MapPin size={14} /> Lagos, Nigeria</p>
						</div>
					</div>
					<button type="button" className="relative z-10 mt-4 self-end rounded-lg bg-[#005442] px-5 py-2.5 text-xs text-white hover:bg-[#003f32] sm:mt-0">Edit Profile</button>
				</div>

				<nav className="flex gap-7 overflow-x-auto border-b border-gray-200 px-7" aria-label="Profile sections">
					{tabs.map((tab) => (
						<button
							key={tab}
							type="button"
							onClick={() => setActiveTab(tab)}
							className={`whitespace-nowrap border-b-2 py-3 text-xs ${activeTab === tab ? "border-[#005442] font-medium text-[#005442]" : "border-transparent text-slate-700"}`}
						>
							{tab}
						</button>
					))}
				</nav>

				{activeTab === "Overview" ? (
					<div className="grid gap-8 p-7 lg:grid-cols-[1fr_280px]">
						<div className="space-y-7">
							<section>
								<h2 className="mb-3 text-sm font-semibold text-slate-950">Personal Information</h2>
								<dl className="grid grid-cols-[1fr_auto] gap-y-2 text-xs text-slate-700">
									<dt>Full Name</dt><dd>Joy Edward</dd>
									<dt>Email Address</dt><dd>joyedward124@gmail.com</dd>
									<dt>Phone Number</dt><dd>+234 801 234 4567</dd>
									<dt>Location</dt><dd>Lagos, Nigeria</dd>
									<dt>Date Joined</dt><dd>1 April 2026</dd>
									<dt>User ID</dt><dd>NYG-22332</dd>
								</dl>
							</section>
							<section>
								<h2 className="mb-3 text-sm font-semibold text-slate-950">Preferences</h2>
								<dl className="grid grid-cols-[1fr_auto] gap-y-2 text-xs text-slate-700">
									<dt>Language</dt><dd className="flex items-center gap-2">English <ChevronDown size={13} /></dd>
									<dt>Currency</dt><dd className="flex items-center gap-2">NGN (₦) <ChevronDown size={13} /></dd>
									<dt>Room Preference</dt><dd className="flex items-center gap-2">Highfloors <ChevronDown size={13} /></dd>
								</dl>
							</section>
							<section>
								<h2 className="mb-3 text-sm font-semibold text-slate-950">Notifications</h2>
								<Toggle label="App Notifications" description="Receive updates about bookings and offers" checked={appNotifications} onChange={() => setAppNotifications((value) => !value)} />
								<Toggle label="Email Notifications" description="Receive updates about bookings and offers" checked={emailNotifications} onChange={() => setEmailNotifications((value) => !value)} />
							</section>
						</div>
						<section className="border-t border-gray-200 pt-6 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-4">
							<div className="mb-4 flex items-center justify-between"><h2 className="text-sm font-semibold text-slate-950">Payment Methods</h2><button type="button" className="text-[10px] text-[#005442]">Add New</button></div>
							<p className="mb-2 text-[10px] text-slate-600">Card details</p>
							<div className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-3 text-[10px]">**** **** **** 4348 <strong className="text-blue-800">VISA</strong></div>
							<button type="button" className="mt-2 w-full rounded-lg border border-gray-200 py-2 text-xs text-[#005442]">+ Add New Card</button>
						</section>
					</div>
				) : (
					<div className="p-10 text-center text-sm text-slate-500">{activeTab} will appear here.</div>
				)}
			</section>
		</main>
	);
}

function Toggle({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: () => void }) {
	return (
		<button type="button" onClick={onChange} className="mb-3 flex w-full items-center justify-between text-left">
			<span><span className="block text-[10px] text-slate-800">{label}</span><span className="block text-[8px] text-slate-500">{description}</span></span>
			<span className={`flex h-5 w-9 items-center rounded-full p-0.5 ${checked ? "bg-[#005442]" : "bg-gray-300"}`}><span className={`h-4 w-4 rounded-full bg-white transition-transform ${checked ? "translate-x-4" : "translate-x-0"}`} /></span>
		</button>
	);
}
