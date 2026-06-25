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
  over: $('over-container'),
  overTitle: $('over-title'),
  win: $('win-container'),
  winTitle: $('win-title'),
  settings: $('settings-btn'),
  timer: $('timer'),
  cooldown: 1000 * 60 * 5,
  lastTime: null,
  timeElapsed: 0,
  pauseMenu: $('pause-menu'),
  resumeBtn: $('resume-btn'),
  restartBtn: $('restart-btn'),
  homeBtn: $('home-btn'),
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
  music: null,
  // Reuse one sound object for brick hits instead of creating Audio every collision.
  hitSound: new Audio('./assets/paddle.wav'),

  toField(r) {
    return toField(this.field, r);
  },
};
const music = new Audio('./assets/K.O..mp3');
music.volume = 0.1;
music.loop = true;
state.music = music;
// buttons
$('play').addEventListener('click', () => {
  // Start music after a click so the browser does not block autoplay.
  music.play();
  init(state);
});

setupInput(state);
