
# Hotel ERP Landing Page

This is a Vite + React landing page for Hotel ERP.

## Local Development

Run `npm install` to install the dependencies.

Run `npm run dev` to start the development server.

## Vercel Deployment

Connect this folder to Vercel from GitHub. Vercel will use:

- Build command: `npm run build`
- Output directory: `dist`
- Framework preset: Vite

Set these environment variables in Vercel before deploying:

- `VITE_API_URL`: deployed backend URL, for example `https://api.yourdomain.com`
- `VITE_GOOGLE_CLIENT_ID`: Google OAuth client ID
- `VITE_RAZORPAY_KEY_ID`: Razorpay public key ID
- `VITE_SAAS_URL`: post-payment app URL

The backend in `../backend` is a separate Express/SQLite service and should be deployed separately from this static Vercel frontend.
