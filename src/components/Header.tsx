import { useEffect, useRef, useState } from "react";
import { Menu, Bell, ChevronDown, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAppContext } from "../context/AppContext";

export default function Header() {
  const { toggleSidebar, selectedMonth, setSelectedMonth } = useAppContext();

  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  /*
   * Close user popup when clicking outside
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /*
   * Navigate to profile
   */
  const handleProfile = () => {
    setUserMenuOpen(false);
    navigate("/profile");
  };

  /*
   * Logout
   */
  const handleLogout = () => {
    setUserMenuOpen(false);

    // TODO:
    // Clear authentication token here
    // localStorage.removeItem("token");

    console.log("Logout");

    navigate("/login");
  };

  return (
    <header
      className="
        sticky
        top-0
        z-30
        flex
        h-16
        items-center
        justify-between
        border-b
        border-slate-200
        bg-white
        px-6
      "
    >
      {/* ================================================= */}
      {/* LEFT SIDE */}
      {/* ================================================= */}

      <div className="flex items-center gap-4">
        {/* Sidebar Toggle */}
        <button
          type="button"
          onClick={toggleSidebar}
          className="
            rounded-lg
            p-2
            text-slate-600
            transition
            hover:bg-slate-100
            hover:text-slate-900
          "
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Page / App Title */}
        <div>
          <h2 className="font-semibold text-slate-800">Monetivo</h2>

          <p className="text-xs text-slate-500">Manage your finances</p>
        </div>
      </div>

      {/* ================================================= */}
      {/* RIGHT SIDE */}
      {/* ================================================= */}

      <div className="flex items-center gap-4">
        {/* ================================================= */}
        {/* MONTH SELECTOR */}
        {/* ================================================= */}

        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="
            rounded-lg
            border
            border-slate-200
            bg-white
            px-3
            py-2
            text-sm
            text-slate-700
            outline-none
            transition
            focus:border-indigo-500
            focus:ring-2
            focus:ring-indigo-100
          "
        >
          <option value="August">August</option>

          <option value="July">July</option>

          <option value="June">June</option>

          <option value="May">May</option>

          <option value="April">April</option>

          <option value="March">March</option>
        </select>

        {/* ================================================= */}
        {/* NOTIFICATION */}
        {/* ================================================= */}

        <button
          type="button"
          className="
            relative
            rounded-lg
            p-2
            text-slate-500
            transition
            hover:bg-slate-100
            hover:text-slate-700
          "
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />

          {/* Notification badge */}
          <span
            className="
              absolute
              right-1
              top-1
              h-2
              w-2
              rounded-full
              bg-red-500
            "
          />
        </button>

        {/* ================================================= */}
        {/* USER MENU */}
        {/* ================================================= */}

        <div ref={userMenuRef} className="relative">
          {/* User Button */}

          <button
            type="button"
            onClick={() => setUserMenuOpen((prev) => !prev)}
            className="
              flex
              items-center
              gap-2
              rounded-lg
              p-1.5
              transition
              hover:bg-slate-100
            "
            aria-expanded={userMenuOpen}
            aria-haspopup="menu"
          >
            {/* Avatar */}

            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                overflow-hidden
                rounded-full
                bg-indigo-100
                font-semibold
                text-indigo-600
              "
            >
              AD
            </div>

            {/* User Info */}

            <div className="hidden text-left sm:block">
              <p className="text-sm font-medium text-slate-800">Amal Das</p>

              <p className="text-xs text-slate-500">Personal</p>
            </div>

            {/* Arrow */}

            <ChevronDown
              className={`
                h-4
                w-4
                text-slate-400
                transition-transform
                duration-200
                ${userMenuOpen ? "rotate-180" : "rotate-0"}
              `}
            />
          </button>

          {/* ================================================= */}
          {/* USER POPUP */}
          {/* ================================================= */}

          <div
            role="menu"
            className={`
              absolute
              right-0
              top-14
              w-72
              origin-top-right
              rounded-xl
              border
              border-slate-200
              bg-white
              shadow-xl

              transition-all
              duration-200
              ease-out

              ${
                userMenuOpen
                  ? "translate-x-0 scale-100 opacity-100"
                  : "pointer-events-none translate-x-4 scale-95 opacity-0"
              }
            `}
          >
            {/* ================================================= */}
            {/* USER DETAILS */}
            {/* ================================================= */}

            <div className="border-b border-slate-100 p-4">
              <div className="flex items-center gap-3">
                {/* Large Avatar */}

                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-full
                    bg-indigo-100
                    text-lg
                    font-semibold
                    text-indigo-600
                  "
                >
                  AD
                </div>

                {/* User Details */}

                <div className="min-w-0">
                  <p className="font-semibold text-slate-900">Amal Das</p>

                  <p className="truncate text-sm text-slate-500">
                    amal@example.com
                  </p>
                </div>
              </div>
            </div>

            {/* ================================================= */}
            {/* MENU ITEMS */}
            {/* ================================================= */}

            <div className="p-2">
              {/* View Profile */}

              <button
                type="button"
                onClick={handleProfile}
                role="menuitem"
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-lg
                  px-3
                  py-2.5
                  text-sm
                  text-slate-700
                  transition
                  hover:bg-slate-100
                "
              >
                <User className="h-5 w-5 text-slate-500" />

                <span>View Profile</span>
              </button>

              {/* Logout */}

              <button
                type="button"
                onClick={handleLogout}
                role="menuitem"
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-lg
                  px-3
                  py-2.5
                  text-sm
                  text-red-600
                  transition
                  hover:bg-red-50
                "
              >
                <LogOut className="h-5 w-5" />

                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
