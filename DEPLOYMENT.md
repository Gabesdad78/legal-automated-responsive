# 🚀 Deployment Guide - Legal Automated Responsive

Complete guide to deploy your legal automation app to Vercel with Supabase backend.

## 📋 Prerequisites

- GitHub account
- Vercel account
- Supabase account
- Node.js 18+ installed locally

## 🔧 Step 1: Supabase Setup

### 1.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `legal-automated-responsive`
   - **Database Password**: Generate a strong password
   - **Region**: Choose closest to your users
5. Click "Create new project"

### 1.2 Configure Database

1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Copy the entire contents of `supabase-setup.sql`
4. Paste and execute the script
5. Verify tables are created in **Table Editor**

### 1.3 Get API Keys

1. Go to **Settings** → **API**
2. Copy your **Project URL** and **anon public key**
3. Save these for environment variables

### 1.4 Configure Storage

1. Go to **Storage** → **Buckets**
2. Verify the `documents` bucket was created
3. If not, create it manually:
   - **Name**: `documents`
   - **Public**: `false`

## 🔧 Step 2: Local Development Setup

### 2.1 Clone and Install

```bash
git clone https://github.com/Gabesdad78/legal-automated-responsive.git
cd legal-automated-responsive
npm install
```

### 2.2 Environment Configuration

```bash
cp env.example .env.local
```

Edit `.env.local`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_ENABLE_ADVANCED_AI=true
VITE_ENABLE_REAL_TIME_UPDATES=true
```

### 2.3 Test Locally

```bash
npm run dev
```

Visit `http://localhost:5173` and test:
- User registration/login
- Document upload
- AI analysis
- Response generation

## 🔧 Step 3: GitHub Setup

### 3.1 Push to GitHub

```bash
git add .
git commit -m "Initial commit - Legal automation app"
git push origin main
```

### 3.2 Verify Repository

1. Go to your GitHub repository
2. Verify all files are uploaded
3. Check that `.env.local` is in `.gitignore`

## 🔧 Step 4: Vercel Deployment

### 4.1 Connect Repository

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Select the repository

### 4.2 Configure Build Settings

Vercel should auto-detect the settings, but verify:

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 4.3 Environment Variables

Add these in Vercel dashboard:

| Variable | Value |
|----------|-------|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `VITE_ENABLE_ADVANCED_AI` | `true` |
| `VITE_ENABLE_REAL_TIME_UPDATES` | `true` |

### 4.4 Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Your app will be available at `https://your-app.vercel.app`

## 🔧 Step 5: Post-Deployment Setup

### 5.1 Test Deployment

1. Visit your Vercel URL
2. Test all features:
   - User registration
   - Document upload
   - AI analysis
   - Response generation

### 5.2 Configure Custom Domain (Optional)

1. Go to Vercel dashboard → **Settings** → **Domains**
2. Add your custom domain
3. Configure DNS records as instructed

### 5.3 Set Up Monitoring

1. **Vercel Analytics**: Enable in dashboard
2. **Error Tracking**: Consider Sentry integration
3. **Performance**: Monitor Core Web Vitals

## 🔧 Step 6: Production Optimization

### 6.1 Performance Optimization

1. **Enable Edge Functions** (if needed)
2. **Configure CDN**: Vercel handles this automatically
3. **Image Optimization**: Already configured in Vite

### 6.2 Security Hardening

1. **Environment Variables**: Ensure all secrets are in Vercel
2. **CORS**: Configure in Supabase if needed
3. **Rate Limiting**: Consider adding rate limits

### 6.3 Database Optimization

1. **Indexes**: Already created in setup script
2. **Connection Pooling**: Configure in Supabase
3. **Backup Strategy**: Enable automatic backups

## 🔧 Step 7: Maintenance

### 7.1 Regular Updates

```bash
# Update dependencies
npm update

# Check for security vulnerabilities
npm audit

# Update Supabase client
npm update @supabase/supabase-js
```

### 7.2 Monitoring

1. **Vercel Analytics**: Monitor performance
2. **Supabase Dashboard**: Monitor database usage
3. **Error Tracking**: Set up alerts

### 7.3 Backup Strategy

1. **Database**: Supabase automatic backups
2. **Code**: GitHub repository
3. **Environment**: Vercel environment variables

## 🚨 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Environment Variables
- Verify all variables are set in Vercel
- Check for typos in variable names
- Ensure no trailing spaces

#### Supabase Connection
- Verify project URL and anon key
- Check RLS policies are enabled
- Verify storage bucket exists

#### Performance Issues
- Enable Vercel Analytics
- Check bundle size in build logs
- Optimize images and assets

### Debug Commands

```bash
# Local development
npm run dev

# Build locally
npm run build

# Preview build
npm run preview

# Check bundle size
npm run build -- --analyze
```

## 📊 Performance Monitoring

### Key Metrics to Track

1. **Load Time**: < 3 seconds
2. **Time to Interactive**: < 5 seconds
3. **Core Web Vitals**: All green
4. **Error Rate**: < 1%

### Monitoring Tools

- **Vercel Analytics**: Built-in performance monitoring
- **Supabase Dashboard**: Database performance
- **Browser DevTools**: Real-time performance

## 🔒 Security Checklist

- [ ] Environment variables secured
- [ ] RLS policies enabled
- [ ] CORS configured
- [ ] Rate limiting implemented
- [ ] Audit logging enabled
- [ ] Regular security updates

## 📈 Scaling Considerations

### When to Scale

- **Users**: > 1000 active users
- **Documents**: > 10,000 documents
- **Analysis**: > 1000 analyses/day

### Scaling Options

1. **Vercel**: Automatic scaling
2. **Supabase**: Upgrade plan
3. **CDN**: Already included
4. **Caching**: Implement Redis if needed

## 🎯 Next Steps

1. **Set up monitoring** and alerts
2. **Configure backups** and disaster recovery
3. **Implement analytics** tracking
4. **Plan for scaling** as user base grows
5. **Regular security audits**

---

**Your legal automation app is now deployed and ready for production! 🚀**