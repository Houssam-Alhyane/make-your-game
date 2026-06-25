import { BrickGenerator } from './bricks.js';

export function init(state) {
  cancelAnimationFrame(state.raf);
  state.waiting = true;
  // Reset the base speed whenever a new game starts.
  state.ballSpeed = 5.7;
  const arr = [4, -4];
  state.dx = arr[Math.floor(Math.random() * arr.length)];
  state.dy = arr[Math.floor(Math.random() * arr.length)];
  state.arrowLeft = false;
  state.arrowRight = false;
  state.elapsedTime = 0;

  state.scoreEl.innerHTML = '0';
  state.ball.style.cssText = '';
  state.breaker.style.cssText = '';

  for (const b of [...document.getElementsByClassName('brick')]) b.remove();
  state.layers = BrickGenerator();

  state.home.style.display = 'none';
  state.over.style.display = 'none';
  state.game.style.display = 'flex';
  state.prompt.style.display = 'flex';
}

export function resetBall(state) {
  state.ball.style.cssText = '';
  state.breaker.style.cssText = '';
  state.waiting = true;
  // Lost ball starts again at the base speed.
  state.ballSpeed = 5.7;
  const arr = [4, -4];
  state.dx = arr[Math.floor(Math.random() * arr.length)];
  state.dy = arr[Math.floor(Math.random() * arr.length)];
  state.prompt.style.display = 'flex';
}
