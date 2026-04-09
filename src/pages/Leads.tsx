async function fetchLeads() {
  setLoading(true);
  setErrorMsg("");

  try {
    const res = await fetch("/api/leads");
    const data = await res.json();

    setLeads(data || []);
  } catch (err: any) {
    console.error("API error:", err.message);
    setLeads([]);
    setErrorMsg("Failed to fetch leads. Try again later.");
  } finally {
    setLoading(false);
  }
}
