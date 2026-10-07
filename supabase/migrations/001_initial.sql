-- ============================================================
-- Lumière Semijoias — Schema inicial
-- ============================================================

-- Extensão para UUID
create extension if not exists "uuid-ossp";

-- Perfis de usuário (complementa auth.users)
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  name text not null default '',
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz default now()
);

-- Coleções
create table collections (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  image text,
  description text,
  created_at timestamptz default now()
);

-- Produtos
create table products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text,
  price integer not null check (price >= 0),           -- centavos
  original_price integer check (original_price >= 0),  -- centavos
  images text[] default '{}',
  variants text[],
  collection_id uuid references collections(id) on delete set null,
  stock integer not null default 0 check (stock >= 0),
  active boolean not null default true,
  created_at timestamptz default now()
);

-- Pedidos
create table orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users on delete set null,
  status text not null default 'aguardando' check (status in ('aguardando', 'pago', 'enviado', 'cancelado')),
  total integer not null,
  customer jsonb not null,
  payment_url text,
  infinitepay_order_id text,
  created_at timestamptz default now()
);

-- Itens do pedido
create table order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  product_name text not null,
  price integer not null,
  qty integer not null check (qty > 0),
  variant text
);

-- ============================================================
-- RLS (Row Level Security)
-- ============================================================

alter table profiles enable row level security;
alter table collections enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

-- Profiles: usuário vê e edita só o próprio; admin vê todos
create policy "own profile" on profiles for all using (auth.uid() = id);
create policy "admin all profiles" on profiles for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Collections: leitura pública; escrita só admin
create policy "public read collections" on collections for select using (true);
create policy "admin write collections" on collections for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Products: leitura pública dos ativos; escrita só admin
create policy "public read active products" on products for select using (active = true);
create policy "admin all products" on products for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Orders: usuário vê/cria seus próprios; admin vê todos
create policy "own orders" on orders for all using (
  auth.uid() = user_id or
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Order items: herda via order
create policy "order items access" on order_items for all using (
  exists (
    select 1 from orders
    where orders.id = order_id and (
      orders.user_id = auth.uid() or
      exists (select 1 from profiles where id = auth.uid() and role = 'admin')
    )
  )
);

-- ============================================================
-- Auto-criar perfil ao registrar
-- ============================================================
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into profiles (id, name)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', ''));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();
