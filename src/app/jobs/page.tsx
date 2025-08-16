import type { Metadata } from "next";
import { redirect } from "next/navigation";

// lib
import { fetchJobs } from "@/lib/fetch-jobs";
import { getUserSession } from "@/lib/getUserSession";

// types
import { JobsWithTotalPages } from "@/types/job";

// utils
import { parseUniqueFilters } from "@/utils";

// components
import Breadcrumb from "@/components/shared/BreadCrumb";
import ServerError from "@/components/errors/ServerError";
import JobSearchInput from "@/components/jobs/JobSearchInput";
import FilterTrigger from "@/components/jobs/Filter/FilterTrigger";
import ActiveFilters from "@/components/jobs/ActiveFilters";
import JobList from "@/components/jobs/JobList";
import Pagination from "@/components/jobs/Pagination";

export const metadata: Metadata = {
  title: "Jobs",
  description:
    "Explore job listings by title, city, and job type. Apply instantly to opportunities that match your profile.",
};

interface JobFilterValues {
  page: string;
  jobType?: string;
  location?: string;
  jobMode?: string;
  search?: string;
}

interface JobsPageProps {
  searchParams: JobFilterValues;
}

const breadcrumbItems = [
  { label: "Home", href: "/", ariaLabel: "Go to home page" },
  { label: "Jobs" },
];

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const { userId, name } = await getUserSession();
  if (!userId) redirect("/sign-in");

  const filterValues = {
    page: searchParams.page || "1",
    location: searchParams.location,
    jobType: searchParams.jobType,
    jobMode: searchParams.jobMode,
    search: searchParams.search,
  };

  const currentPage = parseInt(filterValues.page || "1", 10);
  const limit = 8;

  let data: JobsWithTotalPages | null = null;

  // Fetch jobs
  try {
    data = await fetchJobs({
      userId,
      page: currentPage,
      limit,
      search: filterValues.search || undefined,
      jobType: filterValues.jobType || undefined,
      location: filterValues.location || undefined,
      jobMode: filterValues.jobMode || undefined,
    });

    if (!data) {
      console.error("❌ No data from fetchJobs");
      return <ServerError />;
    }
  } catch (error) {
    console.error("❌ JobList fetch failed:", error);
    return <ServerError />;
  }

  const { jobs, totalPages } = data;

  const cleanedFilterValues = {
    search: filterValues.search,
    location: parseUniqueFilters(filterValues.location).join(","),
    jobType: parseUniqueFilters(filterValues.jobType).join(","),
    jobMode: parseUniqueFilters(filterValues.jobMode).join(","),
  };

  const matchedValues = {
    location: new Set(jobs.map((job) => job.location.toLowerCase())),
    jobType: new Set(jobs.map((job) => job.jobType.toLowerCase())),
    jobMode: new Set(jobs.map((job) => job.jobMode.toLowerCase())),
  };

  const hasActiveFilters =
    Boolean(filterValues.search?.trim()) ||
    Boolean(filterValues.location?.trim()) ||
    Boolean(filterValues.jobType?.trim()) ||
    Boolean(filterValues.jobMode?.trim());

  return (
    <div className="min-h-screen">
      <div
        className={`max-w-5xl px-4 w-full mx-auto pt-24 ${
          hasActiveFilters ? "" : "pb-16"
        }`}
      >
        <JobSearchInput name={name} />
        {hasActiveFilters && (
          <>
            {/* <hr className="my-8" /> */}
            <div className="my-8">
              <ActiveFilters
                search={cleanedFilterValues.search}
                jobType={cleanedFilterValues.jobType}
                location={cleanedFilterValues.location}
                jobMode={cleanedFilterValues.jobMode}
                matchedValues={matchedValues}
              />
            </div>
          </>
        )}
      </div>

      <hr className="mb-8" />

      <div className="max-w-5xl w-full px-4 mx-auto mb-16">
        <div className="flex items-center justify-between">
          <nav>
            <Breadcrumb items={breadcrumbItems} />
          </nav>
          <FilterTrigger />
        </div>

        <div className="w-full flex flex-col mt-8">
          <JobList jobs={jobs} hasActiveFilters={hasActiveFilters} />
          {totalPages > 1 && (
            <nav className="w-full mt-16">
              <Pagination currentPage={currentPage} totalPages={totalPages} />
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}
