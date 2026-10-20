# Show day

One page. Keep it open on a second screen.

Control room: `https://citizenxp.github.io/atdawn-studio/studio/admin.html`

---

## The day before

- [ ] Open the control room and log in. If **New event** has not been pressed since your
      last show, your rooms and all your Guest Links are still valid.
- [ ] **Guest Links** tab: add every guest by name, copy each one their personal invite.
- [ ] Preload the OBS solo links as browser sources. They sit dark until the guest is live.
- [ ] Send each guest the invite plus these three lines:
      - Use **Chrome or Edge on a computer**, not a phone, not Safari.
      - Wear **headphones**.
      - Keep **10 GB free**: your computer records the master copy.
- [ ] Install ffmpeg once, so converting the takes afterwards is instant:
      `winget install Gyan.FFmpeg`

## Sound check (30 minutes before)

- [ ] Every guest joins and lands in the waiting room. Admit them to the green room.
- [ ] **Listen** on the green room. Check every guest individually.
      Do not produce and guest from the same machine: your own mic will sound dead
      to you because the browser cancels it. That is not a fault.
- [ ] **Studio recordings** panel: press **Re-check**. Every guest must say
      *Not recording*, not *Cannot record*. **Fix this now, not at the top of the show.**
      *Cannot record* almost always means Safari or a phone.
- [ ] Connection dots on the guest cards: green or amber. A red dot before you start is
      a guest who needs to move closer to their router or turn their camera down.
- [ ] Talk to the room once so guests hear your voice and know what it sounds like.

## Rolling

1. [ ] **Start recording everyone**, before anything you might want to keep.
       The panel should show *Recording* with a running clock for every guest.
2. [ ] Confirm the panel says **ARMED**. That is what re-starts a guest who refreshes.
3. [ ] Send guests to broadcast as they are introduced.
4. [ ] Glance at the recordings panel every so often. A guest who drops to
       *Not recording* and does not come back within about fifteen seconds is worth a
       quiet word over Whisper.

## Wrapping

- [ ] **Stop recording everyone.** Guests get an on-screen note telling them where the
      file is.
- [ ] **Before anyone leaves**, get each guest to confirm they can see their `.webm`
      file in Downloads. This is the one step with no undo.
- [ ] Collect the files. A guest who refreshed mid-show has two; you want both.
- [ ] Convert them. Do this even if your editor opens .webm: the raw files carry no
      duration in the header, so editors mis-scrub or refuse them.
      `.\studio\tools\convert-recordings.ps1 -Path C:\where\the\files\are`

---

## When something goes wrong

**A guest's video freezes but audio is fine.** Leave it. Their studio recording is
unaffected: it never travelled over the network. Ask them to turn their camera off and
on if you need the live picture back.

**A guest says *Cannot record*.** They are on Safari, iOS, or a browser without
MediaRecorder. The live call still works and your safety copy on this machine still
records them. Note it and fix it after the show.

**A guest refreshes or crashes.** They rejoin and recording restarts by itself while
ARMED. They will have two files. Nothing to do live.

**The whole call goes sideways.** Guests' recordings keep running on their own machines
regardless of what the connection does. Get the files afterwards; the show is probably
salvageable even if the live feed was not.

**You accidentally close the control room.** It warns you first. If it happens, guests
keep recording regardless. Reopen the dashboard and log in: within about fifteen seconds
the panel re-discovers who is rolling and re-ARMS itself. Do nothing else. In particular
do **not** press the big record button to "start it again": by then it reads **Stop
recording everyone**, and pressing it would end the takes.
