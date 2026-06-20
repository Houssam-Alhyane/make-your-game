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

        // Increase the target speed as the player clears more bricks.
        const bricksCount = document.getElementsByClassName('brick').length;
        if (bricksCount > 55) {
             state.ballSpeed = 5.7;
        } else if (bricksCount>25){
             state.ballSpeed = 6.5;
        } else {
             state.ballSpeed = 7.2;
        }

        // Normalize dx/dy so collision angle changes do not change total speed.
        const speed = Math.hypot(state.dx, state.dy) || 1;
        state.dx = (state.dx / speed) * state.ballSpeed;
        state.dy = (state.dy / speed) * state.ballSpeed;
        // win check    
        if (!document.getElementsByClassName('brick').length) {
            overTitle.innerText    = 'You Win!'
            over.style.display     = 'flex'
            cancelAnimationFrame(state.raf)
            return
        }

        // Only write paddle position while moving, and keep it inside the field.
        if (state.arrowRight || state.arrowLeft) {
            let nextPaddleLeft = pp.left
            if (state.arrowRight) nextPaddleLeft += 12
            if (state.arrowLeft) nextPaddleLeft -= 12
            nextPaddleLeft = Math.max(0, Math.min(nextPaddleLeft, W - pp.width))
            breaker.style.left = nextPaddleLeft + 'px'
        }

        state.raf = requestAnimationFrame(loop)
    }

    state.raf = requestAnimationFrame(loop)
}
