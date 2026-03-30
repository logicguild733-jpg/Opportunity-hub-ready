import React, { useEffect, useState } from 'react';
import AppLayout from '../components/AppLayout';
import LeadCard from '../components/LeadCard';

type Lead = {
  title: string;
  description: string;
  link: string;
  tags?: string;
  isLocked?: boolean;
};

const HomePage: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch('/api/leads');
        const data: Lead[] = await res.json();
        setLeads(data);
      } catch (err) {
        console.error('Failed to fetch leads', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-4">Leads Dashboard</h1>
      {loading ? (
        <p>Loading leads...</p>
      ) : leads.length === 0 ? (
        <p>No leads available</p>
      ) : (
        leads.map((lead, idx) => <LeadCard key={idx} lead={lead} />)
      )}
    </AppLayout>
  );
};

export default HomePage;
