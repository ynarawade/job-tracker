import { Card, CardContent } from "@/components/ui/card";
import type { JobApplicationListItem } from "@/features/job-application/types/job-application.types";

export function ApplicationMetadataCard({
  application,
}: {
  application: JobApplicationListItem;
}) {
  return (
    <Card className="border border-border/70 shadow-xs">
      <CardContent className="pt-4 space-y-3 text-xs">
        <div className="flex justify-between items-center text-muted-foreground">
          <span>Source Platform</span>
          <span className="text-foreground font-medium">
            {application.platform}
          </span>
        </div>
        <div className="flex justify-between items-center text-muted-foreground">
          <span>Contact Email</span>
          <span className="text-foreground font-mono truncate max-w-[180px]">
            {application.contact_mail || "Not set"}
          </span>
        </div>
        <div className="flex justify-between items-center text-muted-foreground">
          <span>Application Date</span>
          <span className="text-foreground font-mono">
            {new Date(application.created_at).toLocaleDateString()}
          </span>
        </div>
        <div className="flex justify-between items-center text-muted-foreground">
          <span>Last Activity</span>
          <span className="text-foreground font-mono">
            {new Date(application.updated_at).toLocaleDateString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
