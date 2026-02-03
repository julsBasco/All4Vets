# GitHub Pages Deployment Guide for All4Vets

## Prerequisites
- GitHub account
- Git installed on your computer
- Node.js and Yarn installed

## Step 1: Create GitHub Repository

1. Go to GitHub (https://github.com)
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name it: `All4Vets` (must match exactly)
5. Keep it **Public** (GitHub Pages only works with public repos on free tier)
6. Do NOT initialize with README, .gitignore, or license
7. Click "Create repository"

## Step 2: Initialize Git and Push Code

Open terminal/command prompt in the `/app/frontend` directory and run:

```bash
cd /app/frontend

# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - All4Vets website"

# Add your GitHub repository as remote (replace 'julsbasco' with your username if different)
git remote add origin https://github.com/julsbasco/All4Vets.git

# Push to main branch
git branch -M main
git push -u origin main
```

## Step 3: Deploy to GitHub Pages

Still in the `/app/frontend` directory, run:

```bash
# This will build the site and deploy to gh-pages branch
yarn deploy
```

or 

```bash
npm run deploy
```

This command will:
1. Build the production version of your site
2. Create a `gh-pages` branch
3. Push the built files to that branch
4. GitHub will automatically serve it

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub: https://github.com/julsbasco/All4Vets
2. Click on "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select branch: `gh-pages`
5. Click "Save"

## Step 5: Access Your Site

Your site will be live at: **https://julsbasco.github.io/All4Vets/**

Note: It may take a few minutes for the site to go live after first deployment.

## Future Updates

Whenever you make changes to the website:

```bash
cd /app/frontend

# Make your changes, then:
git add .
git commit -m "Description of your changes"
git push origin main

# Deploy the updated site
yarn deploy
```

## Custom Domain (Optional)

If you want to use a custom domain like `www.all4vets.org`:

1. Create a file named `CNAME` in `/app/frontend/public/` with your domain:
   ```
   www.all4vets.org
   ```

2. In your domain registrar (GoDaddy, Namecheap, etc.), add these DNS records:
   - Type: `CNAME`
   - Name: `www`
   - Value: `julsbasco.github.io`

3. Redeploy: `yarn deploy`

4. In GitHub Settings → Pages → Custom domain, enter your domain and save

## Troubleshooting

### Site showing blank page
- Check browser console for errors
- Verify the `basename="/All4Vets"` is set correctly in App.js
- Clear browser cache

### 404 errors on page refresh
- This is normal for client-side routing on GitHub Pages
- Users can navigate using the menu without issues
- Refreshing on routes other than home may show 404 (a limitation of GitHub Pages)

### Images not loading
- Make sure all image paths start with `/` or use full URLs
- Logo is at `/logo.png` and will work correctly

### Build fails
- Run `yarn install` to ensure all dependencies are installed
- Check for any console errors during build

## Current Configuration

✅ Homepage: `https://julsbasco.github.io/All4Vets`
✅ Router basename: `/All4Vets`
✅ Deploy script: `yarn deploy`
✅ Build directory: `build`
✅ Jekyll disabled: `.nojekyll` file present

## Important Notes

- This is a **static site** - all functionality uses mock data
- Donation payments and email features are **frontend-only** (not connected to real services)
- To add backend features (Stripe, SendGrid), you'll need to:
  1. Host the backend separately (Heroku, AWS, Vercel, etc.)
  2. Update the API endpoints in the frontend
  3. Redeploy

## Contact

For questions or issues, refer to:
- GitHub Pages Documentation: https://docs.github.com/en/pages
- React Router Documentation: https://reactrouter.com
