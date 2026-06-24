// function to set the paused state and update the pause menu visibility
export function setPause(state) {
  state.isPaused = !state.isPaused;
  if (state.music) {
    state.isPaused ? state.music.pause() : state.music.play();
  }
  state.pauseMenu.style.display = state.isPaused ? 'flex' : 'none';
}
