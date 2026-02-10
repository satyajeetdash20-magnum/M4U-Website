# MentorSubhiMath Landing Page

## Project Overview

MentorSubhiMath is a conversion-focused Next.js landing page for SAT and IGCSE Math tutoring.  
The site includes a free consultation booking modal, lead magnet email capture, smooth-scroll navigation, mobile slide-in menu, and animated sections.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Deployment (Vercel)

1. Push this repository to GitHub.
2. Import the project into Vercel.
3. Keep default Next.js build settings.
4. Deploy the `main` branch (or your selected production branch).

## Environment Variables

Create a `.env.local` file with:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_sandbox_client_id
ADMIN_PANEL_PASSWORD=choose-a-strong-password
```

## E-Commerce Routes

- `/shop` - product landing page
- `/shop/[category]` - category listing
- `/shop/[category]/[slug]` - individual product page
- `/cart` - cart management
- `/checkout` - PayPal checkout
- `/checkout/success` - post-purchase confirmation
- `/resources/free` - free lead magnet resources
- `/admin` - simple password-protected admin panel

## Supabase Setup

1. Create a free Supabase project.
2. Run SQL from `supabase/schema.sql`.
3. Open `/admin`, login with `ADMIN_PANEL_PASSWORD`, and click `Sync sample products`.

## Payment Notes

- PayPal is configured for sandbox mode via `NEXT_PUBLIC_PAYPAL_CLIENT_ID`.
- On successful payment, an order is saved in Supabase and a placeholder email log is generated.
- Cart is persisted in `localStorage` and cleared after purchase.

## TODO

- Integrate email service (SendGrid/Mailchimp)
- Replace placeholder images with real photos
- Add blog section
- Integrate Calendly for booking
- Set up analytics (Google Analytics 4)
