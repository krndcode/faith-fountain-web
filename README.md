# Faith Fountain Foundation Website

A complete, production-quality website built for **Faith Fountain Foundation**, a Christian nonprofit foundation established in 2022, with head office in Canada and branches in Ghana.

> **Motto:** *"Faith in action. Hope for every life."*

---

## 1. Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom brand design tokens
- **Typography:** Lora (Editorial Serif Headings) & Lato (Clean Sans-Serif Body)
- **Icons:** Lucide React
- **Validation & Forms:** Zod, React Hook Form, `@hookform/resolvers`
- **Backend & Database:** Firebase Authentication, Cloud Firestore, Firebase Storage
- **Server-Side Operations:** Firebase Admin SDK, Next.js Route Handlers
- **Donation Processing:** PayPal Checkout (Server-side Orders & Capture verification)

---

## 2. Brand Identity & Color System

| Token | Hex Value | Application |
|---|---|---|
| **Growth Green** | `#078A12` | Primary buttons, active navigation, links, and highlights |
| **Forest Green** | `#073B17` | Major headings, top utility bar, dark footer, primary branding |
| **Warm Ivory** | `#F5F2E9` | Soft background sections, cards, and subtle contrast |
| **White** | `#FFFFFF` | Main page background, card surfaces, clean contrast |
| **Charcoal** | `#333B35` | High-readability body copy (WCAG AA compliant) |

---

## 3. Website Structure & Routes

### Public Pages
1. **Home:** `/` - Editorial hero, introduction, 5 programs, documented impact, future goals, get-involved, latest stories, call to action.
2. **About Us:** `/about` - Foundation story, mission, vision, and core values.
3. **Our Programs:** `/programs` - Overview of all 5 charitable programs.
   - **Education Support:** `/programs/education-support`
   - **Community Support:** `/programs/community-support`
   - **Support for Children in Care:** `/programs/children-in-care` (with child protection privacy safeguards)
   - **Hospital Bill Assistance:** `/programs/hospital-assistance` (with healthcare aid notice)
   - **Gospel and Outreach:** `/programs/gospel-outreach`
4. **Our Impact:** `/impact` - Documented activities since 2022, field photo gallery, and clearly separated future building goals.
5. **News & Stories:** `/news` - Published field stories and reports.
   - **Story Detail:** `/news/[slug]` - Dynamic article narrative.
6. **Get Involved:** `/get-involved` - 4 participation pathways (Donate Money, Donate Items, Volunteer, Partner), requested school supplies checklist, and inquiry form.
7. **Donate Online:** `/donate` - Multi-currency (CAD default, USD, EUR, GBP), suggested amounts, custom amount, server-verified PayPal checkout, and receipt state.
8. **Contact Us:** `/contact` - Official email, Ghana telephone lines, WhatsApp link, Canada & Ghana locations, Facebook link, and validated contact form.
9. **Privacy Policy:** `/privacy` - Child protection standards, minimal data collection, donor protection.
10. **Custom 404:** `/not-found` - Branded page not found with navigation shortcuts.

### Protected Administrator Dashboard (`/admin`)
- **Login:** `/admin/login` - Secure administrator sign in with setup instructions.
- **Overview:** `/admin` - Real-time statistics, integration status, quick actions.
- **News & Stories:** `/admin/stories` - View, publish, unpublish, and draft stories.
- **Write New Story:** `/admin/stories/new` - Rich story composer with automated slug generation.
- **Programs:** `/admin/programs` - Toggle program status and preview public pages.
- **Inquiries Inbox:** `/admin/inquiries` - View and manage contact and get-involved submissions.
- **Donation Records:** `/admin/donations` - Server-verified PayPal capture records.
- **Site Settings:** `/admin/settings` - Toggle PayPal sandbox/live mode, configure currencies.

### Secure Route Handlers
- `POST /api/paypal/create-order` - Validates amount and currency, invokes PayPal v2 Orders API.
- `POST /api/paypal/capture-order` - Captures payment on server, verifies status, prevents duplicates, saves minimal donation record to Firestore.
- `POST /api/contact` - Validates contact form with Zod, saves to Firestore `inquiries`.
- `POST /api/get-involved` - Validates participation form, saves to Firestore `inquiries`.

---

## 4. Setup & Running Locally

### Prerequisites
- Node.js `v18.18+` or `v20+` (tested on Node v24)
- npm `v9+` or `v10+`

### Installation
Clone or navigate to the workspace directory:
```bash
cd faith-fountain-web
npm install
```

### Environment Configuration
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in your credentials as described in the sections below.

### Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Type Checking & Building for Production
```bash
# Run TypeScript type check
npm run typecheck

# Build optimized production bundle
npm run build

# Start production server
npm start
```

---

## 5. Firebase Configuration Guide

### 1. Create a Firebase Project
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project: `faith-fountain-foundation`.
3. Disable Google Analytics or enable as desired.

### 2. Enable Authentication
1. Navigate to **Authentication** &rarr; **Get started**.
2. Under the **Sign-in method** tab, enable **Email/Password**.
3. Under the **Users** tab, click **Add User**:
   - Email: `faithfountain2022@gmail.com`
   - Set a strong administrator password.

### 3. Create Cloud Firestore
1. Navigate to **Firestore Database** &rarr; **Create database**.
2. Select your preferred server region (e.g., `northamerica-northeast1` or `us-central1`).
3. Deploy the included `firestore.rules` and `firestore.indexes.json` using Firebase CLI:
   ```bash
   firebase deploy --only firestore
   ```

### 4. Configure Firebase Storage
1. Navigate to **Storage** &rarr; **Get started**.
2. Deploy the included `storage.rules`:
   ```bash
   firebase deploy --only storage
   ```

### 5. Generate Firebase Admin Service Account Key
1. In Firebase Console, go to **Project Settings** (gear icon) &rarr; **Service accounts**.
2. Click **Generate new private key** and download the JSON file.
3. Copy `project_id`, `client_email`, and `private_key` into `.env.local`:
   ```env
   FIREBASE_ADMIN_PROJECT_ID="your-project-id"
   FIREBASE_ADMIN_CLIENT_EMAIL="firebase-adminsdk-...@...iam.gserviceaccount.com"
   FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   ```

---

## 6. PayPal Sandbox & Live Integration Guide

### 1. Obtain PayPal Credentials
1. Log into the [PayPal Developer Portal](https://developer.paypal.com/).
2. Navigate to **Apps & Credentials** &rarr; **Sandbox**.
3. Create a **REST API app** named `Faith Fountain Donations`.
4. Copy your **Client ID** and **Secret**:
   ```env
   NEXT_PUBLIC_PAYPAL_CLIENT_ID="your-sandbox-client-id"
   PAYPAL_CLIENT_SECRET="your-sandbox-client-secret"
   PAYPAL_MODE="sandbox"
   ```

### 2. Testing Sandbox Checkout
- Default test amounts are CAD $10, $25, $50, $100, $250 or custom.
- In sandbox mode, use PayPal sandbox personal buyer accounts generated in your PayPal Developer dashboard to complete test payments.
- When PayPal keys are not yet present in `.env.local`, an interactive **Sandbox Test Mode** button is provided on `/donate` to verify the order creation, capture, Firestore write, and receipt display workflow.

### 3. Moving to Production
1. Confirm supported currencies in your Canadian PayPal Business account.
2. In the PayPal Developer portal, create a **Live** REST API app.
3. Update `PAYPAL_MODE="live"`, `NEXT_PUBLIC_PAYPAL_CLIENT_ID`, and `PAYPAL_CLIENT_SECRET` in your secure production hosting environment variables.

---

## 7. Logo & Photograph Customization

All image asset paths are mapped in:
```
src/config/site-images.ts
```

### Static Asset Mapping
- **Foundation Logo:** `public/images/logo.svg`
- **Dark Background Logo:** `public/images/logo-white.svg`
- **Homepage Hero:** `public/images/hero-community.svg`
- **About Story:** `public/images/about-story.svg`
- **Education Support:** `public/images/program-education.svg`
- **Community Support:** `public/images/program-community.svg`
- **Children in Care:** `public/images/program-children.svg`
- **Hospital Assistance:** `public/images/program-hospital.svg`
- **Gospel Outreach:** `public/images/program-gospel.svg`
- **School Construction Goal:** `public/images/goal-school-construction.svg`
- **Small-Business Goal:** `public/images/goal-small-business.svg`
- **News Default:** `public/images/news-default.svg`

To replace any asset with real photography:
1. Place your PNG/JPG file into `public/images/` (e.g. `public/images/hero-community.jpg`).
2. Update the `src` attribute in `src/config/site-images.ts`.

---

## 8. Deployment Checklist

Before going live:
- [ ] Set `NEXT_PUBLIC_SITE_URL` to your production domain (e.g. `https://faithfountain.org`).
- [ ] Add Firebase web client variables to production environment.
- [ ] Add Firebase Admin private key and client email to server environment.
- [ ] Create the authorized administrator in Firebase Authentication.
- [ ] Verify PayPal sandbox checkout end-to-end.
- [ ] Switch `PAYPAL_MODE="live"` and add live PayPal credentials.
- [ ] Deploy `firestore.rules` and `storage.rules`.
- [ ] Replace SVG placeholder graphics with high-resolution foundation photographs.
