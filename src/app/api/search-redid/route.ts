// src/app/api/search-redid/route.ts
import { NextResponse } from 'next/server';
import { getClient } from '@/lib/supabase';

export async function POST(req: Request) {
  const contentType = req.headers.get('content-type') || '';
  let redid = '';

  if (contentType.includes('application/x-www-form-urlencoded')) {
    const form = await req.formData();
    redid = (form.get('redid') || '').toString().trim();
  } else {
    const body = await req.json().catch(() => ({}));
    redid = (body.redid || '').toString().trim();
  }

  if (!redid) return NextResponse.json({ ok: false, error: 'Missing redID' }, { status: 400 });

  const supabase = getClient();
  const { data, error } = await supabase.rpc('search_by_redid', { p_redid: redid });

  if (error) return NextResponse.json({ ok: false, error: 'Lookup failed' }, { status: 500 });
  return NextResponse.json({ ok: true, results: data ?? [] });
}
