// types
import { JobWithSavedStatusAndApplicationStatus } from "@/types/job";

// components
import DocumentSearchIcon from "../errors/DocumentSearchIcon";
import JobCard from "@/components/shared/JobCard";

interface JobListProps {
  jobs: JobWithSavedStatusAndApplicationStatus[];
  hasActiveFilters: boolean;
}

export default async function JobList({
  jobs,
  hasActiveFilters,
}: JobListProps) {
  // 🟥 CASE 1: No jobs + Filters applied
  if (jobs.length === 0 && hasActiveFilters) {
    return (
      <div
        role="alert"
        aria-live="assertive"
        className="w-full flex flex-col items-center justify-center border rounded px-4 py-16 sm:py-32"
      >
        <DocumentSearchIcon />
        <h2 className="mt-8 font-semibold text-xl">
          No jobs match your filters!
        </h2>
        <p className="mt-1">
          Try adjusting or clearing some filters to see more results.
        </p>
      </div>
    );
  }

  // 🟦 CASE 2: No jobs + No filters
  if (jobs.length === 0 && !hasActiveFilters) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="w-full flex flex-col items-center justify-center border border-borderColor rounded px-4 py-16 sm:py-32"
      >
        <DocumentSearchIcon />
        <h2 className="mt-8 font-semibold text-xl">No jobs available yet</h2>
        <p className="mt-1">
          Check back later — we’re adding new opportunities soon.
        </p>
      </div>
    );
  }

  // 🟩 CASE 3: Jobs found
  return (
    <section className="w-full flex flex-col">
      <ul className="w-full grid md:grid-cols-2 gap-4 sm:gap-8">
        {jobs.map((job: JobWithSavedStatusAndApplicationStatus) => (
          <li key={job.id}>
            <JobCard job={job} />
          </li>
        ))}
      </ul>
    </section>
  );
}
