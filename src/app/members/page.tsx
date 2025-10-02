import { getClient } from '@/lib/supabase';
import RedIdLookup from '@/app/redid-lookup';

export const dynamic = 'force-dynamic';

type Params = { q?: string; by?: 'first' | 'last' | 'redid' };

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Params>;
}) {
  const params = await searchParams;
  const by = (params.by ?? 'last') as Params['by'];
  const q  = (params.q  ?? '').trim();

  const supabase = getClient();

  // Build table query (only meaningful when by !== 'redid')
  let query = supabase
    .from('public_members')
    .select('last_name,first_name,points')
    .order('last_name')
    .order('first_name')
    .limit(200);

  if (q && by !== 'redid') {
    if (by === 'first') {
      query = query.ilike('first_name', `%${q}%`);
    } else { // 'last'
      query = query.ilike('last_name', `%${q}%`);
    }
  }

  const { data, error } = await query;

  return (
    <div>
      {/* HERO */}
      <section className="relative">
        <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gluv-ink">
            GrowLuv Members
          </h1>
          <section className="mb-6">
            <div className="rounded-xl border bg-white p-5">
              <h2 className="text-lg font-semibold tracking-tight">Membership Basics</h2>
              <p className="mt-2 text-sm text-slate-700">
                To be recognized as an <span className="font-medium">Active Member</span> and be eligible for benefits
                like scholarships and awards, you’ll need to accrue <span className="font-semibold">15 points</span> during the year.
              </p>
          
              <div className="mt-4">
                <h3 className="text-sm font-semibold">How to earn points</h3>
                <ul className="mt-2 list-disc pl-5 text-sm text-slate-700 space-y-1">
                  <li><span className="font-medium">+1 point</span> for each GBM (General Body Meeting) attended.</li>
                  <li><span className="font-medium">Events:</span> points <span className="italic">TBD</span> and announced per event.</li>
                  <li>
                    <span className="font-medium">+1 point</span> for posting the official flyer <span className="font-medium">and</span> attending the event.
                    <span className="ml-1 text-slate-600">No point is awarded for posting only.</span>
                  </li>
                </ul>
              </div>
          
              <p className="mt-4 text-sm text-slate-700">
                That being said, <span className="font-semibold">everyone is welcome</span> at GrowLuv—come learn, connect, and get involved!
              </p>
            </div>
          </section>
          <p className="mt-2 text-gluv-ink/70">
            Search by name or RedID
          </p>

          {/* Search bar with dropdown */}
          <form className="mt-6 max-w-2xl" method="GET">
            <div className="grid grid-cols-[140px_1fr_auto] gap-3 items-center">
              <select
                name="by"
                defaultValue={by}
                className="bg-white border border-gluv-blue/20 rounded-xl px-3 py-2"
              >
                <option value="last">Last name</option>
                <option value="first">First name</option>
                <option value="redid">redID</option>
              </select>

              <input
                name="q"
                defaultValue={q}
                placeholder={
                  by === 'redid'
                    ? 'Enter redID (exact)'
                    : by === 'first'
                      ? 'Search by first name…'
                      : 'Search by last name…'
                }
                className="bg-white border border-gluv-blue/20 rounded-xl px-3 py-2"
              />

              <button
                className="rounded-xl px-4 py-2 bg-gluv-blue text-white hover:bg-gluv-blue2"
                type="submit"
              >
                Search
              </button>
            </div>

            {/* helper links */}
            {q && (
              <div className="mt-2 text-sm">
                <a href="/" className="text-gluv-ink/60 hover:text-gluv-ink">Clear</a>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* RESULTS */}
      <section className="mx-auto max-w-5xl px-4 pb-12">
        {/* When 'redid', show the lookup card (client-side RPC) */}
        {by === 'redid' ? (
          <div className="max-w-xl">
            <RedIdLookup initialRedId={q} />
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gluv-blue/20 bg-white shadow-soft">
            <table className="w-full text-sm">
              <thead className="bg-gluv-bg">
                <tr className="text-gluv-ink">
                  <th className="text-left p-3">Last Name</th>
                  <th className="text-left p-3">First Name</th>
                  <th className="text-right p-3">Points</th>
                </tr>
              </thead>
              <tbody>
                {error && <tr><td className="p-3" colSpan={3}>Error loading members.</td></tr>}
                {data?.map((r, i) => (
                  <tr key={`${r.last_name}-${r.first_name}-${i}`} className="border-t border-gluv-blue/10 hover:bg-gluv-bg">
                    <td className="p-3">{r.last_name}</td>
                    <td className="p-3">{r.first_name}</td>
                    <td className="p-3 text-right font-semibold text-gluv-ink">{r.points}</td>
                  </tr>
                ))}
                {!error && (!data || data.length === 0) && (
                  <tr><td className="p-3" colSpan={3}>No results.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
