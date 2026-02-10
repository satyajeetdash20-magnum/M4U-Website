create extension if not exists "pgcrypto";

create table if not exists products (
  id text primary key,
  title text not null,
  description text not null,
  price numeric(10, 2) not null check (price >= 0),
  original_price numeric(10, 2),
  category text not null,
  difficulty_tier text,
  product_type text not null,
  image_url text not null,
  pdf_url text,
  video_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  customer_email text not null,
  items_json jsonb not null,
  total_amount numeric(10, 2) not null check (total_amount >= 0),
  status text not null default 'paid',
  created_at timestamptz not null default now()
);

create table if not exists downloads (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id text not null references products(id),
  download_count integer not null default 0,
  last_downloaded_at timestamptz
);

create table if not exists free_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

create index if not exists idx_products_active on products(is_active);
create index if not exists idx_orders_created_at on orders(created_at desc);
create index if not exists idx_downloads_order_id on downloads(order_id);
create index if not exists idx_free_subscribers_email on free_subscribers(email);
