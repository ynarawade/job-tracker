import { prisma } from "@repo/db";

export async function getJobApplications(userId: string) {
  const applications = await prisma.jobApplication.findMany({
    where: {
      user_id: userId,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  console.log(
    "SERVER APPLICATION STATES:",
    applications.map((app) => ({
      id: app.id,
      state: app.extraction_state,
    }))
  );

  return applications.map((application) => ({
    id: application.id,
    job_title: application.job_title,
    job_url: application.job_url,
    company: application.company,
    contact_mail: application.contact_mail,
    location: application.location,
    location_type: application.location_type,
    salary_min:
      application.salary_min !== null ? Number(application.salary_min) : null,
    salary_max:
      application.salary_max !== null ? Number(application.salary_max) : null,
    salary_currency: application.salary_currency,
    skills: application.skills,
    status: application.status,
    platform: application.platform,
    extraction_state: application.extraction_state,
    created_at: application.created_at.toISOString(),
    updated_at: application.updated_at.toISOString(),
  }));
}

export async function getApplicationsExtractionStatus(
  applicationIds: string[]
) {
  if (applicationIds.length === 0) return [];

  const applications = await prisma.jobApplication.findMany({
    where: { id: { in: applicationIds } },
    select: {
      id: true,
      extraction_state: true,
      job_title: true,
      company: true,
      contact_mail: true,
      location: true,
      location_type: true,
      salary_min: true,
      salary_max: true,
      salary_currency: true,
      skills: true,
      platform: true,
    },
  });

  return applications.map((application) => ({
    id: application.id,
    extraction_state: application.extraction_state,
    job_title: application.job_title,
    company: application.company,
    contact_mail: application.contact_mail,
    location: application.location,
    location_type: application.location_type,
    salary_min:
      application.salary_min !== null ? Number(application.salary_min) : null,
    salary_max:
      application.salary_max !== null ? Number(application.salary_max) : null,
    salary_currency: application.salary_currency,
    skills: application.skills,
    platform: application.platform,
  }));
}
