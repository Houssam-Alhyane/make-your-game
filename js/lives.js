import { toGameOverScreen } from './actions.js';

export default function generateLives(state) {
  const livesContainer = state.livesContainer; //  this is the container for lives
  livesContainer.innerHTML = ''; // Clear existing lives
  if (state.livesCount <= 0) {
    // Handle game over logic here
    toGameOverScreen(state);
    return;
  }
  for (let i = 0; i < state.livesCount; i++) {
    const lifeIcon = document.createElement('img');
    lifeIcon.src = 'assets/heart.png'; // Path to your life icon image
    lifeIcon.alt = 'hreart'; // Alternative text for accessibility
    lifeIcon.classList.add('heart'); // Add a class for styling
    livesContainer.appendChild(lifeIcon);
  }
}
