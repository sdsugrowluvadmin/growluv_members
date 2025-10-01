# SDSU GrowLuv — Website & Members Directory

A lightweight site for SDSU GrowLuv with a public landing page and a read-only members directory.
Built with Next.js (App Router) + Supabase (Postgres + Auth) and deployed on Vercel.

## ✨ Features

  Landing page (/) with logo, tagline, and CTAs
  
  Members directory (/members)
  
  - Lists: Last Name · First Name · Points
  
  - Search by: last name / first name / redID (dropdown + input)
  
  - redID lookups keep IDs & emails private
  
  API: /api/search-redid (POST) — server route calling a Supabase RPC
  
  Global header with scalable logo (Next/Image) and sticky nav
  
  Simple, low-cost stack under ~$100/mo (Supabase free/low tier + Vercel free/low tier)

## 🧰 Tech Stack

Next.js 15 (App Router) + TypeScript

Tailwind CSS (utility classes for layout/spacing)

Supabase (Database + RPC)

Vercel (CI/CD + hosting)

## 🗂 Project Structure
    src/
      app/
        layout.tsx           # global HTML frame, header, footer, container
        page.tsx             # landing page (/)
        members/
          page.tsx           # members directory page (/members)
        api/
          search-redid/
            route.ts         # POST /api/search-redid (calls Supabase RPC)
      lib/
        supabase.ts          # getClient() wrapper for Supabase JS client
      app/redid-lookup.tsx   # client component for redID search UI
    
    public/
      sdsu-growluv-logo.png  # site logo (replace with your asset)

## 🗃 Database Expectations (Supabase)
Tables (example schema you’re using)

members (private, full record)
  - last_name (text)
  - first_name (text)
  - red_id (text, unique id users know)
  - status (text) — optional
  - sdsu_email (text) — optional
  - points (integer)

public_members (view) — exposes only the public columns:
  - last_name, first_name, points

RPC (search by redID)
search_by_redid(p_redid text) → returns last_name, first_name, points for an exact redID match.
  - This keeps redIDs off the public table but lets a member verify themselves.

## 🔎 Members Directory (How it Works)

src/app/members/page.tsx handles:
  - Parsing ?by=first|last|redid and ?q=<term>
  - Building the Supabase query against public_members for first/last searches
  - Showing the redID lookup when by=redid (client component below)

src/app/redid-lookup.tsx ('use client') calls /api/search-redid:
  - POST with body: redid=... (application/x-www-form-urlencoded)
  - Displays Name + Points or an error (“No match found.”)

### Maintainers:
    Khoi Tran
    Sophia Phung
    Katelyn Nguyen
