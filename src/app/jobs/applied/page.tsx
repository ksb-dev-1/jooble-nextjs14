import type { Metadata } from "next";
import { redirect } from "next/navigation";

// lib
import { getUserSession } from "@/lib/getUserSession";

// components
import Container from "@/components/shared/Container";
import Breadcrumb from "@/components/shared/BreadCrumb";
import AppliedJobList from "@/components/jobs/AppliedJobList";

export const metadata: Metadata = {
  title: "Applied Jobs",
  description:
    "View the jobs you've applied for and track your application status in one place.",
};

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Jobs", href: "/jobs" },
  { label: "Applied" },
];

export default async function AppliedJobsPage() {
  const { userId } = await getUserSession();

  if (!userId) redirect("/sign-in");

  return (
    <Container>
      <nav className="mb-8">
        <Breadcrumb items={breadcrumbItems} />
      </nav>

      <main className="w-full flex flex-col">
        <section className="w-full">
          <AppliedJobList userId={userId} />
        </section>
      </main>
    </Container>
  );
}
