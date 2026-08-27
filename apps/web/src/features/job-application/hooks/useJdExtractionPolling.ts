"use client";

import { getExtractionStatus } from "@/features/job-application/actions/getExtractionStatus.action";
import type { JobApplicationListItem } from "@/features/job-application/types/job-application.types";
import { useEffect, useRef, useState } from "react";

const POLL_INTERVAL_MS = 2000;

export function useJdExtractionPolling(
  initialApplications: JobApplicationListItem[]
) {
  const [applications, setApplications] = useState(initialApplications);
  const applicationsRef = useRef(applications);
  applicationsRef.current = applications;

  // Sync newly created applications in from fresh server props
  // without clobbering already-polled local state
  useEffect(() => {
    setApplications((current) => {
      const currentIds = new Set(current.map((app) => app.id));
      const newItems = initialApplications.filter(
        (app) => !currentIds.has(app.id)
      );
      if (newItems.length === 0) return current;
      return [...newItems, ...current];
    });
  }, [initialApplications]);

  // Re-runs whenever the number of pending applications changes.
  const pendingCount = applications.reduce(
    (count, app) => (app.extraction_state === "PENDING" ? count + 1 : count),
    0
  );

  useEffect(() => {
    if (pendingCount === 0) {
      return;
    }

    const intervalId = setInterval(async () => {
      const pendingIds = applicationsRef.current
        .filter((app) => app.extraction_state === "PENDING")
        .map((app) => app.id);

      if (pendingIds.length === 0) {
        clearInterval(intervalId);
        return;
      }

      const response = await getExtractionStatus(pendingIds);

      if (response.statusCode >= 400 || !response.data) {
        console.error(
          "[useJdExtractionPolling] poll failed:",
          response.message
        );
        return;
      }

      setApplications((current) =>
        current.map((app) => {
          const updated = response.data!.find((u) => u.id === app.id);
          return updated ? { ...app, ...updated } : app;
        })
      );
    }, POLL_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [pendingCount]);

  return applications;
}
