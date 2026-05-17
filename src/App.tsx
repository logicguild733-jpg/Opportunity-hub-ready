import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./Login";
import DashboardLayout from "./DashboardLayout";

// ✅ SAFE FALLBACK COMPONENT
function SafePage({ name }: { name: string }) {
  return <h1 style={{ color: "black" }}>{name} Page ✅</h1>;
}

export default function App() {
  return (
    <Routes>

      {/* LOGIN */}
      <Route path="/login" element={<Login />} />

      {/* DASHBOARD */}
      <Route path="/dashboard/*" element={<DashboardLayout />}>

        {/* DEFAULT */}
        <Route index element={<SafePage name="Dashboard" />} />

        {/* ALL PAGES SAFE (NO IMPORT CRASH) */}
        <Route path="skills" element={<SafePage name="Skills" />} />
        <Route path="leads" element={<SafePage name="Leads" />} />
        <Route path="reseller" element={<SafePage name="Reseller" />} />
        <Route path="admin" element={<SafePage name="Admin" />} />
        <Route path="contact" element={<SafePage name="Contact" />} />
        <Route path="referral" element={<SafePage name="Referral" />} />
        <Route path="privacy-policy" element={<SafePage name="Privacy Policy" />} />
        <Route path="subscription-policy" element={<SafePage name="Subscription Policy" />} />

      </Route>

      {/* DEFAULT */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  );
}
