"use client";

import { Suspense } from "react";
import EmailCollectionForm from "@/app/_components/EmailCollectionForm";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

function RedirectPageInner() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  // Validate URL against allowed hostnames
  const allowedHostnames = [
    "kyronmedical.com",
    "www.kyronmedical.com",
    "demo.kyronmedical.com",
    "infinx.kyronmedical.com",
    "tang.kyronmedical.com",
    "cvs.kyronmedical.com",
    "sflpremiersurgery.kyronmedical.com",
    "zurology.kyronmedical.com",
  ];

  const isValidUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      return allowedHostnames.includes(urlObj.hostname);
    } catch {
      return false;
    }
  };

  // Redirect after email submission
  if (emailSubmitted && url && isValidUrl(url)) {
    window.location.href = url;
    return (
      <div className="py-20 text-center text-foreground" data-oid="4er9og5">
        Redirecting you now...
      </div>
    );
  }

  // If no URL provided or invalid URL, show error
  if (!url || !isValidUrl(url)) {
    return (
      <div className="container py-20 text-center" data-oid="lv1f3rx">
        <h1
          className="mb-4 text-2xl font-bold text-foreground"
          data-oid="f_g.-c-"
        >
          Invalid Resource Link
        </h1>
        <p className="text-foreground" data-oid="dd851wr">
          {!url
            ? "No destination URL was provided."
            : "The provided URL is not allowed."}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-md py-20" data-oid="u5r-91e">
      <div
        className="rounded-lg border border-border bg-card p-8 shadow-lg"
        data-oid="jj2t1zc"
      >
        <h1
          className="mb-6 text-2xl font-bold text-foreground"
          data-oid="t421du7"
        >
          Access This Resource
        </h1>
        <p className="mb-6 text-foreground" data-oid="k1jw70m">
          Please provide your email to access this exclusive resource.
        </p>

        <EmailCollectionForm
          onSuccess={() => setEmailSubmitted(true)}
          onClose={() => isValidUrl(url) && (window.location.href = url)} // Skip if user cancels
          redirectUrl={url}
          data-oid="c:hyi0u"
        />

        <button
          onClick={() => isValidUrl(url) && (window.location.href = url)}
          className="mt-4 w-full text-center text-sm text-muted-foreground hover:text-foreground hover:underline"
          data-oid="5rpqv-8"
        >
          Skip and continue to resource
        </button>
      </div>
    </div>
  );
}

export default function RedirectPage() {
  return (
    <Suspense data-oid="9.il_y-">
      <RedirectPageInner data-oid="aqo80vi" />
    </Suspense>
  );
}
