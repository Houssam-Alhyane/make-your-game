import { BrickGenerator } from './bricks.js';
import generateLives, { substractLives } from './lives.js';

export function init(state) {
  cancelAnimationFrame(state.raf);
  state.timer.textContent = "05:00";
  state.waiting = true;
  state.livesCount = 3;
  generateLives(state);

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
  state.win.style.display = 'none';
  state.prompt.style.display = 'flex';
}

export function resetBall(state) {
  substractLives(state);
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
