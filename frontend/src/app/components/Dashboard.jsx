'use client';

import { useState, useEffect } from 'react';
import api from '../api';

export default function Dashboard({ affiliate }) {
  const [clicks, setClicks] = useState([]);
  const [conversions, setConversions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!affiliate) return;
      
      try {
        setLoading(true);
        
        // Fetch clicks and conversions in parallel
        const [clicksResponse, conversionsResponse] = await Promise.all([
          api.getClicksByAffiliateId(affiliate.id),
          api.getConversionsByAffiliateId(affiliate.id)
        ]);
        
        setClicks(clicksResponse.data || []);
        setConversions(conversionsResponse.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [affiliate]);

  if (!affiliate) return null;
  if (loading) return <div className="text-center py-4">Loading data...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  // Calculate total revenue
  const totalRevenue = conversions.reduce((sum, conv) => sum + parseFloat(conv.amount), 0);
  
  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Dashboard for {affiliate.name}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-500">Total Clicks</h3>
            <p className="text-2xl font-bold">{clicks.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-green-500">Total Conversions</h3>
            <p className="text-2xl font-bold">{conversions.length}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-purple-500">Total Revenue</h3>
            <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-medium mb-3">Recent Conversions</h3>
          {conversions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Click ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Currency</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {conversions.map((conversion) => (
                    <tr key={conversion.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{conversion.click_id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{conversion.campaign_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{conversion.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{conversion.currency}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(conversion.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No conversions found.</p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">Recent Clicks</h3>
          {clicks.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Click ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {clicks.map((click) => (
                    <tr key={click.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{click.click_id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{click.campaign_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(click.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No clicks found.</p>
          )}
        </div>
      </div>
    </div>
  );
}