# OpenClaw Jetlag — Circadian Adjustment Planner

## What This Is
Automated jetlag planner that scans Google Calendar for flights, calculates timezone shifts, and writes a multi-day circadian adjustment plan back to the calendar as timed events with reminders.

## Stack
- **Runtime:** Node.js 18+ (ES Modules)
- **Dependencies:** googleapis (Calendar v3), luxon (timezone math), dotenv, open
- **Auth:** OAuth2 desktop flow, token cached in `.oauth-token.json`
- **Entry:** `index.js` (640 lines, single file)

## How It Works
1. Scans next 90 days of Google Calendar for flight events
2. Detects 30+ airlines by keyword + IATA flight number regex
3. Parses origin/destination, looks up timezones (180+ airports mapped)
4. Skips flights with <2h timezone shift
5. Generates plan: bedtime shifts, light exposure, melatonin timing, arrival strategy
6. Creates 14-20 calendar events per flight (color-coded sage green)
7. Deduplicates — won't re-plan existing flights

## Plan Scaling
- 2-3h shift → 1 day prep
- 4-6h shift → 2 days prep + melatonin
- 7-9h shift → 3 days prep + melatonin
- 10+h shift → 5 days prep + melatonin

## Integration
- Standalone CLI: `node index.js`
- OpenClaw Skill: callable via "check my flights" / "run jetlag planner"
- SKILL.md defines OpenClaw frontmatter integration

## Config
```
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_REDIRECT_URI=urn:ietf:wg:oauth:2.0:oob
```
