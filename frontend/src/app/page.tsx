'use client';

import { useState } from 'react';
import AffiliateSelector from './components/AffiliateSelector';
import Dashboard from './components/Dashboard';
import PostbackUrl from './components/PostbackUrl';

export default function Home() {
  const [selectedAffiliate, setSelectedAffiliate] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Affiliate Postback System</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {!selectedAffiliate ? (
          <AffiliateSelector onSelectAffiliate={setSelectedAffiliate} />
        ) : (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Welcome, {selectedAffiliate.name}</h2>
              <button
                onClick={() => setSelectedAffiliate(null)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition-colors"
              >
                Switch Affiliate
              </button>
            </div>
            
            <PostbackUrl affiliate={selectedAffiliate} />
            <Dashboard affiliate={selectedAffiliate} />
          </div>
        )}
      </main>
      <footer className="py-6 text-center text-gray-500 text-sm">
        <p>© 2023 Affiliate Postback System</p>
      </footer>
    </div>
  );
}
