"use client";

import { useTheme } from "@/app/ThemeProvider";
import { MoonIcon, SunIcon } from "@/components/shared/icons";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      onClick={toggleTheme}
      className="relative h-8 w-8 rounded-full hover:bg-dark dark:hover:bg-light"
      type="button"
      aria-label={isLight ? "Activate dark mode" : "Activate light mode"}
    >
      {isLight ? (
        <MoonIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      ) : (
        <SunIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      )}
    </button>
  );
}
