# Supabase Database Migrations

This directory contains the database schema definitions and SQL migrations for the Link Shortener application.

---

## 📁 Migration Files

* **`migrations/20260917_001_create_links_table.sql`** (Phase 2):
  - Creates the `public.links` table.
  - Sets up automated `updated_at` trigger.
  - Creates performance indexes on `user_id`, `short_code`, and `created_at`.
  - Enables Row Level Security (RLS) with user ownership policies.

---

## 🛠️ Applying Migrations to Supabase

### Option 1: Supabase Dashboard (Recommended for initial setup)
1. Open your [Supabase Project Dashboard](https://supabase.com/dashboard/project/jlgfvvzfzkaluphqeapa).
2. Navigate to **SQL Editor** from the left sidebar.
3. Click **New Query**.
4. Copy and paste the entire contents of [`migrations/20260917_001_create_links_table.sql`](./migrations/20260917_001_create_links_table.sql).
5. Click **Run** (or `Ctrl + Enter`).

### Option 2: Supabase CLI (if configured)
```bash
npx supabase db push
```

---

## 🔒 Security & RLS Overview

| Policy Name | Action | Target Role | Expression |
| :--- | :---: | :---: | :--- |
| `Users can view their own links` | `SELECT` | `authenticated` | `auth.uid() = user_id` |
| `Users can insert their own links` | `INSERT` | `authenticated` | `auth.uid() = user_id` |
| `Users can update their own links` | `UPDATE` | `authenticated` | `auth.uid() = user_id` |
| `Users can delete their own links` | `DELETE` | `authenticated` | `auth.uid() = user_id` |

> [!NOTE]
> Public redirect `SELECT` access will be configured in **Phase 5 (Public Redirect & Click Tracking)** with the minimum required permissions.
