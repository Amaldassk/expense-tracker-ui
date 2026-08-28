import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";

import { useAppContext } from "../context/AppContext";

export default function Layout() {
  const { sidebarOpen } = useAppContext();

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />

      <div
        className={`
          min-h-screen
          transition-all
          duration-300
          ${sidebarOpen ? "ml-64" : "ml-20"}
        `}
      >
        <Header />

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
