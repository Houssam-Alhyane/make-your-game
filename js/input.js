import { startLoop } from './loop.js';

export function setupInput(state) {
  document.addEventListener('keydown', (e) => {
    if (e.key === ' ' && state.waiting) {
      state.waiting = false;
      state.prompt.style.display = 'none';
      startLoop(state);
    }
    // Pause the game when the user presses Escape or P.
    if (e.key === 'Escape' || e.key === 'p') {
      state.isPaused = !state.isPaused;
      state.isPaused ? music.pause() : music.play();
    }

    if (e.key === 'ArrowRight') state.arrowRight = true;
    if (e.key === 'ArrowLeft') state.arrowLeft = true;
  });

  document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight') state.arrowRight = false;
    if (e.key === 'ArrowLeft') state.arrowLeft = false;
  });

  state.settings.addEventListener('click', () => {
    state.isPaused = !state.isPaused;
    state.isPaused ? music.pause() : music.play();
  });
}
