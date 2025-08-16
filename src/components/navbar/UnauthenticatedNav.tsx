"use client";

import { forwardRef } from "react";
import { usePathname } from "next/navigation";

// components
import { SigninIcon } from "../shared/icons";
import LinkWithProgress from "@/components/shared/LinkWithProgress";
import ThemeSwitch from "@/components/navbar/ThemeSwitch";

interface UnauthenticatedNavProps {
  isHome: boolean;
}

const UnauthenticatedNav = forwardRef<HTMLDivElement, UnauthenticatedNavProps>(
  ({ isHome }, ref) => {
    const path = usePathname();
    const isSignin = path === "/sign-in";

    return (
      <div
        ref={ref}
        className="navbar-fixed fixed top-0 left-0 right-0 z-30 bg-light dark:bg-dark border-b w-full h-16 flex items-center justify-center"
      >
        <nav className="max-w-5xl w-full mx-auto px-4 flex items-center justify-between">
          <LinkWithProgress
            href="/"
            className={`${
              isHome ? "pointer-events-none" : ""
            } text-2xl font-extrabold text-primary hover:opacity-80 dark:hover:opacity-90 transition-opacity`}
          >
            Jooble
          </LinkWithProgress>

          <div className="flex items-center">
            <ThemeSwitch />
            <LinkWithProgress
              href="/sign-in"
              className={`ml-4 px-3 py-1 flex items-center font-medium border hover:bg-dark dark:hover:bg-light transition-colors rounded ${
                isSignin ? "pointer-events-none" : ""
              }`}
            >
              <SigninIcon />
              <span className="ml-2">Sign in</span>
            </LinkWithProgress>
          </div>
        </nav>
      </div>
    );
  }
);

// ✅ Corrected displayName
UnauthenticatedNav.displayName = "UnauthenticatedNav";

export default UnauthenticatedNav;
