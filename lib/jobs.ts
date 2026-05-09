import jobsData from "@/data/jobs.json";
import type { Job } from "@/types/job";

export function getJobs(): Job[] {
  return jobsData as Job[];
}
