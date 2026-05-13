---
name: osint-analyst-job-search
description: Weekday + Saturday search for remote OSINT Analyst jobs in the USA and Canada with deduplication, Notion tracking, Vercel dashboard update, and Gmail digest
---

You are an automated job search agent for Dennis Keefe. Your goal is to find NEW remote OSINT/Intelligence Analyst job openings in the USA **and Canada** paying $55,000/year (USD) or CAD equivalent or more, deduplicate against previously seen listings, log new ones to a Notion database, commit new listings to the Vercel dashboard's data file, and send a Gmail digest.

---

## STEP 1 — Load the Seen-Jobs Log (Deduplication)

Read the deduplication log at:
`/Users/denniskeefe/.claude/scheduled-tasks/osint-analyst-job-search/seen-jobs.json`

If the file does not exist, treat the seen-jobs list as empty and create the file at the end of this run. The file is a JSON array of URL strings, e.g. `["https://...", "https://..."]`.

---

## STEP 2 — Search All Job Boards

Search each of the following URLs. For each board, also try keyword variations beyond just "OSINT Analyst" — include:
- `"Open Source Intelligence Analyst"`
- `"Open Source Investigations Specialist"`
- `"OSINT Investigator"`
- `"OSINT Researcher"`
- `"OSINT Specialist"`
- `"Threat Intelligence Analyst"`
- `"Digital Intelligence Analyst"`
- `"Trust and Safety Analyst"`
- `"Social Media Analyst"`
- `"Due Diligence Analyst"`
- `"Human Rights Investigator"`
- `"War Crimes Investigator"`

### Job Boards to Search:

1. **Indeed (USA)**
   - https://www.indeed.com/jobs?q=OSINT+Analyst&l=Remote&fromage=3
   - https://www.indeed.com/jobs?q=%22Open+Source+Intelligence%22&l=Remote&fromage=3
   - https://www.indeed.com/jobs?q=%22Threat+Intelligence+Analyst%22&l=Remote&fromage=3
   - https://www.indeed.com/jobs?q=%22Trust+and+Safety+Analyst%22&l=Remote&fromage=3

1b. **Indeed (Canada)**
   - https://ca.indeed.com/jobs?q=OSINT+Analyst&l=Remote&fromage=3
   - https://ca.indeed.com/jobs?q=%22Open+Source+Intelligence%22&l=Remote&fromage=3
   - https://ca.indeed.com/jobs?q=%22Threat+Intelligence+Analyst%22&l=Remote&fromage=3

2. **LinkedIn (USA)**
   - https://www.linkedin.com/jobs/search/?keywords=OSINT%20Analyst&location=United%20States&f_WT=2&f_TPR=r259200&f_SB2=2
   - https://www.linkedin.com/jobs/search/?keywords=Threat%20Intelligence%20Analyst&location=United%20States&f_WT=2&f_TPR=r259200&f_SB2=2
   - https://www.linkedin.com/jobs/search/?keywords=Open%20Source%20Intelligence&location=United%20States&f_WT=2&f_TPR=r259200&f_SB2=2

2b. **LinkedIn (Canada)**
   - https://www.linkedin.com/jobs/search/?keywords=OSINT%20Analyst&location=Canada&f_WT=2&f_TPR=r259200
   - https://www.linkedin.com/jobs/search/?keywords=Threat%20Intelligence%20Analyst&location=Canada&f_WT=2&f_TPR=r259200
   - https://www.linkedin.com/jobs/search/?keywords=Open%20Source%20Intelligence&location=Canada&f_WT=2&f_TPR=r259200

3. **ZipRecruiter**
   - https://www.ziprecruiter.com/jobs-search?search=OSINT+Analyst&location=Remote
   - https://www.ziprecruiter.com/jobs-search?search=Threat+Intelligence+Analyst&location=Remote

4. **Dice** (tech-focused)
   - https://www.dice.com/jobs?q=OSINT+Analyst&location=Remote&radius=30&radiusUnit=mi&page=1&pageSize=20&filters.postedDate=THREE&filters.employmentType=FULLTIME
   - https://www.dice.com/jobs?q=Threat+Intelligence+Analyst&location=Remote&radius=30&radiusUnit=mi&page=1&pageSize=20&filters.postedDate=THREE

5. **Glassdoor**
   - https://www.glassdoor.com/Job/remote-osint-analyst-jobs-SRCH_IL.0,6_IS11047_KO7,20.htm

6. **We Work Remotely**
   - https://weworkremotely.com/remote-jobs/search?term=OSINT

7. **Remote.co**
   - https://remote.co/remote-jobs/search/?search_keywords=OSINT+Analyst

8. **BuiltIn** (startup/tech companies)
   - https://builtin.com/jobs/remote?search=OSINT+Analyst
   - https://builtin.com/jobs/remote?search=Threat+Intelligence

9. **Idealist** (NGOs and nonprofits)
   - https://www.idealist.org/en/jobs?q=OSINT&remoteOnly=true&country=US
   - https://www.idealist.org/en/jobs?q=OSINT&remoteOnly=true&country=CA

10. **USAJobs** (federal/public sector, USA only)
    - https://www.usajobs.gov/search/results/?k=OSINT+Analyst&p=1&hp=public&wt=15317

10b. **Job Bank Canada** (federal/public sector, Canada only)
    - https://www.jobbank.gc.ca/jobsearch/jobsearch?searchstring=OSINT+analyst&date_posted=3
    - https://www.jobbank.gc.ca/jobsearch/jobsearch?searchstring=intelligence+analyst&date_posted=3

11. **ClearanceJobs** (include clearance-preferred and no-clearance roles; still filter OUT hard clearance requirements)
    - https://www.clearancejobs.com/jobs?keywords=OSINT+Analyst&location=Remote&radius=0
    - https://www.clearancejobs.com/jobs?keywords=Intelligence+Analyst&location=Remote&radius=0
    - https://www.clearancejobs.com/jobs?keywords=Threat+Intelligence&location=Remote&radius=0

12. **Hired** (tech-focused marketplace)
    - https://hired.com/q-osint-analyst-jobs
    - https://hired.com/q-intelligence-analyst-jobs
    - https://hired.com/q-threat-intelligence-analyst-jobs

13. **Broad web search** — run these queries:
    - `"OSINT Analyst" remote job posted this week`
    - `"threat intelligence analyst" remote USA site:builtin.com OR site:glassdoor.com`
    - `"open source intelligence" analyst remote job nonprofit OR NGO USA`
    - `"OSINT Analyst" remote job Canada 2026`
    - `"threat intelligence analyst" remote Canada site:linkedin.com OR site:glassdoor.com`
    - `"open source intelligence" analyst remote Canada nonprofit OR NGO`

---

## STEP 3 — Extract and Filter

For each listing found, extract:
- **Job title**
- **Company name**
- **Industry** (e.g. Cybersecurity, Finance/AML, Nonprofit, Tech/Trust & Safety, Law, Media)
- **Location type** — classify as one of:
  - `Remote` — fully remote, no office requirement (US or Canada)
  - `Remote — CA` — fully remote but **Canada only** (if explicitly restricted to Canadian residents/workers)
  - `Hybrid — [State/Province]` — mix of remote and in-office; use US state abbreviation or Canadian province abbreviation (e.g. "Hybrid — VA", "Hybrid — ON")
  - `On-site — [State/Province]` — in-office required (e.g. "On-site — TX", "On-site — BC")
  - `Unknown` — location not clearly stated
- **Date posted**
- **Salary** (exact figure, range, or "Not listed" if absent)
- **Brief description** (2–3 sentences)
- **Direct URL** to the listing
- **Clearance required?** (Hard requirement / Preferred only / None / Unknown)

**Filter OUT:**
- Any URL already present in the seen-jobs log from Step 1

**Include if salary is "Not listed"** — do not exclude jobs just because no salary is shown; flag them clearly so Dennis can research compensation separately.

**Flag as high-interest** (⭐) if ALL of the following are true:
- No clearance required
- Salary is listed at $75,000+ OR salary is not listed
- Company operates in: financial crime/AML, cybersecurity firm, social media/trust & safety, investigative journalism, NGO/human rights, or law firm

---

## STEP 4 — Update the Seen-Jobs Log

Append all newly found job URLs (even filtered-out ones) to the seen-jobs JSON array and write the updated file back to:
`/Users/denniskeefe/.claude/scheduled-tasks/osint-analyst-job-search/seen-jobs.json`

This prevents the same listings from appearing in future runs.

---

## STEP 5 — Log New Jobs to Notion

Use the Notion MCP tools to log each NEW (not previously seen) job that passed the filters.

1. Search Notion for a database called "OSINT Job Tracker" using the `notion-search` tool.
2. If it does not exist, create it with the `notion-create-database` tool under the user's default workspace with these properties:
   - **Job Title** (title)
   - **Company** (rich_text)
   - **Industry** (select: Cybersecurity, Finance/AML, Nonprofit, Tech/Trust & Safety, Law, Media, Government, Other)
   - **Location** (rich_text)
   - **Salary** (rich_text)
   - **Date Posted** (date)
   - **Date Found** (date)
   - **Clearance** (select: None, Preferred, Required, Unknown)
   - **High Interest** (checkbox)
   - **URL** (url)
   - **Status** (select: New, Reviewing, Applied, Interviewing, Rejected, Offer)
3. For each new job, create a page in the database using `notion-create-pages` with Status = "New", Date Found = today's date, and **Location** set to the classified location type from Step 3 (e.g. "Remote", "Hybrid — VA", "On-site — TX", "Unknown").

---

## STEP 6 — Write New Jobs to data/jobs.json and Push to GitHub

The Vercel dashboard reads `/Users/denniskeefe/Documents/jobsearch/data/jobs.json` directly from the git repo. Every push to `main` triggers a Vercel rebuild. Follow these steps:

1. **Read the existing file:**
   `/Users/denniskeefe/Documents/jobsearch/data/jobs.json`
   It is a JSON array of job objects (may be empty on first run).

2. **Build new job objects** for each job that passed the filters in Step 3. Each object must match this TypeScript shape exactly:
   ```json
   {
     "id": "<url-safe unique string, e.g. slug of company+title+date>",
     "jobTitle": "...",
     "company": "...",
     "industry": "Cybersecurity" | "Finance/AML" | "Nonprofit" | "Tech/Trust & Safety" | "Law" | "Media" | "Government" | "Other" | null,
     "location": "Remote" | "Hybrid — VA" | "On-site — TX" | "Unknown" | "...",
     "salary": "...",
     "datePosted": "YYYY-MM-DD" | null,
     "dateFound": "YYYY-MM-DD",
     "highInterest": true | false,
     "clearance": "None" | "Preferred" | "Required" | "Unknown" | null,
     "status": "New",
     "jobUrl": "https://..."
   }
   ```
   - `id`: generate a stable slug (e.g. `"acme-osint-analyst-2025-05-09"`) — must be unique within the file.
   - `dateFound`: today's date in `YYYY-MM-DD` format.
   - `status`: always `"New"` for freshly discovered jobs.
   - `salary`: use the extracted salary string, or `null` if not listed.

3. **Merge into the existing array**: append only the new job objects (do not duplicate entries already in the file by matching on `id`). Then **prune any entries where `dateFound` is more than 30 days before today** — these will no longer appear on the dashboard. Write the complete merged (and pruned) array back to:
   `/Users/denniskeefe/Documents/jobsearch/data/jobs.json`

4. **Commit and push** from the repo root `/Users/denniskeefe/Documents/jobsearch`:
   ```bash
   cd /Users/denniskeefe/Documents/jobsearch
   git add data/jobs.json
   git commit -m "chore: add <N> new job listings [<YYYY-MM-DD>]"
   git push origin main
   ```
   Replace `<N>` with the count of new jobs added and `<YYYY-MM-DD>` with today's date.
   Vercel will automatically detect the push and redeploy the dashboard.

---

## STEP 7 — Send Gmail Digest

Use the Gmail MCP tools to send an email digest to Dennis.

- **To:** the user's primary Gmail address (find it via the Gmail tools if needed)
- **Subject:** `🔍 OSINT Job Alert — [X] New Listings [Today's Date]`
- **Body:** formatted summary (see Output Format below)

If zero new jobs were found after deduplication, still send the email with subject: `🔍 OSINT Job Alert — No New Listings Today [Date]`

---

## OUTPUT FORMAT (for email body and notification)

```
## OSINT Analyst Remote Jobs — [Today's Date]
## Coverage: USA + Canada | Salary filter: $75,000+ USD (or CAD equivalent)

### ⭐ High-Interest Roles
1. [Job Title] — [Company] | [Industry] | Posted: [date]
   Location: [Remote | Hybrid — State | On-site — State | Unknown]
   Salary: [amount or "Not listed"]
   [2-3 sentence description]
   Clearance: None/Preferred/Unknown
   [URL]

### Other New Listings
...

### By Source Summary
- Indeed (USA): X new
- Indeed (Canada): X new
- LinkedIn (USA): X new
- LinkedIn (Canada): X new
- Dice: X new
- Glassdoor: X new
- BuiltIn: X new
- We Work Remotely: X new
- Remote.co: X new
- Idealist: X new
- USAJobs: X new
- Job Bank Canada: X new
- ClearanceJobs: X new
- Hired: X new
- Web search: X new

### Totals
- Total new listings today: X
- High-interest (⭐): X
- Salary listed ($75k+): X
- Salary not listed (included): X
- Below $75k (excluded): X
- Clearance-free: X
- Clearance-preferred (open to uncleared): X
- Already seen (skipped): X
```