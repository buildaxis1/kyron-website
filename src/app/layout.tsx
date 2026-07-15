import Footer from "@/app/_components/Footer";
import Header from "@/app/_components/Header";
import ScrollToTop from "@/app/_components/ScrollToTop";

import { Inter } from "next/font/google";
import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/global.css";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import type { Metadata, Viewport } from "next";
import { Providers } from "@/app/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kyron Medical",
  description:
    "Kyron provides a suite of proprietary AI agents to help your staff " +
    "automate your medical billing processes.",
  // other metadata
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className="overflow-x-hidden"
      data-oid="nmt3l9-"
    >
      {/*
                                       <head /> will contain the components returned by the nearest parent
                                                                   head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
                                                                  */}
      <head data-oid="i_h8-i.">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Guard: only run in browser where localStorage exists
                if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
                  return;
                }
                try {
                  var theme = localStorage.getItem('theme') || 'system';
                  var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  var finalTheme = theme === 'system' ? systemTheme : theme;
                  
                  if (finalTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  } else {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  // Fallback to system preference
                  var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  if (systemTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.add('light');
                  }
                }
              })();
            `,
          }}
          data-oid="na9elhh"
        />
      </head>

      <body
        className={`bg-background text-foreground ${inter.className} overflow-x-hidden`}
        data-oid="7-n5rze"
        suppressHydrationWarning
      >
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
          data-oid="nis9sxa"
        />

        <Providers data-oid="nfg8hci">
          <Header data-oid="p167ovv" />
          <main data-oid="vb:hlno">{children}</main>
          <Footer data-oid="dhf2-14" />
          <ScrollToTop data-oid="lp8rdn3" />
          <div
            id="modal-root"
            className="relative z-[10002]"
            data-oid="-xtjzp1"
          />
        </Providers>
      </body>
    </html>
  );
}
