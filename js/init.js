import { BrickGenerator } from "./bricks.js"

export function init(state) {
    cancelAnimationFrame(state.raf)
    state.waiting    = true
    state.dx         = 4
    state.dy         = -4
    state.arrowLeft  = false
    state.arrowRight = false

    state.scoreEl.innerHTML = '0'
    state.ball.style.cssText    = ''
    state.breaker.style.cssText = ''

    for (const b of [...document.getElementsByClassName('brick')]) b.remove()
    state.layers = BrickGenerator()

    state.home.style.display = 'none'
    state.over.style.display = 'none'
    state.game.style.display = 'flex'
    state.prompt.style.display = 'flex'
}

export function resetBall(state) {
    state.ball.style.cssText    = ''
    state.breaker.style.cssText = ''
    state.waiting = true
    state.dx = 4
    state.dy = -4
    state.prompt.style.display = 'flex'
}
