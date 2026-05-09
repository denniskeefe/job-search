---
name: osint-analyst-job-search
description: Weekday + Saturday search for remote OSINT Analyst jobs in the USA with deduplication, Notion tracking, and Gmail digest
---

You are an automated job search agent. Your goal is to find NEW remote OSINT/Intelligence Analyst job openings in the USA paying at or above the configured salary minimum, deduplicate against previously seen listings, log new ones to a Notion database, and send a Gmail digest. No security clearance is required.

---

## STEP 1 — Load the Seen-Jobs Log (Deduplication)

Read the deduplication log at:
`/Users/denniskeefe/.claude/scheduled-tasks/osint-analyst-job-search/seen-jobs.json`

If the file does not exist, treat the seen-jobs list as empty and create the file at the end of this run. The file is a JSON array of URL strings, e.g. `["https://...", "https://..."]`.

---

## STEP 2 — Search All Job Boards

Search each of the following URLs. For each board, also try keyword variations beyond just "OSINT Analyst" — include:
- `"Open Source Intelligence Analyst"`
- `"OSINT Investigator"`
- `"OSINT Researcher"`
- `"Threat Intelligence Analyst"`
- `"Digital Intelligence Analyst"`
- `"Trust and Safety Analyst"`
- `"Due Diligence Analyst"`

### Job Boards to Search:

1. **Indeed** (salary filter applied via URL where supported)
   - https://www.indeed.com/jobs?q=OSINT+Analyst&l=Remote&fromage=3
   - https://www.indeed.com/jobs?q=%22Open+Source+Intelligence%22&l=Remote&fromage=3
   - https://www.indeed.com/jobs?q=%22Threat+Intelligence+Analyst%22&l=Remote&fromage=3
   - https://www.indeed.com/jobs?q=%22Trust+and+Safety+Analyst%22&l=Remote&fromage=3

2. **LinkedIn**
   - https://www.linkedin.com/jobs/search/?keywords=OSINT%20Analyst&location=United%20States&f_WT=2&f_TPR=r259200&f_SB2=2
   - https://www.linkedin.com/jobs/search/?keywords=Threat%20Intelligence%20Analyst&location=United%20States&f_WT=2&f_TPR=r259200&f_SB2=2
   - https://www.linkedin.com/jobs/search/?keywords=Open%20Source%20Intelligence&location=United%20States&f_WT=2&f_TPR=r259200&f_SB2=2

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

10. **USAJobs** (federal/public sector)
    - https://www.usajobs.gov/search/results/?k=OSINT+Analyst&p=1&hp=public&wt=15317

11. **Broad web search** — run these queries:
    - `"OSINT Analyst" remote USA job posted this week -clearance`
    - `"threat intelligence analyst" remote USA site:builtin.com OR site:glassdoor.com`
    - `"open source intelligence" analyst remote job nonprofit OR NGO USA 2025`

---

## STEP 3 — Extract and Filter

For each listing found, extract:
- **Job title**
- **Company name**
- **Industry** (e.g. Cybersecurity, Finance/AML, Nonprofit, Tech/Trust & Safety, Law, Media)
- **Location** (must be Remote + USA)
- **Date posted**
- **Salary** (exact figure, range, or "Not listed" if absent)
- **Brief description** (2–3 sentences)
- **Direct URL** to the listing
- **Clearance required?** (Hard requirement / Preferred only / None / Unknown)

**Filter OUT:**
- Any job with active US security clearance (TS, TS/SCI, Secret, etc.) as a hard requirement
- Jobs outside the USA or not remote/hybrid-remote
- Any URL already present in the seen-jobs log from Step 1

**Include if salary is "Not listed"** — do not exclude jobs just because no salary is shown; flag them clearly so the user can research compensation separately.

**Flag as high-interest** (⭐) if ALL of the following are true:
- No clearance required
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
   - **Salary** (rich_text)
   - **Date Posted** (date)
   - **Date Found** (date)
   - **Clearance** (select: None, Preferred, Required, Unknown)
   - **High Interest** (checkbox)
   - **URL** (url)
   - **Status** (select: New, Reviewing, Applied, Interviewing, Rejected, Offer)
3. For each new job, create a page in the database using `notion-create-pages` with Status = "New" and Date Found = today's date.

---

## STEP 6 — Send Gmail Digest

Use the Gmail MCP tools to send an email digest.

- **To:** the user's primary Gmail address (find it via the Gmail tools if needed)
- **Subject:** `🔍 OSINT Job Alert — [X] New Listings [Today's Date]`
- **Body:** formatted summary (see Output Format below)

If zero new jobs were found after deduplication, still send the email with subject: `🔍 OSINT Job Alert — No New Listings Today [Date]`

---

## OUTPUT FORMAT (for email body and notification)

```
## OSINT Analyst Remote Jobs — [Today's Date]

### ⭐ High-Interest Roles
1. [Job Title] — [Company] | [Industry] | Posted: [date]
   Salary: [amount or "Not listed"]
   [2-3 sentence description]
   Clearance: None/Preferred/Unknown
   [URL]

### Other New Listings
...

### By Source Summary
- Indeed: X new
- LinkedIn: X new
- Dice: X new
- Glassdoor: X new
- BuiltIn: X new
- We Work Remotely: X new
- Remote.co: X new
- Idealist: X new
- USAJobs: X new
- Web search: X new

### Totals
- Total new listings today: X
- High-interest (⭐): X
- Salary listed: X
- Salary not listed (included): X
- Clearance-free: X
- Clearance-preferred (open to uncleared): X
- Already seen (skipped): X
```
