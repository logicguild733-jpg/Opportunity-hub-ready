import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../lib/supabase"; // ✅ fixed path

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    // simple routing (no roles yet)
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-96 space-y-4">

        <h1 className="text-2xl font-bold">
          Opportunity Hub
        </h1>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Sign in
        </button>

      </div>
    </div>
  );
}
