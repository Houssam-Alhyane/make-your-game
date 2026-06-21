export function hitPaddle(state, nx, ny) {
  const { bp, pp } = state;
  const bcx = nx + bp.width / 2; // Center of the ball

  // Check if the ball is hitting the paddle area
  if (ny + bp.height >= pp.top && bcx >= pp.left && bcx <= pp.right) {
    
    // Divide the paddle into 3 equal sections (Left, Center, Right)
    const segmentWidth = pp.width / 3;
    const hitLocation = bcx - pp.left; // How far along the paddle the ball hit

    if (hitLocation < segmentWidth) {
      // 1. LEFT PADDLE: Force ball to go left (negative dx) and up (negative dy)
      state.dx = -Math.abs(state.dx);
      state.dy = -Math.abs(state.dy);
    } else if (hitLocation > segmentWidth * 2) {
      // 2. RIGHT PADDLE: Force ball to go right (positive dx) and up (negative dy)
      state.dx = Math.abs(state.dx);
      state.dy = -Math.abs(state.dy);
    } else {
      // 3. CENTER PADDLE: Just bounce up, keep the left/right direction as it was
      state.dy = -Math.abs(state.dy);
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
