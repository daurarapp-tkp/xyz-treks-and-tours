# XYZ Treks & Tours

Modern Nepal trekking and tour website starter built with Next.js and Supabase.

## Stack
- Next.js
- React
- TypeScript
- Supabase PostgreSQL/Auth
- Responsive CSS

## Local setup
```bash
npm install
cp .env.example .env.local
npm run dev
```

## Supabase
The migration in `supabase/migrations/001_xyz_treks.sql` creates the package, destination, booking, review, blog and admin tables. The connected Supabase project is `xcmyieefdpaaipngphym`.

After creating an Auth user, promote it with:
```sql
insert into public.xyz_admins(user_id,role) values('YOUR_AUTH_USER_UUID','admin') on conflict(user_id) do update set role='admin';
```

## Deployment
Recommended: GitHub → Vercel → Cloudflare/domain. Add the Supabase environment variables from `.env.example` to Vercel.

Demo content and imagery should be replaced with the final company content before launch.
