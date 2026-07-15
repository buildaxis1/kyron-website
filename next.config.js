/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // helps tree-shake/optimize some packages
    optimizePackageImports: ["@lottiefiles/dotlottie-react"],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },

  async redirects() {
    return [
      { source: "/hiring/:path*", destination: "https://forms.gle/ce3hUp1KX2mUtKdU6", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self';" +
              "connect-src 'self' https://*.clerk.com https://*.clerk-frontend.com https://*.clerk-js.com https://*.clerk.accounts.dev https://*.clerk.dev https://*.upstash.io https://*.vapi.ai https://*.kyronmedical.com https://clerk.accounts.dev https://clerk.com https://clerk.dev http://127.0.0.1:5000 https: wss:;" +
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.clerk.com https://*.clerk-frontend.com https://*.clerk-js.com https://*.clerk.accounts.dev https://*.clerk.dev https://*.upstash.io https://*.vapi.ai https://*.kyronmedical.com https://clerk.accounts.dev https://clerk.com https://clerk.dev http://127.0.0.1:5000;" +
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;" +
              "font-src 'self' https://fonts.gstatic.com;" +
              "img-src 'self' data: https: http:;" +
              "frame-src https://*.clerk.com https://*.clerk-frontend.com https://*.clerk-js.com https://*.clerk.accounts.dev https://*.clerk.dev https://*.upstash.io https://*.vapi.ai https://*.kyronmedical.com https://clerk.accounts.dev https://clerk.com https://clerk.dev http://127.0.0.1:5000;" +
              "worker-src 'self' blob:;",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: process.env.CORS_ORIGIN_MAIN || "*",
          },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, OPTIONS" },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
          { key: "Access-Control-Allow-Credentials", value: "true" },
        ],
      },
      {
        source: "/lottie/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "bostonglobe-prod.cdn.arcpublishing.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "snworksceo.imgix.net",
        port: "",
      },
      {
        protocol: "https",
        hostname: "www.browndailyherald.com",
      },
      {
        protocol: "https",
        hostname: "americanbazaaronline.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "www.browndailyherald.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "medical.brown.edu",
        port: "",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "www.bostonglobe.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "scontent-lax3-2.xx.fbcdn.net",
        port: "",
      },
      {
        protocol: "https",
        hostname: "medicine.at.brown.edu",
        port: "",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "turnto10.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "8tg47xoyc4.ufs.sh",
        port: "",
      },
      {
        protocol: "https",
        hostname: "www.boston.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
    // domains: [
    //   "localhost",
    //   "bostonglobe-prod.cdn.arcpublishing.com",
    //   "snworksceo.imgix.net",
    //   "www.browndailyherald.com",
    //   "americanbazaaronline.com",
    //   "www.browndailyherald.com",
    //   "medical.brown.edu",
    //   "media.licdn.com",
    //   "encrypted-tbn0.gstatic.com",
    //   "www.bostonglobe.com",
    //   "scontent-lax3-2.xx.fbcdn.net",
    //   "medicine.at.brown.edu",
    //   "utfs.io",
    //   "turnto10.com",
    //   "8tg47xoyc4.ufs.sh",
    // ],
  },
};

module.exports = nextConfig;
