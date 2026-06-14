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

    }

    state.raf = requestAnimationFrame(loop)
}
