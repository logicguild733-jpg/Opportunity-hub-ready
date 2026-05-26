import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./Login";
import DashboardLayout from "./DashboardLayout";
import Opportunities from "./pages/Opportunities";

// SAFE PAGE COMPONENT
function Page({ name }: { name: string }) {
  return <h1>{name} Page ✅</h1>;
}

export default function App() {
  return (
    <Routes>

      {/* LOGIN */}
      <Route path="/login" element={<Login />} />

      {/* DASHBOARD */}
      <Route path="/dashboard/*" element={<DashboardLayout />}>

        {/* DEFAULT */}
        <Route index element={<Page name="Dashboard" />} />

        {/* MAIN PAGES */}
        <Route path="skills" element={<Page name="Skills" />} />

        {/* OPPORTUNITIES PAGE */}
        <Route path="opportunities" element={<Opportunities />} />

        <Route path="reseller" element={<Page name="Reseller" />} />

        {/* NEW PAGES */}
        <Route path="contact" element={<Page name="Contact" />} />
        <Route path="referral" element={<Page name="Referral" />} />
        <Route path="admin" element={<Page name="Admin" />} />

      </Route>

      {/* DEFAULT REDIRECT */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  );
}
