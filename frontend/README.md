# All4Vets - Empowering Veterans Through Medical Advocacy

A professional nonprofit website dedicated to helping veterans navigate benefits, healthcare, and life transitions.

## 🌟 Live Site

Visit: [https://all4vets.us](https://all4vets.us)

## 📋 Features

- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Blog Section** - Resources and insights for veterans
- **Reviews Page** - Success stories and testimonials
- **Donation Module** - Ready for Stripe integration
- **Mission & Impact** - Clear communication of organizational goals
- **3-Step Process** - Simple guide for veterans seeking help

## 🎨 Design

- **Colors**: Patriotic theme with Red, White, Blue, and Gold accents
- **Accessibility**: WCAG AA compliant
- **Modern UI**: Built with React and Shadcn UI components
- **Professional**: Agency-quality design

## 🚀 Technology Stack

- **Frontend**: React 19
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI, Radix UI
- **Icons**: Lucide React
- **Routing**: React Router v7
- **Deployment**: GitHub Pages

## 💻 Local Development

```bash
# Install dependencies
cd frontend
yarn install

# Start development server
yarn start

# Build for production
yarn build
```

## 🌐 Deployment

Deploy to GitHub Pages:

```bash
yarn deploy
```

See [GITHUB_PAGES_DEPLOYMENT.md](../GITHUB_PAGES_DEPLOYMENT.md) for detailed instructions.

## 📦 Project Structure

```
frontend/
├── public/
│   ├── logo.png          # All4Vets logo
│   ├── index.html        # HTML template
│   └── .nojekyll         # GitHub Pages config
├── src/
│   ├── components/       # Reusable components
│   │   ├── ui/          # Shadcn UI components
│   │   ├── Header.jsx   # Navigation header
│   │   └── Footer.jsx   # Site footer
│   ├── pages/           # Page components
│   │   ├── Home.jsx     # Landing page
│   │   ├── Blog.jsx     # Blog listing
│   │   └── Reviews.jsx  # Testimonials
│   ├── mock.js          # Mock data
│   ├── App.js           # Main app component
│   └── index.css        # Global styles
└── package.json         # Dependencies
```

## 🔧 Configuration

- **Homepage**: Set in `package.json`
- **Routing**: Configured in `App.js` with basename `/All4Vets`
- **Build**: Uses Craco for custom React config

## 📝 Future Enhancements

- [ ] Stripe payment integration for real donations
- [ ] SendGrid for thank-you emails
- [ ] Database for blog and reviews management
- [ ] Admin panel for content management
- [ ] Contact form with email integration
- [ ] Newsletter subscription backend

## 🤝 Contributing

This is a nonprofit website. Contributions are welcome!

## 📄 License

© 2026 All4Vets. All rights reserved.

## 🙏 Support

All4Vets is a 501(c)(3) nonprofit organization dedicated to empowering veterans through medical advocacy.

---

**Note**: Current version uses mock data for demonstration. Backend integration pending.
