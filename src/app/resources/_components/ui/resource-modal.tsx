"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import EmailCollectionForm from "@/app/_components/EmailCollectionForm";
import { z } from "zod";

interface ResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceUrl: string;
  resourceTitle?: string;
}

export default function ResourceModal({
  isOpen,
  onClose,
  resourceUrl,
  resourceTitle = "Exclusive Resource",
}: ResourceModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Add event to close on escape key
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleEmailSuccess = (_email: string) => {
    // Email collection API disabled in this build — no external request is made.
    // Redirect straight to the resource.
    window.location.href = resourceUrl;
  };

  if (!mounted || !isOpen) return null;

  // Find the modal root element
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot || !(modalRoot instanceof Element)) return null;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleBackdropClick}
      data-oid="l7b7ty_"
    >
      <div
        className="relative w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
        data-oid="5xsqgso"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Close"
          data-oid="2hz.mo-"
        >
          ✕
        </button>

        <h2
          className="mb-4 text-2xl font-bold text-foreground"
          data-oid="dl5bs60"
        >
          Access &ldquo;{resourceTitle}&rdquo;
        </h2>
        <p className="mb-6 text-foreground" data-oid="gui.8_f">
          Please provide your email to access this exclusive resource.
        </p>

        <EmailCollectionForm
          onSuccess={handleEmailSuccess}
          onClose={onClose}
          redirectUrl={resourceUrl}
          data-oid="niywl6b"
        />

        {/* <button 
                           onClick={() => window.location.href = resourceUrl}
                           className="mt-4 w-full text-center text-sm text-gray-500 hover:underline"
                          >
                           Skip and continue to resource
                          </button> */}
      </div>
    </div>,
    modalRoot,
  );
}
