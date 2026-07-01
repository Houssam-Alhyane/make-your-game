# 🧱 Make Your Game — Brick Breaker

A classic **Brick Breaker / Arkanoid**-style game built entirely with **plain JavaScript, HTML, and CSS** — no frameworks, no canvas. The goal was to build a smooth, high-performance game engine from scratch, running consistently at **60 FPS**.

---

## 🎮 Gameplay

Break all the bricks by bouncing the ball with your paddle before you run out of lives or time. Clear the entire brick grid to win!

- **Score points** for every brick destroyed
- **3 lives** — lose one each time the ball falls
- **5-minute countdown timer** — clear the field before time runs out
- Ball speed increases as fewer bricks remain, ramping up the challenge

---

## 🕹️ Controls

| Key | Action |
|---|---|
| `Space` / Click | Start / launch the ball |
| `←` `→` (Arrow keys) | Move the paddle |
| `Esc` or `P` | Pause / resume the game |

Movement is designed to be **smooth and jank-free**: holding a key moves the paddle continuously, and releasing it stops the motion immediately — no key-spamming required.

---

## ✨ Features

- ⚡ **60 FPS** animation loop powered by `requestAnimationFrame`
- ⏸️ **Pause menu** with:
  - Resume
  - Restart
  - Return to Home screen
- 📊 **HUD / Scoreboard**:
  - Countdown timer
  - Live score tracker
  - Remaining lives (heart icons)
- 🎯 **Dynamic collision system**:
  - Paddle hits are split into 3 zones (left / center / right) to control bounce angle
  - Brick collisions resolve on the axis of smallest overlap for realistic bouncing
- 🚀 **Progressive difficulty** — ball speed scales up as bricks are cleared
- 🎵 Background music and sound effects on brick hits
- 🖼️ Minimal, optimized DOM layer usage to keep rendering performance high

---

## 🗂️ Project Structure

```
.
├── assets
│   ├── fav.png
│   ├── heart.png
│   ├── K.O..mp3
│   ├── logo.png
│   ├── paddle.wav
│   └── play.svg
├── css
│   └── style.css
├── index.html
├── js
│   ├── actions.js      # Pause, restart, game-over/win screens
│   ├── bricks.js        # Brick grid generator
│   ├── collision.js     # Paddle & brick collision logic
│   ├── game.js           # App entry point & shared state
│   ├── init.js            # Game (re)initialization
│   ├── input.js           # Keyboard & click event handling
│   ├── lives.js           # Lives display & management
│   ├── loop.js             # Main game loop (requestAnimationFrame)
│   └── utils.js            # Coordinate/geometry helpers
└── README.md
```

---

## 🛠️ Built With

- **Vanilla JavaScript** (ES Modules)
- **HTML5** & **CSS3** (Grid & Flexbox for layout)
- No frameworks, no `<canvas>` — pure DOM manipulation
- CSS `transform` for performant, GPU-accelerated movement

---

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://learn.zone01oujda.ma/git/halhyane/make-your-game
   ```
2. Open `index.html` in your browser (or serve it with a local static server).
3. Press **Play** and use the arrow keys to control the paddle. Good luck!

---

## 📈 Performance

This project was built with strict performance goals in mind:

- Consistent **60 FPS**, no frame drops
- Profiled using browser DevTools (Performance tab, Paint Flashing)
- Minimal reflows/repaints through careful DOM updates and layer usage

---

## 👥 Authors

- [hhamouich](https://learn.zone01oujda.ma/intra/oujda/users/11045)
- [erezzoug](https://learn.zone01oujda.ma/intra/oujda/users/11591)
- [halhyane](https://learn.zone01oujda.ma/intra/oujda/users/10310)