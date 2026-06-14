import { BrickGenerator } from "./bricks.js"



export function resetBall(state) {
    state.ball.style.cssText    = ''
    state.breaker.style.cssText = ''
    state.waiting = true
    state.dx = 4
    state.dy = -4
    state.prompt.style.display = 'flex'
}
