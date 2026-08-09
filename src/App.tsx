import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

type Opportunity = {
  id: number;
  title: string;
};

function App() {
  const [data, setData] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("opportunities")
      .select("*");

    if (error) {
      console.error("Supabase error:", error);
      setError(error.message);
    } else {
      setData(data || []);
    }

    setLoading(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Opportunities</h1>

      {data.length === 0 ? (
        <p>No data found</p>
      ) : (
        data.map((item) => (
          <div key={item.id}>
            <h3>{item.title}</h3>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
