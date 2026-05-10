import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./Login";
import DashboardLayout from "./layout/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Skills from "./pages/Skills";
import Leads from "./pages/Leads";
import Reseller from "./pages/Reseller";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Reffer from "./pages/Reffer";

export default function App() {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />

      {/* ALL SAAS PAGES WRAPPED IN LAYOUT */}
      <Route element={<DashboardLayout />}>

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/reseller" element={<Reseller />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/reffer" element={<Reffer />} />

      </Route>

    </Routes>
  );
}
