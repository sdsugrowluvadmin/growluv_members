// src/app/page.tsx
import { getClient } from '@/lib/supabase';
import RedIdLookup from './redid-lookup';

export const dynamic = 'force-dynamic';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;              // ✅ await the promise
  const q = (params.q || '').trim();

  const supabase = getClient();
let query = supabase
  .from('public_members')
  .select('last_name,first_name,points')
  .order('last_name')
  .order('first_name')
  .limit(200);

if (q) {
  // Simple contains search across first OR last name
  query = query.or(`first_name.ilike.%${q}%,last_name.ilike.%${q}%`);
}


  const { data, error } = await query;

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">GrowLuv Members</h1>

      {/* Name search (submit via GET so ?q=... updates) */}
      <form className="mb-4" method="GET">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search by name…"
          className="border rounded px-3 py-2 w-full"
        />
      </form>

      <div className="overflow-x-auto border rounded">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left p-2">Last Name</th>
              <th className="text-left p-2">First Name</th>
              <th className="text-right p-2">Points</th>
            </tr>
          </thead>
          <tbody>
            {error && <tr><td className="p-2" colSpan={2}>Error loading members.</td></tr>}
            {data?.map((r, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">{r.last_name}</td>
                <td className="p-2">{r.first_name}</td>
                <td className="p-2 text-right">{r.points}</td>
              </tr>
            ))}
            {!error && (!data || data.length === 0) && (
              <tr><td className="p-2" colSpan={2}>No results.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <section className="mt-8">
        <h2 className="font-medium mb-2">Lookup by redID (exact)</h2>
        <RedIdLookup />
      </section>
    </main>
  );
}
