# STARCROSS — Digital Solutions & Cloud Architecture

> Enterprise-grade digital solutions agency platform engineered with Next.js 16 (App Router, Turbopack), Supabase (PostgreSQL with forced Row-Level Security), and Resend transactional email automation.

---

## 📖 Complete Documentation

For the full architectural blueprint, operational sequence diagrams, data models, security implementations, and end-to-end workflows, please refer to:

👉 **[System Architecture & Operational Workflows Document (ARCHITECTURE_AND_WORKFLOW.md)](./ARCHITECTURE_AND_WORKFLOW.md)**

---

## 🚀 Key Features

- **Public Brand Experience**: Modern, luxury dark-themed design with smooth Framer Motion micro-animations, dynamic services catalog, selected case studies, systems architects team directory, and categorized FAQ accordion.
- **Intake Pipeline**: Robust client scoping portal (`/booking`) featuring multi-service selection, character-counted project descriptions, honeypot bot traps, IP rate limiting, and automated customer confirmation emails.
- **StarPanel Admin Portal**: Restricted control center (`/starcross-panel`) with real-time lead notification chime/modal, comprehensive lead management CRM, multi-status workflows (`pending` → `confirmed` → `completed` → `declined`), and multi-format report exports (Excel `.xlsx` and CSV).
- **Integrated Live CMS**: Full visual content management for Landing Hero copy, Services, Projects, Team roster, Client Testimonials, FAQ items, and Global Site Settings with integrated image cropping and Supabase Storage bucket uploads.
- **Zero-Trust Security**: Edge proxy route defense (`proxy.ts`), PostgreSQL Row-Level Security on all 8 tables, column-level security on pricing, and OWASP-recommended production HTTP security headers.
- **Privacy & Compliance**: GDPR/ePrivacy compliant Google Consent Mode v2 with reactive consent banner and zero-PII analytics tracking (GA4 + Vercel Analytics).

---

## 🛠️ Quick Start

### 1. Prerequisites
- Node.js 20+ or 22+
- npm, pnpm, or yarn
- Supabase Project & Resend API Account

### 2. Environment Configuration
Copy the sample environment file:
```bash
cp .env.local.example .env.local
```
Fill in your Supabase credentials, Resend API key, and `ADMIN_EMAIL`.

### 3. Run Development Server
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🧪 Verification & Testing Suites

All 5 test suites can be run locally to verify platform integrity:

```bash
# 1. Database Row-Level Security (RLS) Policy Verification
npm run test:rls

# 2. Public Routes, Security Headers, Honeypot & Form Validation
npx tsx scripts/e2e-qa-test.ts

# 3. Authenticated Admin Dashboard, Bookings CRUD, Export & CMS
npx tsx scripts/test-admin-e2e.ts

# 4. Interactive Google Chrome Browser QA (Playwright)
npx tsx scripts/browser-qa-suite.ts

# 5. Multi-Viewport Responsive Layout Audit (320px to 2560px)
npx tsx scripts/responsive-audit.ts

# 6. Static Analysis & Type Safety
npm run lint
npx tsc --noEmit
npm run build
```

---

## 📄 License
Private repository — Starcross Solutions. All rights reserved.
