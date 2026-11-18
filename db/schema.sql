-- ─────────────────────────────────────────────────────────────
-- Sorci Digit — Schéma Neon Postgres (CMS)
-- À exécuter dans la console SQL Neon (ou psql). Idempotent.
-- Accès : uniquement côté serveur via DATABASE_URL.
-- ─────────────────────────────────────────────────────────────

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null default '',
  type text not null default 'web' check (type in ('web', 'mobile')),
  description text not null default '',
  category text default '',
  developer text default 'Sorci Digit',
  icon text default '',
  link text default '',
  rating text default '5.0',
  rating_count text default '0',
  technologies jsonb not null default '[]'::jsonb,
  screenshots jsonb not null default '[]'::jsonb,
  color text default 'bg-blue-50 text-blue-500',
  created_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  name text not null,
  username text default '',
  avatar_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_url text not null,
  alt text,
  link text,
  created_at timestamptz not null default now()
);

create table if not exists public.activities (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  excerpt text,
  image_url text,
  link text,
  published_at date,
  created_at timestamptz not null default now()
);
