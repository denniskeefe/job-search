import jobsData from "@/data/jobs.json";
import type { Job } from "@/types/job";

export function getJobs(): Job[] {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 30);
  return (jobsData as Job[]).filter((job) => {
    if (!job.dateFound) return true;
    return new Date(job.dateFound) >= cutoff;
  });
}
