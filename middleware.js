import { NextResponse } from 'next/server';


export function middleware(request) {
  const path = request.nextUrl.pathname;

  // Define public and protected paths
  const publicPaths = ['/', '/login'];
  const protectedPaths = ['/data', '/home'];

  // Check if the current path is public or protected
  const isPublicPath = publicPaths.includes(path);
  const isProtectedPath = protectedPaths.includes(path);

  // Extract Bearer token from Authorization header
  const token = request.cookies.get('token')?.value || '';

  // Redirect logic
  if (isPublicPath && token) {
    // If the user is trying to access a public path and has a token, redirect to home
    return NextResponse.redirect(new URL('/home', request.nextUrl));
  }

  if (isProtectedPath && !token) {
    // If the user is trying to access a protected path without a token, redirect to login
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  // Continue with the normal flow for any other case
  return NextResponse.next();
}

// Matcher configuration for the middleware
export const config = {
  matcher: [
    '/login', // Public path
    '/', // Public path
    '/data', // Protected path
    '/home', // Protected path
  ],
};
