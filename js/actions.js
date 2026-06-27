import { init } from './init.js';
import { startLoop } from './loop.js';

// function to set the paused state and update the pause menu visibility
export function setPause(state) {
  if (state.game.style.display === 'flex') {
    state.isPaused = state.isPaused ? false : true;

    if (state.music) {
      state.isPaused ? state.music.pause() : state.music.play();
    }
    state.pauseMenu.style.display = state.isPaused ? 'flex' : 'none';
  }
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
  state.music.pause();
}
// function to format time in mm:ss format
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// function to
export function updateTimer(state) {
  const timeRemaining = state.cooldown - state.elapsedTime;
  if (timeRemaining <= 0) {
    toGameOverScreen(state);
    return;
  }
  state.timer.textContent = formatTime(timeRemaining);
}

export function toGameOverScreen(state) {
  state.game.style.display = 'none';
  state.over.style.display = 'flex';
  state.overTitle.textContent = `Game Over! Your score: ${state.scoreEl.textContent}`;
  console.log('Game Over! Your score:', state.scoreEl.textContent);
}

export function toWinScreen(state) {
  state.game.style.display = 'none';
  state.win.style.display = 'flex';
  state.winTitle.textContent = `You Win! Your score: ${state.scoreEl.textContent}`;
  console.log('You Win! Your score:', state.scoreEl.textContent);
}
