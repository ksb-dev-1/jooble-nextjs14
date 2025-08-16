// components
import NotFoundError from "@/components/errors/NotFoundError";
import ApplyNowTrigger from "@/components/job-details/ApplyNowTrigger";
import Markdown from "@/components/job-details/Markdown";

// types
import { JobWithSavedStatusAndApplicationStatus } from "@/types/job";

// utils
import { relativeDate } from "@/utils";

// 3rd party
import { BsClock } from "react-icons/bs";

interface JobDetailsProps {
  userId: string;
  job: JobWithSavedStatusAndApplicationStatus | null;
}

export default function Details({ job, userId }: JobDetailsProps) {
  return (
    <div className="sticky hidden md:block w-full top-24 max-h-[calc(100vh-208px)] h-fit border rounded p-4 sm:p-6 break-words overflow-y-auto scrollable">
      <h1></h1>
      <div className="flex items-center justify-between">
        <span>Openings : {job?.openings}</span>
        <div className="w-fit flex items-center text-xs">
          <BsClock aria-hidden="true" />
          <span className="ml-1">{relativeDate(job!.createdAt)}</span>
        </div>
      </div>

      {job?.id && (
        <ApplyNowTrigger
          userId={userId}
          jobId={job.id}
          applicationStatus={job?.applicationStatus}
          updatedAt={job.updatedAt}
        />
      )}

      {job?.description ? (
        <section aria-labelledby="job-description-heading" className="mt-8">
          <h3 id="job-description-heading" className="sr-only">
            Job Description
          </h3>
          <Markdown>{job.description}</Markdown>
        </section>
      ) : (
        <NotFoundError message="No job details found!" />
      )}
    </div>
  );
}
