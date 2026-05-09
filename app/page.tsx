import { getJobs } from "@/lib/notion";
import JobDashboard from "@/components/JobDashboard";

// Revalidate once per hour so new jobs from the scheduled agent appear promptly
export const revalidate = 3600;

export default async function Home() {
  const jobs = await getJobs();
  return <JobDashboard jobs={jobs} />;
}
