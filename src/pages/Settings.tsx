import {
  Bell,
  Check,
  ChevronDown,
  Globe,
  Lock,
  Moon,
  Palette,
  Save,
  Shield,
  Sun,
  User,
} from "lucide-react";

import { useState } from "react";

export default function Settings() {
  const [currency, setCurrency] = useState("INR");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");

  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");

  const [emailNotifications, setEmailNotifications] = useState(true);

  const [budgetAlerts, setBudgetAlerts] = useState(true);

  const [transactionNotifications, setTransactionNotifications] =
    useState(false);

  const [twoFactor, setTwoFactor] = useState(false);

  const handleSave = () => {
    console.log({
      currency,
      dateFormat,
      theme,
      emailNotifications,
      budgetAlerts,
      transactionNotifications,
      twoFactor,
    });
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* ================================================= */}
      {/* PAGE HEADER */}
      {/* ================================================= */}

      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your application preferences and account settings.
        </p>
      </div>

      {/* ================================================= */}
      {/* SETTINGS LAYOUT */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* ================================================= */}
        {/* SETTINGS SIDEBAR */}
        {/* ================================================= */}

        <div className="h-fit rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
          <SettingsMenu
            icon={<User className="h-4 w-4" />}
            label="General"
            active
          />

          <SettingsMenu
            icon={<Palette className="h-4 w-4" />}
            label="Appearance"
          />

          <SettingsMenu
            icon={<Bell className="h-4 w-4" />}
            label="Notifications"
          />

          <SettingsMenu
            icon={<Shield className="h-4 w-4" />}
            label="Security"
          />

          <SettingsMenu
            icon={<Globe className="h-4 w-4" />}
            label="Language & Region"
          />
        </div>

        {/* ================================================= */}
        {/* SETTINGS CONTENT */}
        {/* ================================================= */}

        <div className="space-y-6 lg:col-span-3">
          {/* ================================================= */}
          {/* GENERAL */}
          {/* ================================================= */}

          <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-5">
              <h2 className="font-semibold text-slate-900">General Settings</h2>

              <p className="mt-1 text-sm text-slate-500">
                Configure your basic application preferences.
              </p>
            </div>

            <div className="space-y-6 p-6">
              {/* Currency */}

              <SettingField
                label="Currency"
                description="Select the currency used throughout the application."
              >
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="
                    w-full
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    px-4
                    py-2.5
                    text-sm
                    text-slate-700
                    outline-none
                    transition
                    focus:border-indigo-500
                    focus:ring-2
                    focus:ring-indigo-100
                  "
                >
                  <option value="INR">Indian Rupee (₹)</option>

                  <option value="USD">US Dollar ($)</option>

                  <option value="EUR">Euro (€)</option>

                  <option value="GBP">British Pound (£)</option>
                </select>
              </SettingField>

              {/* Date format */}

              <SettingField
                label="Date Format"
                description="Choose how dates should be displayed."
              >
                <select
                  value={dateFormat}
                  onChange={(e) => setDateFormat(e.target.value)}
                  className="
                    w-full
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    px-4
                    py-2.5
                    text-sm
                    text-slate-700
                    outline-none
                    transition
                    focus:border-indigo-500
                    focus:ring-2
                    focus:ring-indigo-100
                  "
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>

                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>

                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </SettingField>
            </div>
          </section>

          {/* ================================================= */}
          {/* APPEARANCE */}
          {/* ================================================= */}

          <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-5">
              <h2 className="font-semibold text-slate-900">Appearance</h2>

              <p className="mt-1 text-sm text-slate-500">
                Customize how the application looks.
              </p>
            </div>

            <div className="p-6">
              <p className="mb-4 text-sm font-medium text-slate-700">Theme</p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {/* Light */}

                <ThemeOption
                  icon={<Sun className="h-5 w-5" />}
                  title="Light"
                  description="Light theme"
                  selected={theme === "light"}
                  onClick={() => setTheme("light")}
                />

                {/* Dark */}

                <ThemeOption
                  icon={<Moon className="h-5 w-5" />}
                  title="Dark"
                  description="Dark theme"
                  selected={theme === "dark"}
                  onClick={() => setTheme("dark")}
                />

                {/* System */}

                <ThemeOption
                  icon={<Palette className="h-5 w-5" />}
                  title="System"
                  description="Use system setting"
                  selected={theme === "system"}
                  onClick={() => setTheme("system")}
                />
              </div>
            </div>
          </section>

          {/* ================================================= */}
          {/* NOTIFICATIONS */}
          {/* ================================================= */}

          <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-5">
              <h2 className="font-semibold text-slate-900">Notifications</h2>

              <p className="mt-1 text-sm text-slate-500">
                Choose which notifications you want to receive.
              </p>
            </div>

            <div className="divide-y divide-slate-100">
              <ToggleSetting
                title="Email Notifications"
                description="Receive important updates through email."
                checked={emailNotifications}
                onChange={setEmailNotifications}
              />

              <ToggleSetting
                title="Budget Alerts"
                description="Get notified when you are close to exceeding a budget."
                checked={budgetAlerts}
                onChange={setBudgetAlerts}
              />

              <ToggleSetting
                title="Transaction Notifications"
                description="Receive notifications when transactions are added."
                checked={transactionNotifications}
                onChange={setTransactionNotifications}
              />
            </div>
          </section>

          {/* ================================================= */}
          {/* SECURITY */}
          {/* ================================================= */}

          <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <Lock className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">Security</h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Manage your account security.
                  </p>
                </div>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {/* Change password */}

              <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-800">Password</p>

                  <p className="mt-1 text-sm text-slate-500">
                    Change your account password.
                  </p>
                </div>

                <button
                  type="button"
                  className="
                    rounded-lg
                    border
                    border-slate-200
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-slate-700
                    transition
                    hover:bg-slate-50
                  "
                >
                  Change Password
                </button>
              </div>

              {/* Two factor */}

              <ToggleSetting
                title="Two-Factor Authentication"
                description="Add an extra layer of security to your account."
                checked={twoFactor}
                onChange={setTwoFactor}
              />
            </div>
          </section>

          {/* ================================================= */}
          {/* LANGUAGE & REGION */}
          {/* ================================================= */}

          <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-5">
              <h2 className="font-semibold text-slate-900">
                Language & Region
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Configure your language and regional preferences.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
              <SettingField
                label="Language"
                description="Application display language."
              >
                <select
                  defaultValue="en"
                  className="
                    w-full
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    px-4
                    py-2.5
                    text-sm
                    text-slate-700
                    outline-none
                    focus:border-indigo-500
                    focus:ring-2
                    focus:ring-indigo-100
                  "
                >
                  <option value="en">English</option>

                  <option value="ml">Malayalam</option>

                  <option value="hi">Hindi</option>
                </select>
              </SettingField>

              <SettingField
                label="Time Zone"
                description="Used for dates and transaction timestamps."
              >
                <select
                  defaultValue="Asia/Kolkata"
                  className="
                    w-full
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    px-4
                    py-2.5
                    text-sm
                    text-slate-700
                    outline-none
                    focus:border-indigo-500
                    focus:ring-2
                    focus:ring-indigo-100
                  "
                >
                  <option value="Asia/Kolkata">India Standard Time</option>

                  <option value="UTC">UTC</option>

                  <option value="America/New_York">Eastern Time</option>

                  <option value="Europe/London">London</option>
                </select>
              </SettingField>
            </div>
          </section>

          {/* ================================================= */}
          {/* SAVE */}
          {/* ================================================= */}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              className="
                flex
                items-center
                gap-2
                rounded-lg
                bg-indigo-600
                px-5
                py-2.5
                text-sm
                font-medium
                text-white
                shadow-sm
                transition
                hover:bg-indigo-700
              "
            >
              <Save className="h-4 w-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================= */
/* SETTINGS MENU */
/* ================================================= */

function SettingsMenu({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={`
        flex
        w-full
        items-center
        gap-3
        rounded-lg
        px-3
        py-2.5
        text-sm
        font-medium
        transition
        ${
          active
            ? "bg-indigo-50 text-indigo-600"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        }
      `}
    >
      {icon}

      {label}
    </button>
  );
}

/* ================================================= */
/* SETTING FIELD */
/* ================================================= */

function SettingField({
  label,
  description,
  children,
}: {
  label: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:items-center">
      <div>
        <p className="text-sm font-medium text-slate-800">{label}</p>

        <p className="mt-1 text-xs text-slate-500">{description}</p>
      </div>

      <div>{children}</div>
    </div>
  );
}

/* ================================================= */
/* TOGGLE */
/* ================================================= */

function ToggleSetting({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-6 py-5">
      <div>
        <p className="text-sm font-medium text-slate-800">{title}</p>

        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`
          relative
          h-6
          w-11
          shrink-0
          rounded-full
          transition
          ${checked ? "bg-indigo-600" : "bg-slate-200"}
        `}
      >
        <span
          className={`
            absolute
            top-0.5
            h-5
            w-5
            rounded-full
            bg-white
            shadow-sm
            transition
            ${checked ? "left-5" : "left-0.5"}
          `}
        />
      </button>
    </div>
  );
}

/* ================================================= */
/* THEME OPTION */
/* ================================================= */

function ThemeOption({
  icon,
  title,
  description,
  selected,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        relative
        rounded-xl
        border
        p-4
        text-left
        transition
        ${
          selected
            ? "border-indigo-500 bg-indigo-50"
            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
        }
      `}
    >
      {selected && (
        <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-white">
          <Check className="h-3 w-3" />
        </div>
      )}

      <div
        className={`
          mb-3
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-lg
          ${
            selected
              ? "bg-indigo-100 text-indigo-600"
              : "bg-slate-100 text-slate-500"
          }
        `}
      >
        {icon}
      </div>

      <p className="text-sm font-medium text-slate-800">{title}</p>

      <p className="mt-1 text-xs text-slate-500">{description}</p>
    </button>
  );
}
