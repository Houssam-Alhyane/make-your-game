import { restart, setPause, toHomeScreen } from './actions.js';
import { startLoop } from './loop.js';

export function setupInput(state) {
  const startGame = () => {
    if (!state.waiting) return;
    state.waiting = false;
    state.prompt.style.display = 'none';
    startLoop(state);
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === ' ') startGame();
    // Pause the game when the user presses Escape or P.
    if (e.key === 'Escape' || e.key.toLowerCase() === 'p') {
      if (!e.repeat) setPause(state);
    }

    if (e.key === 'ArrowRight') state.arrowRight = true;
    if (e.key === 'ArrowLeft') state.arrowLeft = true;
  });

  document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight') state.arrowRight = false;
    if (e.key === 'ArrowLeft') state.arrowLeft = false;
  });

  state.game.addEventListener('click', (e) => {
    // Ignore clicks on menu controls so restart/home does not auto-start the loop.
    if (e.target.closest('.menu-row, #settings-btn, #pause-menu')) return;
    startGame();
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
  state.restartBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      restart(state);
    });
  });

  // Home button in the pause menu
  state.homeBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toHomeScreen(state);
    });
  });
}
