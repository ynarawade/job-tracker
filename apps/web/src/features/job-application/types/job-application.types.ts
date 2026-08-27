import type {
  JobApplicationExtractionStatus,
  JobApplicationStatus,
  JobLocationType,
  JobSlaryCurrencyType,
} from "@repo/db";

export interface JobApplicationListItem {
  id: string;
  job_title: string | null;
  job_url: string;
  company: string | null;
  contact_mail: string | null;
  location: string | null;
  location_type: JobLocationType | null;
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: JobSlaryCurrencyType | null;
  skills: string[];
  status: JobApplicationStatus | null;
  platform: string | null;
  extraction_state: JobApplicationExtractionStatus;
  created_at: string;
  updated_at: string;
}

export type JobApplicationExtractionUpdate = Partial<JobApplicationListItem> & {
  id: string;
};
