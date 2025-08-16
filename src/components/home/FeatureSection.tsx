"use client";

// components
import {
  BookmarkFilledIcon,
  BriefcaseIcon,
  CloudUploadIcon,
  FilterIcon,
  PaperPlaneIcon,
  SearchIcon,
} from "@/components/shared/icons";

// 3rd party
import { motion } from "framer-motion";

const features = [
  {
    icon: <FilterIcon />,
    title: "Smart Filters",
    desc: "Filter jobs by location, type, and mode.",
  },
  {
    icon: <SearchIcon />,
    title: "Advanced Search",
    desc: "Search by company, skills, or designation.",
  },
  {
    icon: <BookmarkFilledIcon />,
    title: "Bookmark Jobs",
    desc: "Save jobs to view and apply later.",
  },
  {
    icon: <CloudUploadIcon />,
    title: "Upload Resume",
    desc: "Attach your resume to stand out.",
  },
  {
    icon: <BriefcaseIcon />,
    title: "Flexible Job Modes",
    desc: "Explore remote, hybrid, or onsite roles.",
  },
  {
    icon: <PaperPlaneIcon />,
    title: "Easy Apply",
    desc: "Apply directly with one click.",
  },
];

export default function FeatureSection() {
  return (
    <section className="max-w-5xl px-4 mx-auto">
      <motion.h2
        className="text-xl md:text-2xl font-extrabold mb-8"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.span
          className="inline-block border-b-2 border-primary text-primary origin-left"
          variants={{
            hidden: { scaleX: 0 },
            show: {
              scaleX: 1,
              transition: {
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
          style={{ display: "inline-block" }}
        >
          Features
        </motion.span>
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {features.map((feature, index) => (
          <motion.article
            key={index}
            className="p-4 sm:p-6 border rounded bg-light dark:bg-dark"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="relative h-10 w-10 rounded border mb-4">
              <span
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary"
                aria-hidden="true"
              >
                {feature.icon}
              </span>
            </div>
            <h1 className="font-extrabold text-lg sm:text-xl mb-2">
              {feature.title}
            </h1>
            <p className="text-text_secondary">{feature.desc}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
