import { restart, setPause } from './actions.js';
import { startLoop } from './loop.js';

export function setupInput(state) {
  document.addEventListener('keydown', (e) => {
    if (e.key === ' ' && state.waiting) {
      state.waiting = false;
      state.prompt.style.display = 'none';
      startLoop(state);
    }
    // Pause the game when the user presses Escape or P.
    if (e.key === 'Escape' || e.key.toLowerCase() === 'p') {
      setPause(state);
    }

    if (e.key === 'ArrowRight') state.arrowRight = true;
    if (e.key === 'ArrowLeft') state.arrowLeft = true;
  });

  document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight') state.arrowRight = false;
    if (e.key === 'ArrowLeft') state.arrowLeft = false;
  });

  // Settings button to pause the game and show the pause menu
  state.settings.addEventListener('click', () => {
    setPause(state);
  });

  // Resume button in the pause menu
  state.resumeBtn.addEventListener('click', () => {
    setPause(state);
  });

  //Restart button in the pause menu
  state.restartBtn.addEventListener('click', () => {
    restart(state);
  });
}
