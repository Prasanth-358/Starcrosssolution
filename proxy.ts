// ============================================================
// STARCROSS — Next.js Middleware
// Guards all /starcross-panel/** routes with Supabase Auth
// Also updates session cookies on every request
// ============================================================

import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const isAdminRoute = request.nextUrl.pathname.startsWith('/starcross-panel');
  const isAdminApiRoute = request.nextUrl.pathname.startsWith('/api/admin');
  const isLoginPage = request.nextUrl.pathname === '/starcross-panel';

  // For public routes, bypass Supabase Auth calls entirely for instant page transitions
  if (!isAdminRoute && !isAdminApiRoute) {
    return NextResponse.next();
  }

  // If Supabase credentials are not configured yet (e.g. initial setup), pass through safely
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your-project-ref')) {
    return NextResponse.next();
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const authHeader = request.headers.get('authorization');
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.substring(7).trim() : undefined;

  // Refresh session — MUST be called before any redirects
  const {
    data: { user },
  } = await supabase.auth.getUser(bearerToken);

  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim();
  const isAuthorizedAdmin = !!user && (!adminEmail || user.email?.toLowerCase().trim() === adminEmail);

  // 1. Edge protection for /api/admin/* endpoints
  if (isAdminApiRoute) {
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!isAuthorizedAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    return supabaseResponse;
  }

  const isAuthWhitelisted =
    isLoginPage || request.nextUrl.pathname === '/starcross-panel/reset-password';

  // 2. Protect admin UI routes: redirect unauthenticated or unauthorized users to login
  if (isAdminRoute && !isAuthWhitelisted) {
    if (!user) {
      const redirectUrl = new URL('/starcross-panel', request.url);
      redirectUrl.searchParams.set('redirected', '1');
      return NextResponse.redirect(redirectUrl);
    }
    if (!isAuthorizedAdmin) {
      const redirectUrl = new URL('/starcross-panel', request.url);
      redirectUrl.searchParams.set('error', 'forbidden');
      return NextResponse.redirect(redirectUrl);
    }
  }

  // 3. Redirect authorized authenticated users away from the login page to dashboard
  if (isLoginPage && isAuthorizedAdmin) {
    return NextResponse.redirect(
      new URL('/starcross-panel/dashboard', request.url)
    );
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public files (images, robots.txt, sitemap.xml, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)',
  ],
};
