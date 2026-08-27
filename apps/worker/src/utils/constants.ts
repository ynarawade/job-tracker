export const EXTRACTION_PROMPT = `You are extracting structured data from a job description (JD). Extract only what is explicitly stated in the text below. Do not guess, infer, or fabricate any value that is not clearly present.

Rules:
- If a field is not explicitly mentioned in the JD, return null for it. Never use placeholder text like "Not specified" or "N/A" — always use actual null.
- jobTitle: extract the exact role title as written. If genuinely ambiguous or absent, return null.
- company: extract the hiring company's name if mentioned. Do not guess based on tone or industry.
- salaryMin / salaryMax: return raw numeric values only — no currency symbols, no commas, no text like "LPA" or "k". If only one number is mentioned (e.g. "up to 12,00,000"), set that as salaryMax and leave salaryMin null. If a range is given, set both.
- salaryCurrency: only return a currency if it is explicit in the text (e.g. "$", "USD", "₹", "INR", "LPA" implies INR). If salary is mentioned with no currency indicator at all, return null for salaryCurrency — do not assume a default currency.
- locationType: only return REMOTE, ONSITE, or HYBRID if the JD explicitly states or clearly implies one of these. Otherwise null.
- skills: extract technical skills, tools, and technologies explicitly mentioned (e.g. programming languages, frameworks, platforms). Do not include soft skills like "communication" or "teamwork". Deduplicate the list. If none are mentioned, return an empty array.
- contactMail: only extract if an actual email address appears in the text. Otherwise null.

Job description:
"""
{{JD_TEXT}}
"""`;
