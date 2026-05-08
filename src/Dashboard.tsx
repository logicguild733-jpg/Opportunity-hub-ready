import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        navigate("/login");
        return;
      }

      setUser(data.user);
      setLoading(false);
    };

    load();
  }, [navigate]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Welcome, {user.email} 👋
      </h1>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Your Leads</h2>

        <ul className="mt-4 space-y-2">
          <li className="p-3 border rounded">Lead system will come next</li>
        </ul>
      </div>
    </div>
  );
}
