import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase"; // ✅ FIXED PATH

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);

      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        navigate("/login");
        return;
      }

      setUser(data.user);
      setLoading(false);
    };

    checkUser();
  }, [navigate]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!user) {
    return <div className="p-6">Redirecting...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Welcome, {user.email} 👋
      </h1>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Your Leads</h2>

        <ul className="mt-4 space-y-2">
          <li className="p-3 border rounded">Sample Lead 1</li>
          <li className="p-3 border rounded">Sample Lead 2</li>
        </ul>
      </div>
    </div>
  );
}
