"use client";

// import { Dispatch, SetStateAction } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// actions
import { clearFiltersServerAction } from "@/actions/clear-filters-server-action";
// import { JobWithSavedStatusAndApplicationStatus } from "@/types/job";

// 3rd party
import { IoCloseSharp } from "react-icons/io5";

interface Props {
  search?: string;
  location?: string;
  jobType?: string;
  jobMode?: string;
  matchedValues: {
    location: Set<string>;
    jobType: Set<string>;
    jobMode: Set<string>;
  };
  // jobs: JobWithSavedStatusAndApplicationStatus[];
  // setJob: Dispatch<
  //   SetStateAction<JobWithSavedStatusAndApplicationStatus | null>
  // >;
}

export default function ActiveFilters({
  search,
  location,
  jobType,
  jobMode,
  matchedValues,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const removeFilter = (key: string, valueToRemove?: string) => {
    const params = new URLSearchParams(searchParams);
    const currentValue = params.get(key);

    if (!currentValue) return;

    if (valueToRemove) {
      const values = currentValue.split(",").filter((v) => v !== valueToRemove);
      if (values.length > 0) {
        params.set(key, values.join(","));
      } else {
        params.delete(key);
      }
    } else {
      params.delete(key);
    }

    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const activeFilters = [
    search && search.trim() !== "",
    ...(location && location !== "all" ? location.split(",") : []),
    ...(jobType && jobType !== "all" ? jobType.split(",") : []),
    ...(jobMode && jobMode !== "all" ? jobMode.split(",") : []),
  ].filter(Boolean);

  if (activeFilters.length === 0) return null;

  return (
    <div className="flex items-center flex-wrap gap-2 text-sm">
      {/* Search */}
      {search && (
        <FilterTag
          label={search}
          onRemove={() => removeFilter("search")}
          className=""
        />
      )}

      {/* Location filters */}
      {location &&
        location !== "all" &&
        location.split(",").map((loc) => {
          const isMatched = matchedValues.location.has(loc.toLowerCase());
          return (
            <FilterTag
              key={`location-${loc}`}
              label={capitalize(loc)}
              onRemove={() => removeFilter("location", loc)}
              className={
                isMatched ? "" : "bg-transparent text-gray-400 line-through"
              }
              title={!isMatched ? "No jobs matched this filter" : undefined}
            />
          );
        })}

      {/* JobType filters */}
      {jobType &&
        jobType !== "all" &&
        jobType.split(",").map((type) => {
          const isMatched = matchedValues.jobType.has(type.toLowerCase());
          return (
            <FilterTag
              key={`jobType-${type}`}
              label={capitalize(type)}
              onRemove={() => removeFilter("jobType", type)}
              className={
                isMatched ? "" : "bg-transparent text-gray-400 line-through"
              }
              title={!isMatched ? "No jobs matched this filter" : undefined}
            />
          );
        })}

      {/* JobMode filters */}
      {jobMode &&
        jobMode !== "all" &&
        jobMode.split(",").map((mode) => {
          const isMatched = matchedValues.jobMode.has(mode.toLowerCase());
          return (
            <FilterTag
              key={`jobMode-${mode}`}
              label={capitalize(mode)}
              onRemove={() => removeFilter("jobMode", mode)}
              className={
                isMatched ? "" : "bg-transparent text-gray-400 line-through"
              }
              title={!isMatched ? "No jobs matched this filter" : undefined}
            />
          );
        })}

      {/* Clear All */}
      {activeFilters.length > 1 && (
        <form action={clearFiltersServerAction}>
          <button type="submit">
            <FilterTag
              label="Clear All"
              className="font-semibold text-red-600 bg-red-50 border-red-50 hover:bg-red-100 dark:text-red-300 dark:bg-red-950 dark:border-red-950 dark:hover:bg-red-900"
            />
          </button>
        </form>
      )}
    </div>
  );
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

interface FilterTagProps {
  label: string;
  onRemove?: () => void;
  className?: string;
  title?: string;
}

function FilterTag({ label, onRemove, className, title }: FilterTagProps) {
  return (
    <span
      title={title}
      className={`flex items-center px-3 py-1 rounded border ${className}`}
    >
      {label}
      {onRemove && (
        <IoCloseSharp
          className="ml-2 cursor-pointer text-red-500"
          onClick={onRemove}
        />
      )}
    </span>
  );
}
