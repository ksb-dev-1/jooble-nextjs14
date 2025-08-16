"use client";

import { useState } from "react";

// components
import { FilterIcon } from "@/components/shared/icons";
import FilterModal from "./FilterModal";

// 3rd party
import { FaCaretDown } from "react-icons/fa";

export default function FilterTrigger() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open filter modal"
        className="relative w-fit flex items-center px-4 py-2 rounded border hover:bg-dark dark:hover:bg-light text-primary"
      >
        <FilterIcon className="mr-2" />
        <span className="font-semibold">Filters</span>
        <FaCaretDown className="ml-4" />
      </button>
      <FilterModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
