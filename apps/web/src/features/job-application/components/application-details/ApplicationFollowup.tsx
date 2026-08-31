import { Card, CardContent } from "@/components/ui/card";
import type { JobApplicationListItem } from "@/features/job-application/types/job-application.types";

interface ApplicationCadenceFollowupProps {
  application: JobApplicationListItem;
}
export function ApplicationCadenceFollowup({
  application,
}: ApplicationCadenceFollowupProps) {
  return (
    <Card className="border border-border shadow-xs bg-card">
      <CardContent>Follup section placeholder</CardContent>
    </Card>
  );
}
