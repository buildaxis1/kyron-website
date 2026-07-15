import { NextResponse, type NextRequest } from "next/server";

// Security headers configuration
const securityHeaders = {
  "X-Frame-Options": "SAMEORIGIN",
  "Content-Security-Policy":
    "default-src 'self';" +
    "connect-src 'self' https://*.upstash.io https: wss:;" +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval';" +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;" +
    "font-src 'self' https://fonts.gstatic.com;" +
    "img-src 'self' data: https: http:;" +
    "media-src 'self' blob: data: https: http:;" +
    "frame-src 'self';" +
    "worker-src 'self' blob:;",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
};

function applySecurityHeaders(response: NextResponse) {
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

// No authentication — all routes are public. This middleware only applies
// security headers to responses.
export default function middleware(_req: NextRequest) {
  return applySecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
