import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

type Lead = {
  title: string;
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const leads: Lead[] = [
    { title: "Sample Lead 1" },
    { title: "Sample Lead 2" },
  ];

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);

      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        navigate("/login");
        return;
      }

      setUser(data.user);
      setLoading(false);
    };

    loadUser();
  }, [navigate]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!user) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Welcome, {user.email} 👋
      </h1>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Your Leads</h2>

        {leads.length === 0 ? (
          <p className="mt-2 text-gray-500">No leads available</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {leads.map((lead, index) => (
              <li key={index} className="p-3 border rounded">
                {lead.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
