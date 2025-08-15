"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";

// Hooks
import { useHeaderShadowOnScroll } from "@/hooks/useHeaderShadowOnScroll";

// Components
import {
  BookmarkFilledIcon,
  BriefcaseIcon,
  PaperPlaneIcon,
} from "@/components/shared/icons";
import LinkWithProgress from "@/components/shared/LinkWithProgress";
import NavbarLoadingState from "./NavLoadingState";
import AuthenticatedNav from "./AuthenticatedNav";
import UnauthenticatedNav from "./UnauthenticatedNav";

// 3rd party
import { useSession } from "next-auth/react";

// Constants
export const NAV_LINKS = [
  {
    href: "/jobs?page=1",
    matchPath: "/jobs",
    text: "Jobs",
    icon: <BriefcaseIcon />,
  },
  {
    href: "/jobs/saved",
    matchPath: "/jobs/saved",
    text: "Saved",
    icon: <BookmarkFilledIcon />,
  },
  {
    href: "/jobs/applied",
    matchPath: "/jobs/applied",
    text: "Applied",
    icon: <PaperPlaneIcon />,
  },
] as const;

interface NavLinkProps {
  linkPath: string;
  matchPath: string;
  text?: string;
  icon: React.ReactNode;
  onClick?: () => void;
  isMobile?: boolean;
}

export const NavLink = ({
  linkPath,
  matchPath,
  text,
  icon,
  onClick,
  isMobile = false,
}: NavLinkProps) => {
  const path = usePathname();
  const isActive = path === matchPath;

  const baseClasses = isMobile
    ? "w-full flex items-center px-4 py-2 rounded font-semibold text-lg"
    : "relative w-8 h-8 rounded-full";

  const activeClasses = isMobile
    ? "text-primary pointer-events-none"
    : "text-primary pointer-events-none";

  const iconClass = isMobile
    ? "mr-3"
    : "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";

  const inactiveClasses =
    "hover:text-primary hover:bg-dark dark:hover:bg-light";

  return (
    <LinkWithProgress
      href={linkPath}
      onClick={onClick}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
      aria-current={isActive ? "page" : undefined}
    >
      <span className={`${iconClass}`}>{icon}</span>
      {text}
    </LinkWithProgress>
  );
};

// ----- NAVBAR -----
export default function Navbar() {
  const navbarRef = useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const isHome = pathname === "/";

  useHeaderShadowOnScroll(navbarRef);

  if (status === "loading") return <NavbarLoadingState ref={navbarRef} />;
  if (session?.user.id)
    return (
      <AuthenticatedNav session={session} ref={navbarRef} isHome={isHome} />
    );
  return <UnauthenticatedNav ref={navbarRef} isHome={isHome} />;
}
