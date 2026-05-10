export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <h1 className="text-2xl font-bold">
        Opportunity Hub Dashboard 🚀
      </h1>

      <p className="text-gray-500">
        Welcome back — your platform is active
      </p>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4 mt-6">

        <div className="p-4 border rounded">
          <h2 className="font-semibold">Today Leads</h2>
          <p className="text-2xl">12</p>
        </div>

        <div className="p-4 border rounded">
          <h2 className="font-semibold">Active Users</h2>
          <p className="text-2xl">1</p>
        </div>

        <div className="p-4 border rounded">
          <h2 className="font-semibold">Revenue</h2>
          <p className="text-2xl">$0</p>
        </div>

      </div>

      {/* LEADS SECTION */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3">
          Latest Leads
        </h2>

        <div className="space-y-2">
          <div className="p-3 border rounded">
            Quran Teacher needed for online classes (UK)
          </div>

          <div className="p-3 border rounded">
            Arabic Tutor required (UAE)
          </div>

          <div className="p-3 border rounded">
            Business Coach freelance project (USA)
          </div>
        </div>
      </div>

    </div>
  );
}
