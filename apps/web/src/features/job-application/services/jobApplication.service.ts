import { getCurrentUserId } from "@/features/auth/services/token.service";
import { getPlatformFromUrl } from "@/lib/utils/getPlatformName";
import { prisma } from "@repo/db";
import { jdExtractionQueue } from "@repo/queue";

interface CreateJobApplicationProps {
  jobUrl: string;
  jdText: string;
}

const createApplicationWithExtraction = async (
  data: CreateJobApplicationProps
) => {
  const userId = await getCurrentUserId();
  const platform = getPlatformFromUrl(data.jobUrl);

  const jobEntry = await prisma.jobApplication.create({
    data: {
      user_id: userId,
      job_url: data.jobUrl,
      jd_text: data.jdText,
      platform,
      extraction_state: "PENDING",
    },
  });

  try {
    await jdExtractionQueue.add("extract", {
      applicationId: jobEntry.id,
      jdText: jobEntry.jd_text,
    });
  } catch (err) {
    console.error("[createApplicationWithExtraction] Queue add failed:", err);
    await prisma.jobApplication.update({
      where: { id: jobEntry.id },
      data: { extraction_status: "FAILED" },
    });
  }

  return jobEntry;
};

export { createApplicationWithExtraction };
