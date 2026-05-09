export type ClearanceLevel = "None" | "Preferred" | "Required" | "Unknown";
export type JobStatus = "New" | "Reviewing" | "Applied" | "Interviewing" | "Rejected" | "Offer";
export type Industry =
  | "Cybersecurity"
  | "Finance/AML"
  | "Nonprofit"
  | "Tech/Trust & Safety"
  | "Law"
  | "Media"
  | "Government"
  | "Other";

export type Job = {
  id: string;
  notionUrl: string;
  jobTitle: string;
  company: string;
  industry: Industry | null;
  location: string;
  datePosted: string | null;
  dateFound: string | null;
  highInterest: boolean;
  clearance: ClearanceLevel | null;
  status: JobStatus | null;
  jobUrl: string | null;
};
