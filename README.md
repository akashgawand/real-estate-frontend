# Real Estate Platform - Frontend

Modern Next.js frontend with Tailwind CSS and Framer Motion animations.

## Features

- 🏠 Dynamic landing page with configurable sections
- 🖼️ Hero section with background images
- 🏢 Featured properties grid
- 🔄 Before/After transformation slider
- 💰 Interactive ROI estimator
- 🎪 Trust partner marquee (auto-scrolling)
- 📞 CTA section with WhatsApp integration
- 🔐 Secure admin panel
- 📱 Fully responsive design

## Setup

1. **Install dependencies:**

```bash
npm install
```

2. **Configure environment variables:**
   Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

3. **Start the development server:**

```bash
npm run dev
```

App will run on `http://localhost:3000`

## Project Structure

```
frontend/
├── app/
│   ├── admin/              # Admin panel pages
│   │   ├── dashboard/      # Dashboard with stats
│   │   ├── properties/     # Property management
│   │   ├── settings/       # Settings (placeholder)
│   │   ├── login/          # Admin login
│   │   └── layout.tsx      # Admin layout with sidebar
│   ├── page.tsx            # Landing page
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles
├── components/
│   ├── landing/            # Landing page sections
│   │   ├── HeroSection.tsx
│   │   ├── FeaturedProperties.tsx
│   │   ├── BeforeAfterSection.tsx
│   │   ├── ROIEstimator.tsx
│   │   ├── TrustMarquee.tsx
│   │   └── CTASection.tsx
│   └── ui/                 # Reusable UI components
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Card.tsx
│       ├── Modal.tsx
│       └── Loading.tsx
├── lib/
│   ├── api.ts              # Axios API client
│   └── auth.ts             # Authentication utilities
└── public/                 # Static assets
```

## Admin Panel

Access at: `http://localhost:3000/admin`

Default credentials (set in backend seed):

- **Email:** admin@example.com
- **Password:** admin123

### Admin Features

- **Dashboard:** Overview statistics and quick links
- **Properties:** Full CRUD operations for properties
  - Add/edit/delete properties
  - Toggle featured status
  - Manage images, pricing, details
- **Settings:** Placeholder for additional features

### Future Admin Features

The following admin pages can be added in `/app/admin/`:

- **Sections Management** - Reorder and toggle landing sections
- **Trust Partners** - Manage logos/text for marquee
- **Before/After** - Upload transformation images
- **ROI Config** - Configure property types and percentages
- **Hero Content** - Edit hero section text and image
- **CTA Section** - Update call-to-action content
- **Image Upload** - Direct R2 upload interface

## Landing Page

The landing page dynamically renders sections based on backend configuration:

1. **Hero Section** - Full-screen with background image
2. **Featured Properties** - Grid of property cards
3. **Before/After** - Plot transformation comparison
4. **ROI Estimator** - Interactive calculator
5. **Trust Marquee** - Scrolling partner logos/names
6. **CTA Section** - Contact and WhatsApp buttons

All content is fetched from the backend API and can be managed through the admin panel.

## Tech Stack

- **Next.js 16** - App Router
- **React 19** - Latest version
- **Tailwind CSS 4** - Utility-first CSS
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Axios** - HTTP client
- **react-compare-image** - Before/After slider
- **js-cookie** - Cookie management

## Build for Production

```bash
npm run build
npm start
```

## Notes

- Make sure the backend is running on `http://localhost:5000`
- Update `NEXT_PUBLIC_API_URL` if backend is on a different port
- All images should be uploaded to AWS R2 (not implemented in UI yet, use URLs)
- The platform is fully responsive and works on mobile/tablet/desktop
