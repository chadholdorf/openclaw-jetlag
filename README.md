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

**Requirements:** Node.js 18+. Check with `node --version`. Download at https://nodejs.org if needed.

### Step 1 — Clone and install

```bash
git clone https://github.com/chadholdorf/openclaw-jetlag.git
cd openclaw-jetlag
npm install
```

### Step 2 — Create your `.env` file

```bash
cp .env.example .env
```

You'll fill in the two values in this file during steps 4–6 below.

### Step 3 — Create a Google Cloud project

1. Go to [console.cloud.google.com](https://console.cloud.google.com) and sign in with your Google account.
2. Click the project dropdown in the top-left corner (it may say "Select a project" or show an existing project name).
3. Click **New Project** → give it any name (e.g. `jetlag`) → click **Create**.
4. Wait a few seconds, then make sure your new project is selected in the top-left dropdown.

### Step 4 — Enable the Google Calendar API

1. In the left sidebar, click **APIs & Services → Library**.
2. In the search box, type `Google Calendar API`.
3. Click the result → click **Enable**.

### Step 5 — Configure the OAuth consent screen

> This is a one-time setup that lets you authorize the app to access your own calendar.

1. In the left sidebar, click **APIs & Services → OAuth consent screen**.
2. Choose **External** → click **Create**.
3. Fill in the required fields:
   - **App name**: anything (e.g. `jetlag`)
   - **User support email**: your email address
   - **Developer contact information**: your email address
4. Click **Save and Continue**.
5. On the **Scopes** page — click **Save and Continue** (no changes needed).
6. On the **Test users** page — click **+ Add Users**, enter your Google account email, then click **Add** → **Save and Continue**.
7. Click **Back to Dashboard**.

### Step 6 — Create OAuth credentials

1. In the left sidebar, click **APIs & Services → Credentials**.
2. Click **+ Create Credentials → OAuth 2.0 Client ID**.
3. Under **Application type**, choose **Desktop app**.
4. Give it any name → click **Create**.
5. A dialog appears showing your **Client ID** and **Client Secret**.
6. Open your `.env` file and paste the values:

```
GOOGLE_CLIENT_ID=<paste Client ID here>
GOOGLE_CLIENT_SECRET=<paste Client Secret here>
```

### Step 7 — Run it

```bash
node index.js
```

On the first run, a browser window opens (or a URL is printed if the browser can't be opened automatically). Sign in and click **Allow**. Google will show you a short code — paste it back into the terminal and press Enter.

Your authorization is saved to `.oauth-token.json`. Subsequent runs skip this step entirely.

### Step 8 — Check your calendar

The tool scans your primary Google Calendar for flight events in the next 90 days, skips short hops (< 2h timezone difference), and writes adjustment plans for qualifying flights. Open Google Calendar to review the new events.

---

## Troubleshooting

**"No flight events found"**
Google Calendar auto-imports flights from Gmail. Make sure the Gmail account linked to your calendar has received airline confirmation emails (United, Delta, American, Southwest, etc.).

**"No plans were created"**
Check the warnings printed above — most common causes are an airport code not in the built-in map, or a route format the parser didn't recognize. See `AIRPORT_TZ` in `index.js` to add a missing airport.

**Auth error / token expired**
Delete the saved token and re-run:
```bash
rm .oauth-token.json && node index.js
```

---

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
