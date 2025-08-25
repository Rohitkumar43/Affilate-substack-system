'use client';

import { useState, useEffect } from 'react';
import api from '../api';

export default function AffiliateSelector({ onSelectAffiliate }) {
  const [affiliates, setAffiliates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAffiliates = async () => {
      try {
        setLoading(true);
        const response = await api.getAffiliates();
        setAffiliates(response.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching affiliates:', err);
        setError('Failed to load affiliates. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAffiliates();
  }, []);

  if (loading) return <div className="text-center py-4">Loading affiliates...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Select Affiliate</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {affiliates.map((affiliate) => (
          <button
            key={affiliate.id}
            onClick={() => onSelectAffiliate(affiliate)}
            className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            {affiliate.name}
          </button>
        ))}
      </div>
      {affiliates.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          No affiliates found. Please initialize the database.
        </div>
      )}
    </div>
  );
}