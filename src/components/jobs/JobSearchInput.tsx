"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

// 3rd party
import NProgress from "nprogress";
import { MdSearch } from "react-icons/md";

export default function JobSearchInput({
  name,
}: {
  name: string | null | undefined;
}) {
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("search") || "";
  const [search, setSearch] = useState(currentSearch);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setSearch(currentSearch || "");
  }, [currentSearch]);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && search.trim()) {
      e.preventDefault();

      const params = new URLSearchParams(searchParams.toString());
      params.set("search", search.trim());

      NProgress.start();
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <section>
      <h1 className="text-2xl font-extrabold text-center">Welcome, {name}!</h1>

      <form
        role="search"
        aria-label="Job search form"
        className="relative w-full flex items-center mt-4"
        onSubmit={(e) => e.preventDefault()} // prevent default for SPA
      >
        <label htmlFor="job-search" className="sr-only">
          Search jobs by title, company, or skill
        </label>
        <input
          id="job-search"
          type="search"
          value={search}
          placeholder="Enter company name , job title or skill"
          aria-label="Search jobs by title, company, or skill"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          className="w-full sm:pl-12 px-4 py-3 bg-light dark:bg-dark border rounded placeholder:text-sm sm:placeholder:text-base placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
        />
        <MdSearch className="h-5 w-5 hidden sm:block absolute left-4" />
        <button
          type="submit"
          className="absolute top-0 right-0 bottom-0 px-4 py-3 font-bold flex items-center justify-center rounded-tr rounded-br bg-primary text-light dark:text-dark hover:opacity-80 dark:hover:opacity-90"
        >
          <MdSearch className="h-6 w-6 sm:hidden" />
          <span className="hidden sm:block">Find Jobs</span>
        </button>
      </form>

      <p className="text-sm mt-2 text-text_secondary" role="note">
        Type the full skill name for better results. Partial or misspelled
        skills might not return matches.
      </p>
    </section>
  );
}
