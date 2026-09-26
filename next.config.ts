import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=()',
  },
  {
    // Content-Security-Policy: restricts what resources can be loaded.
    // Prevents XSS by limiting script/style/connect sources to known-good origins.
    //
    // 'unsafe-eval' is required in development only:
    //   - React dev tools reconstruct call stacks using eval()
    //   - Turbopack/webpack HMR uses eval-based source maps
    //   - React explicitly states it NEVER uses eval() in production
    //
    // In production this directive is omitted, keeping the CSP fully strict.
    key: 'Content-Security-Policy',
    value: [
      // Baseline
      "default-src 'self'",
      // Scripts: self + inline + eval (dev only) + known CDNs
      process.env.NODE_ENV === 'development'
        ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com"
        : "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com",
      // Styles: self + inline (required by Tailwind CSS + Next.js)
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Fonts: self + Google Fonts
      "font-src 'self' https://fonts.gstatic.com",
      // Images: self + Supabase storage + data URIs
      "img-src 'self' data: blob: https://*.supabase.co https://www.google-analytics.com",
      // Fetch/XHR: self + Supabase + Resend + Google Analytics + Turbopack HMR (dev)
      process.env.NODE_ENV === 'development'
        ? "connect-src 'self' ws://localhost:* wss://localhost:* https://*.supabase.co https://api.resend.com https://www.google-analytics.com https://analytics.google.com https://vitals.vercel-insights.com"
        : "connect-src 'self' https://*.supabase.co https://api.resend.com https://www.google-analytics.com https://analytics.google.com https://vitals.vercel-insights.com",
      // Frames: deny all (matches X-Frame-Options: DENY)
      "frame-ancestors 'none'",
      // Objects: deny all (Flash, Java applets)
      "object-src 'none'",
      // Base URI: restrict to self to prevent base tag hijacking
      "base-uri 'self'",
      // Form action: only submit to self
      "form-action 'self'",
    ].join('; '),
  },
];

// Additional headers applied only to admin panel routes
const adminRouteHeaders = [
  {
    key: 'X-Robots-Tag',
    value: 'noindex, nofollow',
  },
  {
    key: 'Cache-Control',
    value: 'no-store, no-cache, must-revalidate',
  },
];

const nextConfig: NextConfig = {
  compress: true,
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        // X-Robots-Tag for admin routes: HTTP-level noindex (stronger than meta tags)
        source: '/starcross-panel/:path*',
        headers: adminRouteHeaders,
      },
    ];
  },
};

export default nextConfig;
