import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./Login";
import DashboardLayout from "./DashboardLayout";

// SAFE PAGE (no import crash)
function Page({ name }: { name: string }) {
  return <h1>{name} Page ✅</h1>;
}

export default function App() {
  return (
    <Routes>

      <Route path="/login" element={<Login />} />

      <Route path="/dashboard/*" element={<DashboardLayout />}>
        <Route index element={<Page name="Dashboard" />} />
        <Route path="skills" element={<Page name="Skills" />} />
        <Route path="leads" element={<Page name="Leads" />} />
        <Route path="reseller" element={<Page name="Reseller" />} />
        <Route path="admin" element={<Page name="Admin" />} />
        <Route path="contact" element={<Page name="Contact" />} />
        <Route path="referral" element={<Page name="Referral" />} />
        <Route path="privacy-policy" element={<Page name="Privacy Policy" />} />
        <Route path="subscription-policy" element={<Page name="Subscription Policy" />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  );
}
