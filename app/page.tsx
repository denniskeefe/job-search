import { getJobs } from "@/lib/jobs";
import JobDashboard from "@/components/JobDashboard";

export default function Home() {
  const jobs = getJobs();
  return <JobDashboard jobs={jobs} />;
}
