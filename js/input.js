import { startLoop } from './loop.js';

export function setupInput(state) {
  document.addEventListener('keydown', (e) => {
    if (e.key === ' ' && state.waiting) {
      state.waiting = false;
      state.prompt.style.display = 'none';
      startLoop(state);
    }
    if (e.key === 'ArrowRight') state.arrowRight = true;
    if (e.key === 'ArrowLeft') state.arrowLeft = true;
  });

  document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight') state.arrowRight = false;
    if (e.key === 'ArrowLeft') state.arrowLeft = false;
  });
}
