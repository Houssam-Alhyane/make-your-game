import { startLoop } from "./loop.js"

export function setupInput(state) {
    document.addEventListener('keydown', e => {
        if (e.key === ' ' && state.waiting) {
            state.waiting = false
            state.prompt.style.display = 'none'
            const bp = state.toField(state.ball.getBoundingClientRect())
            state.ball.style.left = bp.left + 'px'
            state.ball.style.top  = bp.top  + 'px'
            const pp = state.toField(state.breaker.getBoundingClientRect())
            state.breaker.style.left = pp.left + 'px'
            state.breaker.style.top  = pp.top  + 'px'
            startLoop(state)
        }
        if (e.key === 'ArrowRight') state.arrowRight = true
        if (e.key === 'ArrowLeft')  state.arrowLeft  = true
    })

    document.addEventListener('keyup', e => {
        if (e.key === 'ArrowRight') state.arrowRight = false
        if (e.key === 'ArrowLeft')  state.arrowLeft  = false
    })
}
