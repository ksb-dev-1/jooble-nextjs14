// lib
import { fetchAppliedJobs } from "@/lib/fetch-applied-jobs";

// types
import { Jobs, JobWithSavedStatusAndApplicationStatus } from "@/types/job";

// components
import ServerError from "@/components/errors/ServerError";
import DocumentSearchIcon from "../errors/DocumentSearchIcon";
import LinkWithProgress from "../shared/LinkWithProgress";
import JobCard from "@/components/shared/JobCard";

interface AppliedJobListProps {
  userId: string;
}

export default async function AppliedJobList({ userId }: AppliedJobListProps) {
  let data: Jobs | null = null;

  // 🟢 Step 1: Fetch applied jobs for the current user
  try {
    data = await fetchAppliedJobs(userId);
  } catch (error) {
    console.error("❌ AppliedJobList fetch failed:", error);
    // 🛑 If fetching fails, show the server error component
    return <ServerError />;
  }

  // 🟦 Step 2: Handle case where no applied jobs are found
  // Covers both null API response and empty jobs array
  if (!data || data.jobs.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center border border-borderColor rounded px-4 py-16 sm:py-32 gap-8">
        <DocumentSearchIcon />
        <div className="flex flex-col items-center justify-center gap-2">
          <h2 className="font-medium text-lg">
            You haven&apos;t applied to any jobs yet!
          </h2>
          <p className="text-muted-foreground text-sm text-center">
            Explore opportunities and apply to your favorite roles.
          </p>
          <LinkWithProgress
            href="/jobs"
            className="text-primary font-medium underline text-lg"
            aria-label="Browse available jobs to save"
          >
            Browse jobs
          </LinkWithProgress>
        </div>
      </div>
    );
  }

  // 🟩 Step 3: If applied jobs exist, render them in a grid
  const { jobs: appliedJobs } = data;

  return (
    <ul className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
      {appliedJobs.map((job: JobWithSavedStatusAndApplicationStatus) => (
        <li key={job.id}>
          <JobCard job={job} />
        </li>
      ))}
    </ul>
  );
}
