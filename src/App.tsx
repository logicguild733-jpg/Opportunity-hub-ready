import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./Login";
import DashboardLayout from "./DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Skills from "./pages/Skills";
import Leads from "./pages/Leads";
import Reseller from "./pages/Reseller";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import Referral from "./pages/Referral";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import SubscriptionPolicy from "./pages/SubscriptionPolicy";

export default function App() {
  return (
    <Routes>

      {/* LOGIN */}
      <Route path="/login" element={<Login />} />

      {/* DASHBOARD WRAPPER */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="skills" element={<Skills />} />
        <Route path="leads" element={<Leads />} />
        <Route path="reseller" element={<Reseller />} />
        <Route path="admin" element={<Admin />} />
        <Route path="contact" element={<Contact />} />
        <Route path="referral" element={<Referral />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="subscription-policy" element={<SubscriptionPolicy />} />
      </Route>

      {/* DEFAULT */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  );
}
