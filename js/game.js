import { toField } from './utils.js';
import { init } from './init.js';
import { setupInput } from './input.js';

const $ = (id) => document.getElementById(id);

// shared state object passed to every module
const state = {
  ball: $('ball'),
  breaker: $('breaker'),
  field: $('field-wrap'),
  scoreEl: $('score'),
  prompt: $('press-to-play'),
  home: $('home-container'),
  game: $('game-container'),
  over: $('final-game-container'),
  overTitle: $('final-game-title'),
  settings: $('settings-btn'),
  isPaused: false,
  isMusicPaused: false,
  raf: null,
  waiting: true,
  ballSpeed: 5.7,
  dx: 4,
  dy: -4,
  arrowLeft: false,
  arrowRight: false,
  layers: {},
  // Reuse one sound object for brick hits instead of creating Audio every collision.
  hitSound: new Audio('./assets/paddle.wav'),

  toField(r) {
    return toField(this.field, r);
  },
};
const music = new Audio('./assets/K.O..mp3');
music.volume=0.1
music.loop=true
// buttons
$('play').addEventListener('click', () => {
  // Start music after a click so the browser does not block autoplay.
  music.play();
  init(state);
});

setupInput(state);
