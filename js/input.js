import { startLoop } from './loop.js';

export function setupInput(state) {
  // function to set the paused state and update the pause menu visibility
  const setPaused = (paused) => {
    state.isPaused = paused;
    if (state.music) {
      state.isPaused ? state.music.pause() : state.music.play();
    }
    state.pauseMenu.style.display = state.isPaused ? 'flex' : 'none';
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === ' ' && state.waiting) {
      state.waiting = false;
      state.prompt.style.display = 'none';
      startLoop(state);
    }
    // Pause the game when the user presses Escape or P.
    if (e.key === 'Escape' || e.key.toLowerCase() === 'p') {
      setPaused(!state.isPaused);
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
    setPaused(!state.isPaused);
  });

  // Resume button in the pause menu
  state.resumeBtn.addEventListener('click', () => {
    setPaused(false);
  });
}
