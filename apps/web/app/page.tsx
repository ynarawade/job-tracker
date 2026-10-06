import { CareerIntelligenceSection } from "@/components/landing/CarrerIntelligenceSection";
import { FinalCta } from "@/components/landing/FinalCTA";
import { FollowUpSection } from "@/components/landing/FollowupSection";
import { Hero } from "@/components/landing/Hero";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingHeader } from "@/components/landing/LeadingHeader";
import { TrackingSection } from "@/components/landing/TrackingSection";
import { WorkflowSection } from "@/components/landing/WorkFlowSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cadence — Keep Every Job Application Moving",
  description:
    "Turn job postings into structured applications with AI-powered extraction, job tracking and intelligent recruiter follow-ups.",
  openGraph: {
    title: "Cadence — Keep Every Job Application Moving",
    description:
      "Turn job postings into structured applications with AI-powered extraction, job tracking and intelligent recruiter follow-ups.",
    type: "website",
  },
};

export default function LandingPage() {
  return (
    <div className="landing-theme min-h-screen overflow-x-clip">
      <LandingHeader />

      <main>
        <Hero />
        <WorkflowSection />
        <TrackingSection />
        <FollowUpSection />
        <CareerIntelligenceSection />
        <FinalCta />
      </main>

      <LandingFooter />
    </div>
  );
}
