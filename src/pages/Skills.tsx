import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function Skills() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [selectedMain, setSelectedMain] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  async function fetchSkills() {
    const { data } = await supabase.from("skills").select("*");
    setData(data || []);
  }

  // LEVEL 1
  const mainCategories = [...new Set(data.map(i => i.name))];

  // LEVEL 2
  const categories = selectedMain
    ? [...new Set(
        data
          .filter(i => i.name === selectedMain)
          .map(i => i.category)
      )]
    : [];

  // LEVEL 3
  const subcategories =
    selectedMain && selectedCategory
      ? data
          .filter(
            i =>
              i.name === selectedMain &&
              i.category === selectedCategory
          )
          .map(i => i.subcategory)
      : [];

  return (
    <div className="min-h-screen bg-background">

      {/* HEADER */}
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-foreground">
            Skills
          </h1>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">

        {/* LEVEL 1 */}
        <div>
          <h2 className="text-lg font-semibold mb-3">
            Main Categories
          </h2>

          <div className="flex flex-wrap gap-2">
            {mainCategories.map((item, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelectedMain(item);
                  setSelectedCategory(null);
                }}
                className="px-4 py-2 bg-secondary rounded-lg hover:bg-primary hover:text-white transition"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* LEVEL 2 */}
        {selectedMain && (
          <div>
            <h2 className="text-lg font-semibold mb-3">
              Categories
            </h2>

            <div className="flex flex-wrap gap-2">
              {categories.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedCategory(item)}
                  className="px-4 py-2 bg-secondary rounded-lg hover:bg-primary hover:text-white transition"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* LEVEL 3 */}
        {selectedCategory && (
          <div>
            <h2 className="text-lg font-semibold mb-3">
              Subcategories
            </h2>

            <div className="flex flex-wrap gap-2">
              {subcategories.map((item, i) => (
                <div
                  key={i}
                  className="px-4 py-2 bg-card border rounded-lg"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
