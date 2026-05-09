# OSINT Analyst Job Search Routine

An automated daily job search agent that finds remote OSINT/Intelligence Analyst openings in the USA, deduplicates results, logs them to Notion, and sends a Gmail digest.

## What It Does

Runs every day at 8:04 AM. Each run:

1. Loads a deduplication log to skip already-seen listings
2. Searches 10+ job boards and runs broad web queries
3. Extracts and classifies each listing (location, salary, clearance, industry)
4. Updates the deduplication log
5. Logs new listings to a Notion database ("OSINT Job Tracker")
6. Sends a Gmail digest summarizing new finds

## Job Boards Searched

- Indeed
- LinkedIn
- ZipRecruiter
- Dice
- Glassdoor
- We Work Remotely
- Remote.co
- BuiltIn
- Idealist
- USAJobs
- Broad web search

## Keywords

- OSINT Analyst
- Open Source Intelligence Analyst
- OSINT Investigator
- OSINT Researcher
- Threat Intelligence Analyst
- Digital Intelligence Analyst
- Trust and Safety Analyst
- Due Diligence Analyst

## Filters

- **Excluded:** jobs requiring active US security clearance (TS, TS/SCI, Secret, etc.)
- **Excluded:** jobs outside the USA
- **Included:** remote, hybrid, and on-site roles — each listing is labeled with its location type

## Location Labels

Each listing is classified as:
- `Remote` — fully remote
- `Hybrid — [State]` — mix of remote and in-office
- `On-site — [State]` — in-office required
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
