"use client";

import { useState } from "react";

interface EmailCollectionFormProps {
  onClose: () => void;
  onSuccess?: (email: string) => void;
  redirectUrl?: string;
}

export default function EmailCollectionForm({
  onClose,
  onSuccess,
  redirectUrl,
}: EmailCollectionFormProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function getEmail() {
    return email;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Call success handler if provided
      if (onSuccess) {
        onSuccess(email);
        console.log("Email submitted:", email);
      } else {
        // Default behavior
        alert("Thank you for submitting!");
        onClose();
      }
    } catch (error: unknown) {
      console.error("Error submitting:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Rest of component unchanged
  // Add the return statement with JSX
  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-oid="w_9ux.h">
      <div data-oid="pp5a32b">
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium"
          data-oid="lr6:wv6"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
          placeholder="your@email.com"
          data-oid="ni1.qio"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        disabled={isSubmitting}
        data-oid="m1vcx-u"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
