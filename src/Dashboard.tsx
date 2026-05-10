import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    loadUser();
  }, []);

  if (!user) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Welcome, {user.email} 👋
      </h1>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Dashboard</h2>

        <p className="mt-2 text-gray-500">
          Your Opportunity Hub is now active 🚀
        </p>
      </div>
    </div>
  );
}
