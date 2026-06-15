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

        // walls heck if the ball touch Edges
        if (nx + bp.width >= W) { nx = W - bp.width; state.dx = -Math.abs(state.dx) }//check if touch from rigth
        if (nx <= 0)             { nx = 0;             state.dx =  Math.abs(state.dx) }//check if touch from left
        if (ny <= 0)             { ny = 0;              state.dy =  Math.abs(state.dy) }//check if touch from top
        if (ny + bp.height >= H) { resetBall(state); return }////check if touch from botom

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

        // paddle move
        if (state.arrowRight && pp.right < W) breaker.style.left = (pp.left + 10) + 'px'
        if (state.arrowLeft  && pp.left  > 0) breaker.style.left = (pp.left - 10) + 'px'

        state.raf = requestAnimationFrame(loop)
    }

    state.raf = requestAnimationFrame(loop)
}
