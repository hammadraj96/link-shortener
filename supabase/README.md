# Supabase Database Migrations & Authentication Setup

This directory contains the database schema migrations and authentication configuration guides for the Link Shortener application.

---

## 📁 Migration Files

* **`migrations/20260917_001_create_links_table.sql`** (Phase 2):
  - Creates the `public.links` table.
  - Sets up automated `updated_at` trigger.
  - Creates performance indexes on `user_id`, `short_code`, and `created_at`.
  - Enables Row Level Security (RLS) with user ownership policies.

* **`migrations/20260917_002_create_profiles_table.sql`** (Phase 3):
  - Creates the `public.profiles` table with unique constraint on `user_id`.
  - Sets up automatic profile synchronization trigger (`handle_new_user()`) on `auth.users`.
  - Enables Row Level Security (RLS) ensuring users only have read/update access to their own profile (`auth.uid() = user_id`).

---

## 🛠️ Applying Migrations to Supabase

### Option 1: Supabase Dashboard SQL Editor (Recommended)
1. Open your [Supabase Project Dashboard](https://supabase.com/dashboard/project/jlgfvvzfzkaluphqeapa).
2. Navigate to **SQL Editor** in the left sidebar.
3. Run each migration file in order:
   - Run [`20260917_001_create_links_table.sql`](./migrations/20260917_001_create_links_table.sql)
   - Run [`20260917_002_create_profiles_table.sql`](./migrations/20260917_002_create_profiles_table.sql)

### Option 2: Supabase CLI
```bash
npx supabase db push
```

---

## 🔑 Google OAuth Setup Guide (Manual Configuration)

To enable Google OAuth in your Supabase project:

### Step 1: Google Cloud Console Configuration
1. Go to the [Google Cloud Console Credentials Page](https://console.cloud.google.com/apis/credentials).
2. Click **Create Credentials** > **OAuth client ID**.
3. Select Application type: **Web application**.
4. Set **Name**: `Link Shortener SaaS`.
5. Under **Authorized JavaScript origins**, add:
   - `http://localhost:3000` (for local development)
   - `https://<your-vercel-domain>.vercel.app` (for production)
6. Under **Authorized redirect URIs**, enter your Supabase Auth Callback URL:
   - `https://jlgfvvzfzkaluphqeapa.supabase.co/auth/v1/callback`
7. Click **Create** and copy your **Client ID** and **Client Secret**.

### Step 2: Supabase Dashboard Configuration
1. Go to your [Supabase Dashboard Authentication Providers](https://supabase.com/dashboard/project/jlgfvvzfzkaluphqeapa/auth/providers).
2. Locate **Google** in the provider list.
3. Toggle Google to **Enabled**.
4. Paste your **Client ID** and **Client Secret** obtained from Google Cloud Console.
5. Save changes.

---

## 🔒 Row Level Security (RLS) Policies

### `public.profiles`
| Policy Name | Action | Target Role | Condition |
| :--- | :---: | :---: | :--- |
| `Users can view their own profile` | `SELECT` | `authenticated` | `auth.uid() = user_id` |
| `Users can update their own profile` | `UPDATE` | `authenticated` | `auth.uid() = user_id` |

### `public.links`
| Policy Name | Action | Target Role | Condition |
| :--- | :---: | :---: | :--- |
| `Users can view their own links` | `SELECT` | `authenticated` | `auth.uid() = user_id` |
| `Users can insert their own links` | `INSERT` | `authenticated` | `auth.uid() = user_id` |
| `Users can update their own links` | `UPDATE` | `authenticated` | `auth.uid() = user_id` |
| `Users can delete their own links` | `DELETE` | `authenticated` | `auth.uid() = user_id` |
