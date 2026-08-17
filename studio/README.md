# At Dawn Studio: a producer wrapper for VDO.Ninja

A button-driven control room and a Zoom-simple guest experience, layered on top of a
self-hosted [VDO.Ninja](https://vdo.ninja). **No VDO.Ninja source files are modified**:
everything lives in this `/studio/` folder, so you can update VDO.Ninja itself at any time.

## License & credits

This project builds on **[VDO.Ninja](https://github.com/steveseguin/vdo.ninja)** by
**Steve Seguin**, licensed under the **AGPL-3.0** (see `LICENCE.md` and `AGPLv3.md` in
the repository root). All the real-time video magic is his work. This folder only adds
a workflow wrapper around it.

The `/studio/` wrapper is likewise released under **AGPL-3.0**. The AGPL requires that
modifications to the code stay publicly accessible, and hosting this repository publicly
(e.g. on GitHub) satisfies that requirement. If you fork this, please keep this notice,
keep the repo public, and consider [supporting Steve's work](https://github.com/sponsors/steveseguin).

---

## The three pages

| Page | Who uses it | What it does |
|---|---|---|
| `studio/index.html` | everyone | Landing page: pick Guest or Producer |
| `studio/join.html` | guests | Name prompt → camera/mic pick → **waiting room** → green room → moved to broadcast. Simple mic / camera / chat / settings / leave buttons only. |
| `studio/admin.html` | you + admins | Password-protected control room: both rooms as full director views, a guest board with **Admit / Send to broadcast / Mute / Record / Solo link / Kick** buttons, and one-click copy for every link you'll ever need. |

Set your own admin password before your first real event: Settings → Admin password,
then paste the generated line into `studio/config.js`. Only the SHA-256 hash is stored,
so the password itself never enters this repository.

## How the flow works

1. **You** open the Control Room and copy the **Guest invite link** (Overview tab).
2. **Guest** opens it, types their name, picks camera/mic, presses START.
3. They land in the **waiting room** (VDO.Ninja "hold" mode): they're connected and your
   team can already see & hear them, but they're isolated from everyone else.
4. On the guest board (or the Green Room director view) press **✚ Admit** and they drop
   into the green room and can talk with your tech team / other guests.
5. When it's showtime press **🚀 Send to broadcast** and they're transferred into the main
   room. Their screen flashes "YOU'RE LIVE" so they always know their status.
6. In OBS, add the **Main broadcast, full mix** link as a browser source, or per-guest
   **Solo link**s if you prefer to build your own layout (one browser source per person,
   with "Control audio via OBS" checked → each guest gets their own audio fader/filters).
7. **⏺ Record** on any guest records their feed to the producer's computer (the browser
   downloads a media file per recording). You can also use the full director view for
   Google-Drive/remote recording options.

Both rooms share one password (required so guests can be transferred between rooms).
Additional producers who open the dashboard automatically join as **co-directors** of
both rooms, so two admins can run green room and broadcast simultaneously.

## Producer communication tools (never reach the stream)

Your voice and messages go through the director connection, which is **never part of an
OBS scene**, so the stream cannot hear or see any of this:

- **🎧 Listen** (per room): one click and that room's audio plays in *your* headphones.
  guests aren't notified and the stream is untouched. Exclusive like PFL on a mixing
  desk: listening to one room stops the other. Works identically for co-producers on
  their own dashboards (each listens locally).
- **🎙️ Talk** (per room): your mic to everyone in that room. First use asks for browser
  mic permission (mic only: the control room never sends a camera). Click again to stop.
  You stay **completely invisible** to guests: no video tile, no name in their roster, no
  change to the group layout. They only hear you. Classic use: "we're live in 30 seconds"
  to the green room, or producer notes to the on-air panel (audience hears nothing, though
  if a live guest replies out loud, the stream hears *them*).
- **🎧 Whisper** (per guest): IFB-style, so only that one guest hears you, even mid-show.
  Automatically turns off any other whisper/room-talk in that room.
- **💬 Chat** (the round button, bottom-right of the control room): a proper text
  conversation with your guests, with a tab per room and an unread counter so you can
  keep it closed until something arrives. What you type goes to everyone in the selected
  room, signed **Control Room**; what guests type shows up here with their name. Use it
  for anything that isn't urgent enough to interrupt them: links, spellings of names,
  "your mic gain is a bit hot". Cues and timers stay out of this log, so it reads as a
  real conversation rather than a record of every prompt you fired.
- **📣 Cue** (per guest or per room): canned or custom messages that appear as a large
  banner on the guest's screen for ~9 seconds, with a soft chime. Guests never need to
  open the chat window to get these.
- **⏱ Timer** (per room): a countdown appears on every guest's screen; goes red and
  pulses in the last 15 seconds. "Clear timer" removes it.
- **🔇 Mute all / 🔊 Unmute** (per room): panic button for the broadcast, or quiet the
  green room before a cue.

## Guest tools

Guests get: mic, camera, **background blur**, **✋ raise hand** (shows instantly on your
guest board with an amber highlight), **chat**, settings (device switching), leave. When
they go on air they get a persistent red **ON AIR** pill centred in the top bar, above the
video so it covers nobody's face, plus a brief green
border **flash** (it pulses when they go live, then fades, so it doesn't frame the whole
call the entire time). Cues from the control room appear as a single styled banner.

**CHAT** slides out a panel on the right: everyone in their room plus the control room,
with a dot on the button when something arrives while it's closed. Messages from you are
marked **Control Room**. Turn on *Private chat* in Settings and guests' messages go only
to producers, and the panel says so, so nobody types something awkward assuming privacy that
isn't there.

## Guest Links: permanent, preloadable links (Guest Links tab)

For repeat events you can build everything **before** show day instead of copying links
while guests trickle in:

1. In the **Guest Links** tab, add each guest by name. Every guest gets a stable **on-air
   ID** derived from their name (e.g. *Jane Smith → `Jane_Smith`*) that never changes.
2. Copy each guest's **personal invite** (their name is pre-filled) and send it to them.
3. Copy each guest's **OBS solo link**, or use **Copy all broadcast OBS links**, and
   preload them as browser sources in OBS ahead of time. They sit dark until needed.
4. On the day: when you send a guest to broadcast, their **pre-loaded OBS source lights up
   automatically**, with no copying stream IDs mid-show.

The links stay valid as long as you keep the same rooms, so they survive across events.
Two things to know:

- **Keep your room names fixed.** The links are tied to your current green/broadcast rooms.
  Running **New event** in Settings generates fresh rooms and invalidates them. For a truly
  permanent setup across machines, set your room names once in Settings (or in
  `studio/config.js` `defaults`) and leave them.
- The roster lives in your browser. The links themselves are reproducible from the guest's
  name + your rooms, so re-adding the same name anywhere regenerates the identical links.

Ad-hoc guests still work exactly as before. The plain **Guest invite link** on the
Overview gives each walk-up guest a random ID.

## Room tabs (Green Room / Main Broadcast)

Each room has its own studio-styled tab, with no raw VDO.Ninja UI anywhere:

- **Live monitor**: a silent auto-mixed view of everyone in the room (exactly what an
  OBS mix source would show), loaded the first time you open the tab. Audio never comes
  from the monitor. Press **Listen** for that.
- The full **room toolbar** (Listen / Talk / Cue all / Timer / Mute all / Unmute) and
  the same guest cards as the Overview board, so you can run the room from either place.
- **Advanced**: opens VDO.Ninja's full director console in a new tab for the rare
  per-guest deep controls (gain, EQ, bitrate caps, scene assignment). Everyday actions
  never need it.

## Live monitors (Overview)

Below the link cards, the Overview shows a **live video thumbnail for every connected
guest**, waiting-room, green room and on-air, each with their name and a room badge
(yellow *Waiting* / green *Green* / red pulsing *On air*). It's a silent video preview:
audio still comes only from the **Listen** button, so nothing here can leak into the mix.
The feeds are mirrored straight from the control room's own connections, so they cost no
extra guest bandwidth beyond what the dashboard already receives.

## Guest board extras

- **Connection dot** on every guest: green/amber/red from live bitrate & packet-loss
  stats. Spot a failing connection before your audience does.
- **📝 Notes**: private per-guest notes only producers see ("needs new mic", "intro at
  :15"). Saved in your browser.
- **⏺ Record** starts instantly at the quality chosen in Settings (no dialog).
  **Auto-record while on air** (checkbox in the OBS card) starts a recording the moment
  any guest lands in the main room; files download to the producer's computer.
- **👥 Huddles** (per guest): private sub-groups inside a room. Guests in different
  huddles can't see or hear each other, but producers, non-huddled guests and the OBS
  feeds still get everyone. Perfect for letting co-hosts confer while another guest is
  being staged. Assign/remove from the huddle button on any guest card (up to 3 huddles
  per room, guests can be in several).
- **Name labels on OBS mixes** (checkbox): re-copy the scene links to include guest
  name overlays.

## Show settings (Settings tab)

All of these are baked into the links you copy, so re-copy the guest invite and OBS links
after changing them:

- **Noise gate**: auto-ducks each guest's mic while they aren't speaking. It kills
  keyboard clatter and room noise from guests in bad rooms.
- **Pro audio**: 256 kbps unprocessed stereo for music and performances. Must be on
  before links are shared (it applies to both guest and OBS links); guests are shown a
  "wear headphones" notice on the join page.
- **On-air tally**: guests get a clear red on-air indicator driven by what's actually
  in your OBS scene (on by default).
- **Private chat**: guest text chat goes only to producers instead of the whole room.
- **Live captions**: guests' speech is transcribed in their browser (Chrome) and shown
  as caption overlays on the OBS scene links: instant accessibility.
- **Standby message / image**: branded "starting soon" slate shown in OBS whenever a
  scene has no live video, instead of black.
- **Recording quality**: 2.5/6/12 Mbps video, or audio-only (Opus 256 kbps for
  podcasts, or lossless PCM). Applies to manual and auto record.
- **Stream Deck & remote control**: generate an API key and the two director
  connections register with VDO.Ninja's remote-control API
  (`https://api.vdo.ninja/<key>/<action>`). Add the keys to the free
  [Bitfocus Companion](https://bitfocus.io/companion) "VDO.Ninja" module, one instance
  per room, and drive mutes, transfers, scenes and more from physical Stream Deck
  buttons. The control room tab must stay open for commands to work.

## Deploying

### Pushing updates to GitHub (the normal workflow)

This repo is already connected to **`github.com/Jokeroker/atdawn-studio`** (branch `main`),
which GitHub Pages serves. The git repo lives in the **web-root** folder
(`vdo.ninja-30.2/vdo.ninja-30.2/`), *not* the top-level project folder, so edit the
files in this `/studio/` folder as usual, then from the top-level project folder run:

```powershell
.\deploy.ps1
```

That one script commits any changes, pushes to `main`, and keeps Pages enabled. The site
goes live 1–3 minutes later at `https://jokeroker.github.io/atdawn-studio/studio/`.
It only needs a one-time `gh auth login` if the GitHub CLI ever reports you're signed out.

### Hosting options

This folder deploys with the rest of VDO.Ninja, so any static hosting works:

- **GitHub Pages** (easiest, free, SSL included): fork/push this whole repo and enable
  Pages, exactly as described in the tutorial video / `install.md`. Your links become
  `https://<you>.github.io/<repo>/studio/admin.html` etc.
- **Nginx / your own server**: follow `install.md` in the repo root. The `/studio/`
  folder needs no special server config.

Two rules:

1. **HTTPS is required** (browsers refuse camera access otherwise). `http://localhost`
   is fine for testing.
2. Keep `/studio/` on the **same domain** as VDO.Ninja (it ships inside the repo, so it
   is by default). The dashboard and guest status detection read state from the embedded
   frames, which requires same-origin.

## Configuring

Edit `studio/config.js`:

- `brandName`: shown on every page.
- `adminPasswordHash`: SHA-256 of the dashboard password (generate in Settings).
- `vdoPath`: leave as `"../"` unless you moved the folder.
- `defaults`: the event preset (room names, room password) used on first run.
  Day-to-day changes are done in the dashboard's Settings tab and are stored in the
  producer's browser (localStorage), no server edits needed.

## Notes, honestly

- The admin login is a **front gate, not a vault**: this is a static site, so the real
  security is the room password + which links you share. Use unguessable room IDs and
  passwords (the "New event" button generates them), and don't share the admin page URL
  publicly.
- Guest links embed the room password by default for one-click joining. Tick
  *"Guests must type the event password"* to keep it out of the link instead.
- Talking to green-room guests: open the **Green Room** tab and use the director's
  mic/"press to talk" controls. You're a real VDO.Ninja director there, with every
  advanced control (audio gain, EQ, quality, scenes, hand-raise, chat…).
- Recording quality: director-side recording captures the live stream. For mission
  critical audio, VDO.Ninja pro tip: ask guests to also record locally, or use the
  director view's per-guest recording options.
- Updating VDO.Ninja later: replace everything except the `/studio/` folder.
