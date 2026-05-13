import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./Login";
import DashboardLayout from "./DashboardLayout";

// Pages
import Dashboard from "./pages/Dashboard";
import Skills from "./pages/Skills";
import Leads from "./pages/Leads";
import Reseller from "./pages/Reseller";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import Referral from "./pages/Referral"; // ✅ FIXED

// Policies
import PrivacyPolicy from "./pages/PrivacyPolicy";
import SubscriptionPolicy from "./pages/SubscriptionPolicy";

export default function App() {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />

      {/* DASHBOARD LAYOUT */}
      <Route path="/dashboard" element={<DashboardLayout />}>

        {/* MAIN DASHBOARD */}
        <Route index element={<Dashboard />} />

        {/* CORE PAGES */}
        <Route path="skills" element={<Skills />} />
        <Route path="leads" element={<Leads />} />
        <Route path="reseller" element={<Reseller />} />
        <Route path="admin" element={<Admin />} />
        <Route path="contact" element={<Contact />} />

        {/* ✅ FIXED */}
        <Route path="referral" element={<Referral />} />

        {/* POLICY PAGES */}
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="subscription-policy" element={<SubscriptionPolicy />} />

      </Route>

    </Routes>
  );
}
