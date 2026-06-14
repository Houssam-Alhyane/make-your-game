import { hitPaddle, hitBricks } from "./collision.js"
import { resetBall } from "./init.js"

export function startLoop(state) {
    const { ball, breaker, field, over, overTitle, scoreEl, layers } = state

    function loop() {
        const W  = field.getBoundingClientRect().width
        const H  = field.getBoundingClientRect().height
        const bp = state.toField(ball.getBoundingClientRect())
        const pp = state.toField(breaker.getBoundingClientRect())

        let nx = bp.left + state.dx
        let ny = bp.top  + state.dy

        // walls
        if (nx + bp.width >= W) { nx = W - bp.width; state.dx = -Math.abs(state.dx) }
        if (nx <= 0)             { nx = 0;             state.dx =  Math.abs(state.dx) }
        if (ny <= 0)             { ny = 0;              state.dy =  Math.abs(state.dy) }
        if (ny + bp.height >= H) { resetBall(state); return }

        // paddle
        state.bp = bp; state.pp = pp
        hitPaddle(state, nx, ny)

        ball.style.left = nx + 'px'
        ball.style.top  = ny + 'px'

        // bricks
        const b2 = state.toField(ball.getBoundingClientRect())
        hitBricks(state, b2, state.layers, scoreEl)

        // win check
        if (!document.getElementsByClassName('brick').length) {
            overTitle.innerText    = 'You Win!'
            over.style.display     = 'flex'
            cancelAnimationFrame(state.raf)
            return
        }


    }

    state.raf = requestAnimationFrame(loop)
}
