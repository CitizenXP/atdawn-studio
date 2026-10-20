# Themes

A theme is one CSS file that re-declares brand tokens. It loads *after*
`studio.css`, so it only needs the handful of values it wants to change.
Everything else (layout, components, spacing) stays in `studio.css` and is
never forked.

## Using one

In `studio/config.js`:

```js
theme: "atdawn"
```

`""` or `"default"` uses the neutral slate-and-blue look built into
`studio.css`. Any other value loads `studio/themes/<value>.css`.

## Making one

Copy `atdawn.css`, rename it, and change the tokens:

| Token | What it controls |
|---|---|
| `--accent`, `--accent-rgb` | Primary brand colour. Buttons, focus rings, active states. Keep the two in sync: one is hex, the other the same colour as `r, g, b` so it can be used inside `rgba()`. |
| `--accent-2`, `--accent-2-rgb` | Second colour, used as the far end of `--accent-grad` and in primary-button shadows. |
| `--accent-grad` | The gradient on primary buttons and the brandmark dot. |
| `--brandmark-inset` | Inner shading on the brandmark dot. `transparent` for a flat dot. |
| `--page-glow` | Background wash behind every page. `none` for flat. |
| `--cue-bg`, `--cue-text` | The large on-screen message guests see when you send a cue. |
| `--bg`, `--text`, `--line` | Base surfaces and text, if the accent alone isn't enough. |

Status colours (`--good`, `--warn`, `--live`) are semantic rather than brand:
green means healthy and red means live in every theme, so leave them alone
unless you have a reason.

Set the product name separately, with `brandName` in `config.js`.
