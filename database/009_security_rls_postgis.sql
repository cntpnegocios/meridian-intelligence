-- Migration: 009_security_rls_postgis.sql
-- Fix Supabase Security Advisory: RLS Disabled in Public for PostGIS tables
-- spatial_ref_sys is owned by supabase_admin (PostGIS extension table)
-- We cannot enable RLS directly, but we can revoke PostgREST access

-- Option 1: Revoke anon/authenticated access to PostGIS system tables
-- (they don't need to be exposed via the REST API)
REVOKE SELECT ON public.spatial_ref_sys FROM anon;
REVOKE SELECT ON public.spatial_ref_sys FROM authenticated;

-- Confirm the views are also not directly accessible
REVOKE SELECT ON public.geography_columns FROM anon;
REVOKE SELECT ON public.geography_columns FROM authenticated;
REVOKE SELECT ON public.geometry_columns FROM anon;
REVOKE SELECT ON public.geometry_columns FROM authenticated;
