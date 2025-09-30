'use client';

import { useState } from 'react';

export default function RedIdLookup() {
  const [redid, setRedid] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] =
  useState<{ last_name: string; first_name: string; points: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/search-redid', {
        method: 'POST',
        body: new URLSearchParams({ redid }),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      const json = await res.json();
      if (!json.ok) setError(json.error || 'Lookup failed');
      else if (Array.isArray(json.results) && json.results.length > 0) setResult(json.results[0]);
      else setError('No match found.');
    } catch {
      setError('Lookup failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          value={redid}
          onChange={(e) => setRedid(e.target.value)}
          placeholder="Enter your redID"
          className="border rounded px-3 py-2 flex-1"
        />
        <button className="border rounded px-4 py-2" disabled={loading || !redid.trim()}>
          {loading ? 'Searching…' : 'Search'}
        </button>
      </form>

      <div className="mt-3">
        {error && <div className="text-red-600">{error}</div>}
        {result && (
          <div className="rounded border p-3">
            <div>
              <span className="font-medium">Name:</span>{' '}
              {result.first_name} {result.last_name}
            </div>
            <div><span className="font-medium">Points:</span> {result.points}</div>
          </div>
        )}
      </div>
    </div>
  );
}
