import type { Metadata } from "next";
import { redirect } from "next/navigation";

// lib
import { getUserSession } from "@/lib/getUserSession";

// components
import Container from "@/components/shared/Container";
import Breadcrumb from "@/components/shared/BreadCrumb";
import SavedJobList from "@/components/jobs/SavedJobList";

export const metadata: Metadata = {
  title: "Saved Jobs",
  description: "View and manage jobs you've bookmarked to apply later.",
};

const breadcrumbItems = [
  { label: "Home", href: "/", ariaLabel: "Go to home page" },
  { label: "Jobs", href: "/jobs", ariaLabel: "Browse all jobs" },
  { label: "Saved" },
];

export default async function SavedJobsPage() {
  const { userId } = await getUserSession();

  if (!userId) redirect("/sign-in");

  return (
    <Container>
      <nav className="mb-8">
        <Breadcrumb items={breadcrumbItems} />
      </nav>

      <main className="w-full flex flex-col">
        <section className="w-full">
          <SavedJobList userId={userId} />
        </section>
      </main>
    </Container>
  );
}
