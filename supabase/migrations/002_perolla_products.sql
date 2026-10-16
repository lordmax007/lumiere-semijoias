create table if not exists perolla_products (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  preco numeric(10,2) not null,
  descricao text,
  categoria text not null,
  imagens text[] default '{}',
  disponivel boolean not null default true,
  created_at timestamptz default now()
);

alter table perolla_products enable row level security;

create policy "public read" on perolla_products
  for select using (true);

create policy "admin write" on perolla_products
  for all using (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );
