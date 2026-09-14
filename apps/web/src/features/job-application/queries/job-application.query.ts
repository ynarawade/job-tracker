import { prisma } from "@repo/db";
export const ITEMS_PER_PAGE = 10;
export async function getJobApplications(userId: string, page: number) {
  const [applications, totalRows] = await Promise.all([
    prisma.jobApplication.findMany({
      where: {
        user_id: userId,
      },
      take: ITEMS_PER_PAGE,
      skip: (page - 1) * ITEMS_PER_PAGE,
      orderBy: {
        created_at: "desc",
      },
    }),

    prisma.jobApplication.count({
      where: {
        user_id: userId,
      },
    }),
  ]);

  return {
    applications: applications.map((application) => ({
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
    })),

    pagination: {
      page,
      pageSize: ITEMS_PER_PAGE,
      totalRows,
      totalPages: Math.ceil(totalRows / ITEMS_PER_PAGE),
    },
  };
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

export async function getJobApplicationById(
  userId: string,
  applicationId: string
) {
  const application = await prisma.jobApplication.findUnique({
    where: {
      user_id: userId,
      id: applicationId,
    },
  });
  console.log("Job application", application);

  if (!application) return null;

  return {
    ...application,
    salary_min:
      application.salary_min !== null ? Number(application.salary_min) : null,
    salary_max:
      application.salary_max !== null ? Number(application.salary_max) : null,
    created_at: application.created_at.toISOString(),
    updated_at: application.updated_at.toISOString(),
  };
}
