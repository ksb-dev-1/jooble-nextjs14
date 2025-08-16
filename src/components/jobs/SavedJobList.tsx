// lib
import { fetchSavedJobs } from "@/lib/fetch-saved-jobs";

// types
import { Jobs, JobWithSavedStatusAndApplicationStatus } from "@/types/job";

// components
import ServerError from "@/components/errors/ServerError";
import DocumentSearchIcon from "../errors/DocumentSearchIcon";
import LinkWithProgress from "../shared/LinkWithProgress";
import JobCard from "@/components/shared/JobCard";

interface SavedJobListProps {
  userId: string;
}

export default async function SavedJobList({ userId }: SavedJobListProps) {
  let data: Jobs | null = null;

  // 🟢 Step 1: Fetch saved jobs for the current user
  try {
    data = await fetchSavedJobs(userId);
  } catch (error) {
    console.error("❌ SavedJobList fetch failed:", error);
    // 🛑 If the fetch request fails, show the server error component
    return <ServerError />;
  }

  // 🟦 Step 2: Handle empty saved jobs
  // If no saved jobs exist OR the API returned no data,
  // show a friendly empty state encouraging the user to browse jobs.
  if (!data || data.jobs.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center border border-borderColor rounded px-4 py-16 sm:py-32 gap-8">
        <DocumentSearchIcon />
        <div className="flex flex-col items-center justify-center gap-2">
          <h2 className="font-medium text-lg">
            You haven&apos;t saved any jobs yet!
          </h2>
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

  // 🟩 Step 3: If saved jobs exist, display them in a grid layout
  const { jobs: savedJobs } = data;

  return (
    <ul className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
      {savedJobs.map((job: JobWithSavedStatusAndApplicationStatus) => (
        <li key={job.id}>
          <JobCard job={job} />
        </li>
      ))}
    </ul>
  );
}
