"use client";

import { useState } from "react";

// utils
import { monthYearDate } from "@/utils";

// components
import { CalenderCheckIcon } from "../shared/icons";
import ApplyForJobModal from "./ApplyForJobModal";

// 3rd party
import { ApplicationStatus } from "@prisma/client";

interface ApplyForJobProps {
  userId: string;
  jobId: string;
  applicationStatus: ApplicationStatus | null;
  updatedAt: Date;
}

export default function ApplyNowTrigger({
  userId,
  jobId,
  applicationStatus,
  updatedAt,
}: ApplyForJobProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (applicationStatus) {
    return (
      <div className="w-full p-4 mt-6 flex flex-col gap-2 sm:gap-4 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded border border-emerald-200 dark:border-emerald-700">
        {/* Date */}
        <div className="w-fit font-semibold flex items-center gap-3 bg-emerald-200/50 dark:bg-emerald-800/40 px-4 py-2 rounded">
          <CalenderCheckIcon className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
          Applied on - {monthYearDate(updatedAt)}
        </div>

        {/* Status message */}
        <p>
          Your application is{" "}
          <span className="font-bold text-emerald-700 dark:text-emerald-300">
            under review
          </span>
          . You&apos;ll be notified via email about interview updates.
        </p>
      </div>
    );
  }

  return (
    <>
      <button
        aria-label="Open apply job modal"
        onClick={() => setIsOpen(true)}
        className="mt-4 w-full sm:w-fit px-4 py-2 rounded bg-primary text-light dark:text-dark hover:opacity-80 dark:hover:opacity-90 transition-opacity font-medium"
      >
        Apply Now
      </button>

      <ApplyForJobModal
        userId={userId}
        jobId={jobId}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
}
