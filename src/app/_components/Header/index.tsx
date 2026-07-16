"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import AnchorLink from "../ui/anchor-link";
import GetStarted from "../ui/started-button";
import menuData from "./menuData";
import ThemeToggler from "./ThemeToggler";

const ANNOUNCEMENT = {
  text: "HIPAA‑compliant voice AI for patient calls and payer calls.",
  cta: "Find out more",
  href: "/#how-it-works",
};

const QUICK_FILTERS = [
  { id: "eb", label: "Eligibility & Benefits", href: "/#how-it-works" },
  { id: "pa", label: "Prior Authorization", href: "/#how-it-works" },
  { id: "cs", label: "Claim Status", href: "/#how-it-works" },
  { id: "da", label: "Denial Appeals", href: "/#how-it-works" },
];

export default function Header() {
  const pathname = usePathname();

  // Fixed top bar state
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [isStuck, setIsStuck] = useState(false);

  // Measure top bar height so we can offset content with a spacer
  const topbarRef = useRef<HTMLDivElement | null>(null);
  const [topbarH, setTopbarH] = useState(80);

  useEffect(() => {
    const onScroll = () => setIsStuck(window.scrollY >= 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const measure = () => {
      setTopbarH(topbarRef.current?.offsetHeight ?? 80);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Close mobile menu when clicking outside and prevent body scroll
  useEffect(() => {
    if (navbarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.removeProperty("overflow");
    }

    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [navbarOpen]);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (index: number) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    // Delay closing to allow moving cursor into dropdown
    hoverTimeoutRef.current = setTimeout(() => {
      setHoverIndex(null);
    }, 150);
  };

  const handleDropdownEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  const handleDropdownLeave = () => {
    setHoverIndex(null);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const isActive = (path?: string) => {
    if (!path) return false;
    if (path === "/") return pathname === "/";
    return pathname === path || pathname?.startsWith(path);
  };

  const showExtras = useMemo(
    () => pathname === "/" || pathname === "",
    [pathname],
  );

  return (
    <>
      {/* Fixed topbar only (compact, non-blocking) */}
      <div
        ref={topbarRef}
        className={`fixed left-0 top-0 z-[100] w-full border-b border-border/20 bg-background/80 backdrop-blur-md transition-all duration-300 ${
          isStuck ? "border-border/40 shadow-lg" : "shadow-sm"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Brand */}
          <Link href="/" className="relative block h-12 w-[190px] shrink-0">
            <Image
              src="/images/logo/kyron_medical.png"
              alt="Kyron Medical"
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex xl:gap-10">
            {menuData.map((menuItem, index) => {
              const active = isActive(menuItem.path);
              const hasSub = !!menuItem.submenu?.length;
              const isResources = menuItem.title === "Resources";

              return (
                <div
                  key={menuItem.id}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  {menuItem.path ? (
                    menuItem.path.includes("#") ? (
                      <AnchorLink
                        href={menuItem.path}
                        className={`text-[15px] font-medium transition-colors duration-200 hover:text-[#577DE8] ${
                          active ? "text-[#577DE8]" : "text-foreground"
                        }`}
                      >
                        {menuItem.title}
                      </AnchorLink>
                    ) : (
                      <Link
                        href={menuItem.path}
                        className={`text-[15px] font-medium transition-colors duration-200 hover:text-[#577DE8] ${
                          active ? "text-[#577DE8]" : "text-foreground"
                        }`}
                      >
                        {menuItem.title}
                      </Link>
                    )
                  ) : (
                    <button
                      className="flex items-center gap-1 text-[15px] font-medium text-foreground transition-colors duration-200 hover:text-[#577DE8]"
                      onClick={() =>
                        setHoverIndex((v) => (v === index ? null : index))
                      }
                    >
                      {menuItem.title}
                    </button>
                  )}

                  {/* Resources dropdown (kyron compact style) */}
                  {hasSub && isResources && hoverIndex === index && (
                    <div
                      className="absolute right-0 top-full w-44 rounded-xl border border-border/60 bg-background p-2 shadow-lg"
                      onMouseEnter={handleDropdownEnter}
                      onMouseLeave={handleDropdownLeave}
                    >
                      {menuItem.submenu!.map((s) => (
                        <Link
                          key={s.id}
                          href={s.path!}
                          className={`block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted/50 hover:text-primary ${
                            isActive(s.path)
                              ? "text-[#577DE8]"
                              : "text-muted-foreground"
                          }`}
                        >
                          {s.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right stack (desktop) */}
          <div className="hidden items-center gap-4 lg:flex">
            <ThemeToggler />
            <GetStarted />
          </div>

          {/* Hamburger (mobile) */}
          <button
            onClick={() => setNavbarOpen((s) => !s)}
            aria-label={navbarOpen ? "Close menu" : "Open menu"}
            className="relative flex h-10 w-10 flex-col items-center justify-center space-y-1 rounded-lg transition-colors hover:bg-muted/50 lg:hidden"
          >
            <span
              className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${
                navbarOpen ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${
                navbarOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${
                navbarOpen ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile drawer (below top row) */}
        <div
          className={`lg:hidden ${
            navbarOpen ? "block" : "hidden"
          } border-t border-border/60 bg-background/95 backdrop-blur`}
        >
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            {/* Navigation Links */}
            <nav className="mb-6">
              <ul className="space-y-1">
                {menuData.map((menuItem) => (
                  <li key={menuItem.id}>
                    {menuItem.path ? (
                      menuItem.path.includes("#") ? (
                        <AnchorLink
                          href={menuItem.path}
                          className={`block rounded-lg px-3 py-2 text-base font-medium transition-colors hover:bg-muted/50 ${
                            isActive(menuItem.path)
                              ? "bg-[#577DE8]/10 text-[#577DE8]"
                              : "text-foreground"
                          }`}
                          onClick={() => setNavbarOpen(false)}
                        >
                          {menuItem.title}
                        </AnchorLink>
                      ) : (
                        <Link
                          href={menuItem.path}
                          className={`block rounded-lg px-3 py-2 text-base font-medium transition-colors hover:bg-muted/50 ${
                            isActive(menuItem.path)
                              ? "bg-[#577DE8]/10 text-[#577DE8]"
                              : "text-foreground"
                          }`}
                          onClick={() => setNavbarOpen(false)}
                        >
                          {menuItem.title}
                        </Link>
                      )
                    ) : (
                      <details className="group">
                        <summary className="block cursor-pointer list-none rounded-lg px-3 py-2 text-base font-medium text-foreground hover:bg-muted/50">
                          {menuItem.title}
                          <svg
                            className="ml-2 inline h-3 w-3 transition-transform group-open:rotate-180"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </summary>
                        <div className="mt-1 space-y-1 pl-3">
                          {menuItem.submenu?.map((s) => (
                            <Link
                              key={s.id}
                              href={s.path!}
                              className={`block rounded-lg px-3 py-1.5 text-sm transition-colors hover:bg-muted/30 ${
                                isActive(s.path)
                                  ? "text-[#577DE8]"
                                  : "text-muted-foreground"
                              }`}
                              onClick={() => setNavbarOpen(false)}
                            >
                              {s.title}
                            </Link>
                          ))}
                        </div>
                      </details>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Auth Section */}
            <div className="space-y-4 border-t border-border/60 pt-6">
              {/* Theme Toggle */}
              <div className="flex justify-center py-2">
                <ThemeToggler />
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <div className="flex justify-center">
                  <GetStarted />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer so hero never hides under fixed bar */}
      <div style={{ height: topbarH + 8 }} aria-hidden />

      {/* Announcement + Filters now in normal flow (no overlap with hero) */}
      {showExtras && (
        <>
          <AnnouncementBar />
          <QuickFiltersBar />
          {/* Additional spacing after header bars */}
          <div className="h-4" aria-hidden />
        </>
      )}
    </>
  );
}

/* ----- Non-fixed bars (sit above hero, never overlap) ----- */

function AnnouncementBar() {
  return (
    <div className="w-full border-b border-border/80 bg-background/70 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
        <p className="text-sm text-muted-foreground">{ANNOUNCEMENT.text}</p>
        <AnchorLink
          href={ANNOUNCEMENT.href}
          onClick={() =>
            toast.info("Learn more", {
              description: "Explore Kyron's workflows and live preview.",
            })
          }
          className="inline-flex items-center gap-2 rounded-full bg-[#577DE8] px-3 py-1 text-xs font-semibold text-white transition hover:bg-blue-700"
        >
          {ANNOUNCEMENT.cta}
          <ArrowRight className="h-3.5 w-3.5" />
        </AnchorLink>
      </div>
    </div>
  );
}

function QuickFiltersBar() {
  return (
    <div className="w-full border-b border-border/80 bg-background/80 py-3">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {QUICK_FILTERS.map((f, i) => (
            <AnchorLink
              key={f.id}
              href={f.href}
              className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs transition ${
                i === 0
                  ? "border-[#577DE8] bg-[#577DE8]/20 text-[#577DE8]"
                  : "border-[#577DE8] bg-[#577DE8]/20 text-[#577DE8] hover:bg-[#577DE8]/40"
              }`}
            >
              {f.label}
            </AnchorLink>
          ))}
        </div>
      </div>
    </div>
  );
}
