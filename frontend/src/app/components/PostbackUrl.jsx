'use client';

import { useEffect, useState } from 'react';
import api from '../api';

export default function PostbackUrl({ affiliate }) {
  const [copied, setCopied] = useState(false);

  // Inputs for building a final test URL
  const [clickIdInput, setClickIdInput] = useState('');
  const [amountInput, setAmountInput] = useState('');
  const [currencyInput, setCurrencyInput] = useState('USD');
  const [copiedFinal, setCopiedFinal] = useState(false);

  // Recent clicks for convenience
  const [recentClicks, setRecentClicks] = useState([]);
  const [loadingClicks, setLoadingClicks] = useState(false);

  useEffect(() => {
    if (!affiliate?.id) return;

    const loadClicks = async () => {
      try {
        setLoadingClicks(true);
        const res = await api.getClicksByAffiliateId(affiliate.id);
        const list = Array.isArray(res.data) ? res.data : [];
        setRecentClicks(list.slice(0, 5)); // show at most 5 recent clicks
      } catch (e) {
        setRecentClicks([]);
      } finally {
        setLoadingClicks(false);
      }
    };

    loadClicks();
  }, [affiliate?.id]);

  if (!affiliate) return null;

  const postbackUrl = api.getPostbackUrl(affiliate.id);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(postbackUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Build the final URL by replacing placeholders with input values
  const finalUrl = api
    .getPostbackUrl(affiliate.id)
    .replace('{click_id}', encodeURIComponent(clickIdInput || ''))
    .replace('{amount}', encodeURIComponent(amountInput || ''))
    .replace('{currency}', encodeURIComponent(currencyInput || ''));

  const copyFinalToClipboard = () => {
    navigator.clipboard.writeText(finalUrl);
    setCopiedFinal(true);
    setTimeout(() => setCopiedFinal(false), 2000);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Your Postback URL</h2>
      <p className="mb-2 text-sm text-gray-600">
        Share this URL with advertisers to track conversions. They should replace the placeholders with actual values.
      </p>
      <div className="bg-gray-50 p-4 rounded-lg mb-4 overflow-x-auto">
        <code className="text-sm break-all">{postbackUrl}</code>
      </div>
      <button
        onClick={copyToClipboard}
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
      >
        {copied ? 'Copied!' : 'Copy Template URL'}
      </button>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Parameter Description</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
          <li><strong>affiliate_id</strong>: Your unique affiliate ID ({affiliate.id})</li>
          <li><strong>click_id</strong>: The click identifier you sent to the /click endpoint (not the DB numeric id)</li>
          <li><strong>amount</strong>: The conversion amount (e.g., 100.00)</li>
          <li><strong>currency</strong>: The currency code (e.g., USD)</li>
        </ul>
      </div>

      {/* Builder form for a ready-to-copy final URL */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-3">Build a test conversion URL</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Click ID</label>
            <input
              type="text"
              value={clickIdInput}
              onChange={(e) => setClickIdInput(e.target.value)}
              placeholder="e.g. abc123"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
            <input
              type="number"
              step="0.01"
              value={amountInput}
              onChange={(e) => setAmountInput(e.target.value)}
              placeholder="e.g. 99.99"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
            <input
              type="text"
              value={currencyInput}
              onChange={(e) => setCurrencyInput(e.target.value)}
              placeholder="e.g. USD"
              className="w-full border rounded px-3 py-2 uppercase focus:outline-none focus:ring"
            />
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-2">Note: Make sure the click_id exists for this affiliate by tracking a click first.</p>

        {/* Recent clicks helper */}
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Recent Click IDs for this affiliate</h4>
          {loadingClicks ? (
            <p className="text-sm text-gray-500">Loading...</p>
          ) : recentClicks.length > 0 ? (
            <div className="space-y-2">
              {recentClicks.map((c) => (
                <div key={c.id} className="flex items-center justify-between bg-gray-50 rounded p-2">
                  <div className="text-sm">
                    <div><strong>click_id:</strong> <span className="font-mono">{c.click_id}</span></div>
                    <div className="text-xs text-gray-500">campaign: {c.campaign_name}</div>
                  </div>
                  <button
                    className="text-xs bg-gray-800 text-white px-2 py-1 rounded"
                    onClick={() => setClickIdInput(c.click_id)}
                  >
                    Use
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No clicks found. Track a click first (see flow below).</p>
          )}
        </div>

        <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto mt-4">
          <code className="text-sm break-all">{finalUrl}</code>
        </div>

        <div className="flex flex-wrap gap-3 mt-3">
          <button
            onClick={copyFinalToClipboard}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            {copiedFinal ? 'Copied!' : 'Copy Final URL'}
          </button>

          {/* Generate and track a random click id */}
          <button
            onClick={async () => {
              const randomClickId = `clk_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
              try {
                await api.trackClick({ affiliateId: affiliate.id, campaignId: 1, clickId: randomClickId });
                setClickIdInput(randomClickId);
                // refresh recent clicks
                const res = await api.getClicksByAffiliateId(affiliate.id);
                const list = Array.isArray(res.data) ? res.data : [];
                setRecentClicks(list.slice(0, 5));
              } catch (e) {
                console.error('Failed to track click', e);
              }
            }}
            className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Generate & Track Click
          </button>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium mb-2">Testing Flow (Step-by-step)</h3>
        <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-700">
          <li>
            Click "Generate & Track Click" to create a valid click_id automatically for this affiliate.
          </li>
          <li>
            The Click ID field will be filled; you can adjust amount and currency.
          </li>
          <li>
            Click "Copy Final URL" and paste in the browser to trigger the postback.
          </li>
        </ol>
      </div>
    </div>
  );
}
