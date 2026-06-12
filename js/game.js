import { toField }    from "./utils.js"
import { init }       from "./init.js"
import { setupInput } from "./input.js"

const $ = id => document.getElementById(id)

// shared state object passed to every module
const state = {
    ball:      $('ball'),
    breaker:   $('breaker'),
    field:     $('field-wrap'),
    scoreEl:   $('score'),
    prompt:    $('press-to-play'),
    home:      $('home-container'),
    game:      $('game-container'),
    over:      $('final-game-container'),
    overTitle: $('final-game-title'),

    raf:        null,
    waiting:    true,
    dx: 4,  dy: -4,
    arrowLeft:  false,
    arrowRight: false,
    layers:     {},

    toField(r) { return toField(this.field, r) }
}

// buttons
$('play').addEventListener('click', () => init(state))

for (const b of document.getElementsByClassName('restart-button'))
    b.addEventListener('click', () => init(state))

for (const b of document.getElementsByClassName('exit-button'))
    b.addEventListener('click', () => {
        cancelAnimationFrame(state.raf)
        state.over.style.display = 'none'
        state.game.style.display = 'none'
        state.home.style.display = 'flex'
    })

setupInput(state)
