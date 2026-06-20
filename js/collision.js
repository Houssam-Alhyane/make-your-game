function setBallDirection(state, x, y) {
  // Keep total ball speed steady while changing only the direction.
  const speed = state.ballSpeed || Math.hypot(state.dx, state.dy);
  const length = Math.hypot(x, y) || 1;

  state.dx = (x / length) * speed;
  state.dy = (y / length) * speed;
}

export function hitPaddle(state, nx, ny) {
  //bp=ball postion ;pp=paddle postion
  const { bp, pp } = state;
  const bcx = nx + bp.width / 2; //centre of the ball
  //ny + bp.height==bottom
  //    bcx >= pp.left && bcx <= pp.right check if ball inside the paddle
  if (ny + bp.height >= pp.top && bcx >= pp.left && bcx <= pp.right) {
    const r = (bcx - pp.left) / pp.width; //what part ball hit the paddle
    if (r < 1 / 7) {
      setBallDirection(state, -0.9, -0.45);
    } else if (r < 2 / 7) {
      setBallDirection(state, -0.55, -0.85);
    } else if (r > 6 / 7) {
      setBallDirection(state, 0.9, -0.45);
    } else if (r > 5 / 7) {
      setBallDirection(state, 0.55, -0.85);
    } else {
      setBallDirection(state, state.dx, -Math.abs(state.dy));
    }
  }
}

export function hitBricks(state, b2, layers, scoreEl) {
  let flipX = false;
  let flipY = false;
  let hitAny = false;

  for (const layer of layers) {
    const row = layer.bricks;
    for (let i = row.length - 1; i >= 0; i--) {
      const brick = row[i];
      const br = state.toField(brick.getBoundingClientRect());

      const overlapping =
        b2.right > br.left &&
        b2.left < br.right &&
        b2.bottom > br.top &&
        b2.top < br.bottom;

      if (!overlapping) continue;

      const overlapLeft = b2.right - br.left;
      const overlapRight = br.right - b2.left;
      const overlapTop = b2.bottom - br.top;
      const overlapBottom = br.bottom - b2.top;
      const minX = Math.min(overlapLeft, overlapRight);
      const minY = Math.min(overlapTop, overlapBottom);

      // Bounce on the axis with the smallest overlap.
      if (minX < minY) flipX = true;
      else flipY = true;

      brick.remove();
      row.splice(i, 1);
      // Score is plain text, so textContent is safer than innerHTML
      scoreEl.textContent = Number(scoreEl.textContent) + 50;
      hitAny = true;
    }
  }

  if (hitAny) {
    if (flipX) state.dx = -state.dx;
    if (flipY) state.dy = -state.dy;

    // Replay the shared hit sound from the start.
    state.hitSound.currentTime = 0;
    state.hitSound.play();
  }
}
