"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

interface AnchorLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function AnchorLink({
  href,
  children,
  className,
  onClick,
}: AnchorLinkProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // Extract anchor from href
    const anchor = href.split("#")[1];

    if (pathname === "/") {
      // We're already on home page, just scroll to anchor
      if (anchor) {
        const element = document.getElementById(anchor);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      // We're on a different page, navigate to home and then scroll
      if (anchor) {
        router.push(`/#${anchor}`);

        // Wait for navigation to complete, then scroll
        setTimeout(() => {
          const element = document.getElementById(anchor);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        router.push(href);
      }
    }

    if (onClick) {
      onClick();
    }
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
