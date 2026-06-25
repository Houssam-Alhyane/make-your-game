import { init } from './init.js';
import { startLoop } from './loop.js';

// function to set the paused state and update the pause menu visibility
export function setPause(state) {
  state.isPaused = !state.isPaused;
  // stop requestAnimationFrame when paused and resume when unpaused
  if (state.isPaused) {
    cancelAnimationFrame(state.raf);
  } else {
    state.raf = requestAnimationFrame(() => startLoop(state));
  }
  if (state.music) {
    state.isPaused ? state.music.pause() : state.music.play();
  }
  state.pauseMenu.style.display = state.isPaused ? 'flex' : 'none';
}

// function to restart the game
export function restart(state) {
  setPause(state);
  init(state);
}

// function to go to home screen
export function toHomeScreen(state) {
  setPause(state);
  state.home.style.display = 'flex';
  state.over.style.display = 'none';
  state.game.style.display = 'none';
}
