create table if not exists vessels (
  id uuid primary key,
  imo_number text unique,
  name text,
  flag text,
  vessel_type text,
  created_at timestamptz not null default now()
);

create table if not exists voyages (
  id uuid primary key,
  vessel_id uuid references vessels(id),
  external_project_id text,
  origin_port_unlocode text,
  destination_port_unlocode text,
  departure_at timestamptz,
  arrival_at timestamptz,
  status text not null default 'PLANNED',
  created_at timestamptz not null default now()
);

create table if not exists ais_observations (
  id uuid primary key,
  vessel_id uuid references vessels(id),
  observed_at timestamptz not null,
  latitude double precision not null,
  longitude double precision not null,
  sog_knots double precision,
  cog_degrees double precision,
  provider text not null,
  confidence text not null,
  ingestion_job_id text,
  created_at timestamptz not null default now()
);

create table if not exists evidence (
  id uuid primary key,
  source_url text not null,
  captured_at timestamptz not null,
  sha256 text not null,
  parser_name text,
  parser_version text,
  confidence text,
  created_at timestamptz not null default now()
);
