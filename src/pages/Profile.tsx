import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Camera,
  Save,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

export default function Profile() {
  const [name, setName] = useState("Amal Das");
  const [email, setEmail] = useState("amal@example.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [location, setLocation] = useState("Kerala, India");
  const [dateOfBirth, setDateOfBirth] = useState("1992-01-01");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({
      name,
      email,
      phone,
      location,
      dateOfBirth,
    });
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* ================================================= */}
      {/* PAGE HEADER */}
      {/* ================================================= */}

      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your personal information and account settings.
        </p>
      </div>

      {/* ================================================= */}
      {/* PROFILE HEADER */}
      {/* ================================================= */}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Cover */}
        <div className="h-32 bg-linear-to-r from-indigo-600 via-indigo-500 to-violet-600" />

        {/* Profile information */}
        <div className="px-6 pb-6">
          <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              {/* Avatar */}

              <div className="relative">
                <div
                  className="
                    flex
                    h-24
                    w-24
                    items-center
                    justify-center
                    rounded-full
                    border-4
                    border-white
                    bg-indigo-100
                    text-2xl
                    font-bold
                    text-indigo-600
                    shadow-md
                  "
                >
                  AD
                </div>

                {/* Camera button */}

                <button
                  type="button"
                  aria-label="Change profile picture"
                  className="
                    absolute
                    bottom-0
                    right-0
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-indigo-600
                    text-white
                    shadow-md
                    transition
                    hover:bg-indigo-700
                  "
                >
                  <Camera className="h-4 w-4" />
                </button>
              </div>

              {/* Name */}

              <div className="pb-1">
                <h2 className="text-xl font-bold text-slate-900">Amal Das</h2>

                <p className="text-sm text-slate-500">Personal Account</p>
              </div>
            </div>

            {/* Account Status */}

            <div className="pb-1">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                Active Account
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* MAIN CONTENT */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* ================================================= */}
        {/* PERSONAL INFORMATION */}
        {/* ================================================= */}

        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-slate-200 bg-white shadow-sm"
          >
            {/* Header */}

            <div className="border-b border-slate-200 px-6 py-5">
              <h2 className="font-semibold text-slate-900">
                Personal Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Update your personal information.
              </p>
            </div>

            {/* Form fields */}

            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
              {/* Full Name */}

              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Full Name
                </label>

                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="
                      w-full
                      rounded-lg
                      border
                      border-slate-200
                      py-2.5
                      pl-10
                      pr-4
                      text-sm
                      text-slate-800
                      outline-none
                      transition
                      focus:border-indigo-500
                      focus:ring-2
                      focus:ring-indigo-100
                    "
                  />
                </div>
              </div>

              {/* Email */}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="
                      w-full
                      rounded-lg
                      border
                      border-slate-200
                      py-2.5
                      pl-10
                      pr-4
                      text-sm
                      text-slate-800
                      outline-none
                      transition
                      focus:border-indigo-500
                      focus:ring-2
                      focus:ring-indigo-100
                    "
                  />
                </div>
              </div>

              {/* Phone */}

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Phone Number
                </label>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="
                      w-full
                      rounded-lg
                      border
                      border-slate-200
                      py-2.5
                      pl-10
                      pr-4
                      text-sm
                      text-slate-800
                      outline-none
                      transition
                      focus:border-indigo-500
                      focus:ring-2
                      focus:ring-indigo-100
                    "
                  />
                </div>
              </div>

              {/* Location */}

              <div>
                <label
                  htmlFor="location"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Location
                </label>

                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="
                      w-full
                      rounded-lg
                      border
                      border-slate-200
                      py-2.5
                      pl-10
                      pr-4
                      text-sm
                      text-slate-800
                      outline-none
                      transition
                      focus:border-indigo-500
                      focus:ring-2
                      focus:ring-indigo-100
                    "
                  />
                </div>
              </div>

              {/* Date of Birth */}

              <div>
                <label
                  htmlFor="dob"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Date of Birth
                </label>

                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    id="dob"
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="
                      w-full
                      rounded-lg
                      border
                      border-slate-200
                      py-2.5
                      pl-10
                      pr-4
                      text-sm
                      text-slate-800
                      outline-none
                      transition
                      focus:border-indigo-500
                      focus:ring-2
                      focus:ring-indigo-100
                    "
                  />
                </div>
              </div>

              {/* Account Type */}

              <div>
                <label
                  htmlFor="accountType"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Account Type
                </label>

                <select
                  id="accountType"
                  defaultValue="personal"
                  className="
                    w-full
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    px-4
                    py-2.5
                    text-sm
                    text-slate-800
                    outline-none
                    transition
                    focus:border-indigo-500
                    focus:ring-2
                    focus:ring-indigo-100
                  "
                >
                  <option value="personal">Personal</option>

                  <option value="business">Business</option>
                </select>
              </div>
            </div>

            {/* Footer */}

            <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
              <button
                type="button"
                className="
                  rounded-lg
                  border
                  border-slate-200
                  px-4
                  py-2.5
                  text-sm
                  font-medium
                  text-slate-600
                  transition
                  hover:bg-slate-50
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                className="
                  flex
                  items-center
                  gap-2
                  rounded-lg
                  bg-indigo-600
                  px-4
                  py-2.5
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:bg-indigo-700
                "
              >
                <Save className="h-4 w-4" />
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* ================================================= */}
        {/* RIGHT SIDE */}
        {/* ================================================= */}

        <div className="space-y-6">
          {/* Account Information */}

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-semibold text-slate-900">
              Account Information
            </h2>

            <div className="mt-5 space-y-4">
              <InfoRow label="Member Since" value="January 2025" />

              <InfoRow label="Account Type" value="Personal" />

              <InfoRow label="Currency" value="INR (₹)" />

              <InfoRow
                label="Status"
                value="Active"
                valueClass="text-green-600"
              />
            </div>
          </div>

          {/* Security */}

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <ShieldCheck className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">Security</h2>

                <p className="text-xs text-slate-500">
                  Manage your account security
                </p>
              </div>
            </div>

            <button
              type="button"
              className="
                mt-5
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-lg
                border
                border-slate-200
                px-4
                py-2.5
                text-sm
                font-medium
                text-slate-700
                transition
                hover:bg-slate-50
              "
            >
              <Lock className="h-4 w-4" />
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* ACCOUNT SUMMARY */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard title="Total Transactions" value="248" />

        <SummaryCard title="Total Income" value="₹8,45,000" />

        <SummaryCard title="Total Expenses" value="₹3,25,000" />
      </div>
    </div>
  );
}

/* ================================================= */
/* INFO ROW */
/* ================================================= */

function InfoRow({
  label,
  value,
  valueClass = "text-slate-900",
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0">
      <span className="text-sm text-slate-500">{label}</span>

      <span className={`text-sm font-medium ${valueClass}`}>{value}</span>
    </div>
  );
}

/* ================================================= */
/* SUMMARY CARD */
/* ================================================= */

function SummaryCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>

      <p className="mt-2 text-xl font-bold text-slate-900">{value}</p>
    </div>
  );
}
