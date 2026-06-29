[PLANS]
- 2026-06-29T00:33:15+01:00 [TOOL] Fix mobile start flow so the waiting screen can be dismissed without a keyboard.

[DECISIONS]
- 2026-06-29T00:33:15+01:00 [ASSUMPTION] Use the existing game container as the tap/click target instead of adding a new overlay element.

[PROGRESS]
- 2026-06-29T00:33:15+01:00 [CODE] Added a shared `startGame()` path in `js/input.js` for spacebar and game-area click.
- 2026-06-29T00:36:00+01:00 [CODE] Added pointer drag controls for the paddle in `js/input.js` and disabled touch scrolling on `#field-wrap` in `css/style.css`.
- 2026-06-29T00:38:00+01:00 [CODE] Parameterized brick generation with `state.brickRows` and `state.brickCols`, and `BrickGenerator(rows, cols)` now builds the grid dynamically.
- 2026-06-29T00:40:00+01:00 [CODE] Added `state.score` as the source of truth for end-screen scoring and made the win/lose titles scale with viewport width.
- 2026-06-29T00:43:00+01:00 [CODE] Removed the temporary finger-drag paddle control and the `touch-action: none` rule from the main branch.

[OUTCOMES]
- 2026-06-29T00:33:15+01:00 [TOOL] Mobile users can now start the game by tapping/clicking inside the game area while the prompt is visible. `node --check js/input.js` passed.
- 2026-06-29T00:36:00+01:00 [CODE] Finger drag now moves the paddle on phones via pointer events on `#field-wrap`; `touch-action: none` prevents the browser from scrolling the play area.
