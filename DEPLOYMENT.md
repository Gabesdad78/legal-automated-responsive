# Deploying to Vercel

## Quick Setup

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"

## Configuration

- ✅ `vercel.json` configured for SPA routing
- ✅ Build command: `npm run build`
- ✅ Output directory: `dist`
- ✅ Framework: Vite (auto-detected)

## Environment Variables (Optional)

If you add a real backend later, set these in Vercel dashboard:
- `VITE_API_URL`: Your backend API URL
- `VITE_SUPABASE_URL`: If using Supabase
- `VITE_SUPABASE_ANON_KEY`: If using Supabase

## Custom Domain (Optional)

In Vercel dashboard:
1. Go to your project
2. Settings → Domains
3. Add your custom domain
4. Follow DNS setup instructions

## Admin Access

Remember: Admin panel is hidden and only accessible via:
- Login as admin (admin@lawdefense.com/admin123)
- Navigate to URL with #admin-access-2024

Your app will be live at: `https://your-project-name.vercel.app`