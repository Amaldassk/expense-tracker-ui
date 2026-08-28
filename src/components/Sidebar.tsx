import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  ArrowLeftRight,
  WalletCards,
  BarChart3,
  Settings,
  Wallet,
} from "lucide-react";

import { useAppContext } from "../context/AppContext";

const menuItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Transactions",
    path: "/transactions",
    icon: ArrowLeftRight,
  },
  {
    label: "Budgets",
    path: "/budgets",
    icon: WalletCards,
  },
  {
    label: "Reports",
    path: "/reports",
    icon: BarChart3,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const { sidebarOpen } = useAppContext();

  return (
    <aside
      className={`
        fixed
        left-0
        top-0
        z-40
        h-screen
        bg-slate-950
        text-white
        transition-all
        duration-300
        ${sidebarOpen ? "w-64" : "w-20"}
      `}
    >
      {/* Logo */}

      <div className="flex h-16 items-center border-b border-slate-800 px-5">
        <Wallet className="h-7 w-7 text-indigo-400" />

        {sidebarOpen && (
          <span className="ml-3 text-lg font-semibold">Monetivo</span>
        )}
      </div>

      {/* Menu */}

      <nav className="mt-6 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                mb-2
                flex
                items-center
                rounded-lg
                px-3
                py-3
                text-sm
                transition
                ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }
                `
              }
            >
              <Icon className="h-5 w-5 shrink-0" />

              {sidebarOpen && <span className="ml-3">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
