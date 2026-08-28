import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Budgets from "./pages/Budgets";
import Transactions from "./pages/Transactions";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ==========================================
            PUBLIC ROUTE
        ========================================== */}

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ==========================================
            PROTECTED ROUTES
        ========================================== */}

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/budgets" element={<Budgets />} />

            <Route path="/transactions" element={<Transactions />} />

            <Route path="/reports" element={<Reports />} />

            <Route path="/profile" element={<Profile />} />

            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        {/* ==========================================
            DEFAULT ROUTE
        ========================================== */}

        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* ==========================================
            404
        ========================================== */}

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
