"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-muted md:h-10 md:w-10">
        <div className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-muted md:h-10 md:w-10"
      data-oid="f4mkc.i"
    >
      <div className="relative h-5 w-5">
        {/* Moon icon (shown in light theme) */}
        <svg
          viewBox="0 0 24 24"
          className={`absolute inset-0 h-5 w-5 stroke-current transition-all duration-500 ease-in-out ${
            theme === "dark" 
              ? "rotate-180 opacity-0 scale-0" 
              : "rotate-0 opacity-100 scale-100"
          }`}
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>

        {/* Sun icon (shown in dark theme) */}
        <svg
          viewBox="0 0 24 24"
          className={`absolute inset-0 h-5 w-5 stroke-current transition-all duration-500 ease-in-out ${
            theme === "dark" 
              ? "rotate-0 opacity-100 scale-100" 
              : "-rotate-180 opacity-0 scale-0"
          }`}
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      </div>
    </button>
  );
};

export default ThemeToggler;
