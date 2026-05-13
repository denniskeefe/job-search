# OSINT Analyst Job Search Routine

An automated daily job search agent that finds remote OSINT/Intelligence Analyst openings in the **USA and Canada**, deduplicates results, logs them to Notion, and sends a Gmail digest.

## What It Does

Runs every day at 8:04 AM. Each run:

1. Loads a deduplication log to skip already-seen listings
2. Searches 14+ job boards and runs broad web queries (USA and Canada)
3. Extracts and classifies each listing (location, salary, clearance, industry)
4. Updates the deduplication log
5. Logs new listings to a Notion database ("OSINT Job Tracker")
6. Sends a Gmail digest summarizing new finds

## Job Boards Searched

- Indeed (USA + Canada)
- LinkedIn (USA + Canada)
- ZipRecruiter
- Dice
- Glassdoor
- We Work Remotely
- Remote.co
- BuiltIn
- Idealist (USA + Canada)
- USAJobs
- Job Bank Canada
- ClearanceJobs
- Hired
- Broad web search (USA + Canada queries)

## Keywords

- OSINT Analyst
- Open Source Intelligence Analyst
- Open Source Investigations Specialist
- OSINT Investigator
- OSINT Researcher
- OSINT Specialist
- Threat Intelligence Analyst
- Digital Intelligence Analyst
- Trust and Safety Analyst
- Social Media Analyst
- Due Diligence Analyst
- Human Rights Investigator
- War Crimes Investigator

## Filters

- **Included:** all salary levels — salary is logged per listing where available
- **Included:** remote, hybrid, and on-site roles — each listing is labeled with its location type
- **Included:** all clearance levels (None, Preferred, Required) — clearance status is logged per listing
- **Coverage:** USA and Canada

## Location Labels

Each listing is classified as:
- `Remote` — fully remote, open to USA and/or Canada
- `Remote — CA` — fully remote but restricted to Canadian residents
- `Hybrid — [State/Province]` — mix of remote and in-office (e.g. `Hybrid — VA`, `Hybrid — ON`)
- `On-site — [State/Province]` — in-office required (e.g. `On-site — TX`, `On-site — BC`)
- `Unknown` — location not clearly stated

## High-Interest Flag (⭐)

A listing is flagged high-interest if it meets all of:
- No clearance required
- Company operates in: financial crime/AML, cybersecurity, social media/trust & safety, investigative journalism, NGO/human rights, or law

## Output

Each digest includes job title, company, industry, location, salary, description, clearance status, and a direct URL. A summary section breaks down totals by source and category.

## Files

| File | Purpose |
|------|---------|
| `SKILL.md` | Full agent instructions |
| `seen-jobs.json` | Deduplication log (local, not tracked in git) |
