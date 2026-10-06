export const APP_HREF = "/dashboard";

export const NAV_ITEMS = [
  {
    label: "Product",
    href: "#product",
  },
  {
    label: "Workflow",
    href: "#workflow",
  },
  {
    label: "Follow-ups",
    href: "#follow-ups",
  },
  {
    label: "Intelligence",
    href: "#intelligence",
  },
] as const;

export const WORKFLOW_STEPS = [
  {
    number: "01",
    title: "Paste the opportunity",
    description:
      "Add the job URL or paste the job description. No forms. No repetitive data entry.",
  },
  {
    number: "02",
    title: "Cadence understands it",
    description:
      "AI extracts the role, company, location, skills, experience, salary context and other useful details.",
  },
  {
    number: "03",
    title: "Keep it moving",
    description:
      "The application becomes part of a structured pipeline so you always know what happened and what comes next.",
  },
] as const;

export const PIPELINE_ITEMS = [
  {
    company: "Linear",
    role: "Frontend Engineer",
    status: "Applied",
    meta: "Today",
    tone: "neutral",
  },
  {
    company: "Vercel",
    role: "Software Engineer",
    status: "Follow-up",
    meta: "Due in 2 days",
    tone: "primary",
  },
  {
    company: "Stripe",
    role: "Product Engineer",
    status: "Interview",
    meta: "Oct 12 · 11:30 AM",
    tone: "success",
  },
  {
    company: "Ramp",
    role: "Full-stack Engineer",
    status: "Reviewing",
    meta: "Updated yesterday",
    tone: "warning",
  },
] as const;

export const INTELLIGENCE_FEATURES = [
  {
    title: "Resume analysis",
    description:
      "Understand where your resume is strong and where it needs work before applying.",
    badge: "Planned",
  },
  {
    title: "ATS match score",
    description:
      "Compare your resume with the job description and understand the match at a glance.",
    badge: "Planned",
  },
  {
    title: "Missing skills",
    description:
      "Surface skills and keywords the role expects but your current resume may be missing.",
    badge: "Planned",
  },
  {
    title: "Interview intelligence",
    description:
      "Turn the job description and application context into focused interview preparation.",
    badge: "Planned",
  },
] as const;
