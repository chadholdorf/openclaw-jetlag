# openclaw-jetlag

Scans Google Calendar for flight events (the kind airlines auto-add from confirmation emails), parses the route, calculates the timezone shift, and writes a personalized circadian adjustment plan back to your calendar — with sleep shifts, light exposure windows, and melatonin timing scaled to the size of the jump.

Skips short hops (< 2h timezone difference). Generates longer runways for bigger shifts like SFO → DEL.

## What gets added to your calendar

For each qualifying flight:

- **🌙 Bedtime shifts** — pre-departure events that gradually move your sleep window toward the destination timezone
- **☀️ Light exposure windows** — timed morning (or evening) light cues to advance or delay your clock
- **💊 Melatonin reminders** — only for shifts ≥ 4 hours
- **☕ Arrival-day strategy** — when to stay awake, avoid naps, and get outside
- **✅ Recovery check-ins** — a Day 2 event with tips if you're still struggling
- **✈️ JetLag Plan summary event** — a single anchor event showing the full plan overview

## Install

**Requirements:** Node.js 18+

1. Clone this repo and enter the directory:
   ```bash
   git clone https://github.com/chadholdorf/openclaw-jetlag.git
   cd openclaw-jetlag
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the env template:
   ```bash
   cp .env.example .env
   ```

4. Go to [Google Cloud Console](https://console.cloud.google.com) → **APIs & Services** → **Library** → enable **Google Calendar API**.

5. Go to **APIs & Services** → **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**.
   - Application type: **Desktop app**
   - Download the JSON or copy the Client ID and Secret

6. Paste your credentials into `.env`:
   ```
   GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your_client_secret
   ```

7. Run it:
   ```bash
   node index.js
   ```

8. A browser window opens for Google OAuth. Authorize access, paste the code back into the terminal.

9. The tool scans your calendar, skips short hops, and writes adjustment plans for qualifying flights. Open Google Calendar to review.

> Authorization is saved to `.oauth-token.json` (gitignored). Subsequent runs skip the browser step.

## How plans are scaled

| Timezone shift | Runway before departure | Melatonin |
|---|---|---|
| 2–3 hours | 1 day | No |
| 4–6 hours | 2 days | Yes |
| 7–9 hours | 3 days | Yes |
| 10+ hours (e.g. SFO → India) | 5 days | Yes |

## Supported airports

100+ major airports across North America, Europe, Middle East, South/Southeast/East Asia, Oceania, and South America. See `AIRPORT_TZ` in `index.js` to add more.

## License

MIT
