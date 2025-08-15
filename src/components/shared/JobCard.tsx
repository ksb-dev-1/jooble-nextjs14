// components
import LinkWithProgress from "./LinkWithProgress";
import { ToggleSaveForm } from "./ToggleSaveForm";

// utils
import { formatMoney, relativeDate } from "@/utils";

// types
import { JobWithSavedStatusAndApplicationStatus } from "@/types/job";

// components
import {
  BriefcaseIcon,
  OfficeIcon,
  LocationIcon,
  RupeeIcon,
  TimerIcon,
} from "@/components/shared/icons";

// 3rd party libraries
import { FaClock } from "react-icons/fa";
import { ApplicationStatus } from "@prisma/client";

interface JobCardProps {
  job: JobWithSavedStatusAndApplicationStatus;
  currentJob?: JobWithSavedStatusAndApplicationStatus | null;
  link?: string;
  pointerEventsClass?: string;
}

const statusColors: Record<ApplicationStatus, string> = {
  PENDING: "text-amber-700 dark:text-amber-500",
  OFFER: "border-emerald-600 bg-emerald-100 text-emerald-600",
  INTERVIEW: "border-blue-600 bg-blue-100 text-blue-600",
  REJECT: "border-red-600 bg-red-100 text-red-600",
};

export default function JobCard({
  job,
  currentJob,
  link,
  pointerEventsClass,
}: JobCardProps) {
  const {
    id,
    role,
    companyName,
    experience,
    salary,
    location,
    jobType,
    jobMode,
    skills,
    openings,
    applicationStatus,
    createdAt,
  } = job;

  return (
    <article
      className="relative h-full"
      aria-label={`Job posting: ${role} at ${companyName}`}
    >
      <LinkWithProgress
        href={link ?? `/jobs/${id}`}
        className={`${
          id === currentJob?.id ? "border-primary" : ""
        } h-full block bg-light dark:bg-dark border rounded p-4 sm:p-6 hover:border-primary ${pointerEventsClass}`}
      >
        <header>
          <h3 className="font-extrabold text-lg mb-1">{role}</h3>
          <p>
            <span className="text-primary font-bold">{companyName}</span>
            {applicationStatus && (
              <>
                <span className="inline-block mx-2">-</span>
                <span
                  className={`${statusColors[applicationStatus]} font-bold text-sm`}
                >
                  {applicationStatus.charAt(0) +
                    applicationStatus.substring(1).toLowerCase()}
                </span>
              </>
            )}
          </p>
        </header>

        <section className="mt-6" aria-label="Job details">
          <dl className="flex flex-wrap gap-x-8 gap-y-4 text-text_secondary">
            <div className="flex items-center">
              <BriefcaseIcon />
              <dt className="sr-only">Experience</dt>
              <dd className="ml-2">{experience}</dd>
            </div>
            <div className="flex items-center">
              <LocationIcon />
              <dt className="sr-only">Location</dt>
              <dd className="ml-1">{location}</dd>
            </div>
            <div className="flex items-center">
              <TimerIcon />
              <dt className="sr-only">Job Type</dt>
              <dd className="ml-2">{jobType}</dd>
            </div>
            <div className="flex items-center">
              <OfficeIcon />
              <dt className="sr-only">Job Mode</dt>
              <dd className="ml-2">{jobMode}</dd>
            </div>
            <div className="flex items-center">
              <RupeeIcon />
              <dt className="sr-only">Salary</dt>
              <dd className="ml-1">{formatMoney(salary).slice(1)}</dd>
            </div>
          </dl>

          <div className="flex items-end flex-wrap">
            {skills?.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-6">
                {skills.map((skill: string) => (
                  <div key={skill} className="flex items-center">
                    <span className="capitalize text-text_secondary text-xs border rounded px-2 py-[2px]">
                      {skill}
                    </span>
                    {/* {index !== skills.length - 1 && (
                      <span
                        className="h-1 w-1 mx-2 rounded-full inline-block bg-[#555]"
                        aria-hidden="true"
                      ></span>
                    )} */}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <div className="w-full border-b mt-6 mb-2" role="presentation" />

        <footer className="mt-4 flex items-center justify-between w-full text-text_secondary">
          <p className="text-sm">Openings: {openings}</p>
          <div className="w-fit flex items-center text-xs">
            <FaClock aria-hidden="true" />
            <span className="ml-1">{relativeDate(createdAt)}</span>
          </div>
        </footer>
      </LinkWithProgress>

      <ToggleSaveForm jobId={id} isSaved={job.isSaved} />
    </article>
  );
}
