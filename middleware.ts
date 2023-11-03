import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublic = path === '/login' || path === '/register';

  const token = request.cookies.get('token')?.value || '';

  if (path.includes('/api') && !token) {
    return new NextResponse('Authentication Error', { status: 401 });
  }

  if (isPublic && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  if (!isPublic && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
}

export const config = {
  matcher: [
    '/settings',
    '/editor',
    '/login',
    '/register',
    '/api/user',
    '/api/articles/favorite',
    '/api/profiles/:path*',
  ],
};
