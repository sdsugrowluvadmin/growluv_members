'use client';

import { useEffect, useState } from 'react';

type Row = { last_name: string; first_name: string; points: number };

export default function RedIdLookup({ initialRedId = '' }: { initialRedId?: string }) {
  const [redid, setRedid] = useState(initialRedId);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Row | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { setResult(null); setError(null); }, [redid]);

  const run = async (value: string) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/search-redid', {
        method: 'POST',
        body: new URLSearchParams({ redid: value }),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      const json = await res.json();
      if (!json.ok) setError(json.error || 'Lookup failed');
      else if (Array.isArray(json.results) && json.results.length > 0) setResult(json.results[0] as Row);
      else setError('No match found.');
    } catch {
      setError('Lookup failed');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = redid.trim();
    if (v) run(v);
  };

  return (
    <div className="bg-white border border-gluv-blue/20 rounded-xl p-4 shadow-soft">
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          value={redid}
          onChange={(e) => setRedid(e.target.value)}
          placeholder="Enter your redID"
          className="border border-gluv-blue/20 rounded-lg px-3 py-2 flex-1 focus:ring-2 focus:ring-gluv-blue/40 outline-none"
        />
        <button
          className="rounded-lg px-4 py-2 bg-gluv-blue text-white hover:bg-gluv-blue2 disabled:opacity-50"
          disabled={loading || !redid.trim()}
        >
          {loading ? 'Searching…' : 'Search'}
        </button>
      </form>

      <div className="mt-3 text-sm">
        {error && <div className="text-red-600">{error}</div>}
        {result && (
          <div className="rounded-lg border border-gluv-blue/10 bg-gluv-bg p-3">
            <div><span className="font-medium">Name:</span> {result.first_name} {result.last_name}</div>
            <div><span className="font-medium">Points:</span> {result.points}</div>
          </div>
        )}
      </div>
    </div>
  );
}
