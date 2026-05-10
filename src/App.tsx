import { Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Home OK</div>} />
      <Route path="/login" element={<div>Login OK</div>} />
      <Route path="/dashboard" element={<div>Dashboard OK</div>} />
    </Routes>
  );
}
