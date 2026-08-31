import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getCurrentUserId } from "@/features/auth/services/token.service";
import { ApplicationDetailHeader } from "@/features/job-application/components/application-details/ApplicationDetailHeader";
import { ApplicationCadenceFollowup } from "@/features/job-application/components/application-details/ApplicationFollowup";
import { ApplicationMetadataCard } from "@/features/job-application/components/application-details/ApplicationMetaDataCard";

import { getJobApplicationById } from "@/features/job-application/queries/job-application.query";
import { notFound } from "next/navigation";

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userId = await getCurrentUserId();
  const application = await getJobApplicationById(userId, id);

  if (!application) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header matched to Dashboard Row vibe */}
        <ApplicationDetailHeader application={application} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Skills + Job Description */}
          <div className="lg:col-span-7 space-y-6">
            {application.skills && application.skills.length > 0 && (
              <div className="space-y-2.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Tech Stack & Keywords
                </span>
                <div className="flex flex-wrap gap-1">
                  {application.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="text-[10px] px-2 py-0.5 h-5 font-normal bg-muted/20 border-border/60 text-muted-foreground shadow-none"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {application.skills && application.skills.length > 0 && (
              <Separator />
            )}

            <div className="space-y-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Job Description
              </span>
              <div className="rounded-lg border bg-card p-4 text-xs font-sans leading-relaxed text-foreground/90 whitespace-pre-wrap max-h-[600px] overflow-y-auto">
                {application.jd_text || "No job description text provided."}
              </div>
            </div>
          </div>

          {/* Right: Follow-up Module Placeholder + Metadata */}
          <div className="lg:col-span-5 space-y-6">
            <ApplicationCadenceFollowup application={application} />
            <ApplicationMetadataCard application={application} />
          </div>
        </div>
      </div>
    </div>
  );
}
