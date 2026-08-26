const KNOWN_PLATFORMS: Record<string, string> = {
  // Major job boards
  "linkedin.com": "LinkedIn",
  "naukri.com": "Naukri",
  "indeed.com": "Indeed",
  "wellfound.com": "Wellfound",
  "instahyre.com": "Instahyre",
  "ycombinator.com": "Y Combinator",
  "internshala.com": "Internshala",
  "glassdoor.com": "Glassdoor",
  "monster.com": "Monster",
  "shine.com": "Shine",
  "cutshort.io": "Cutshort",
  "hirist.com": "Hirist",
  "foundit.in": "Foundit",
  "timesjobs.com": "TimesJobs",
  "angel.co": "AngelList",
  "otta.com": "Otta",

  // ATS platforms (companies host listings under these, often as subdomains)
  "greenhouse.io": "Greenhouse",
  "lever.co": "Lever",
  "ashbyhq.com": "Ashby",
  "smartrecruiters.com": "SmartRecruiters",
  "workday.com": "Workday",
  "myworkdayjobs.com": "Workday",
  "bamboohr.com": "BambooHR",
  "breezy.hr": "Breezy HR",
  "recruitee.com": "Recruitee",
  "jobvite.com": "Jobvite",
  "icims.com": "iCIMS",
};

export function getPlatformFromUrl(url: string): string {
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, "");

    for (const [domain, platformName] of Object.entries(KNOWN_PLATFORMS)) {
      if (hostname === domain || hostname.endsWith(`.${domain}`)) {
        return platformName;
      }
    }

    return "Company Site";
  } catch {
    return "Other";
  }
}
