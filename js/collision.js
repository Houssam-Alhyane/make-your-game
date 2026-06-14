export function hitPaddle(state, nx, ny) {
  //bp=ball postion ;pp=paddle postion
  const { bp, pp } = state;
  const bcx = nx + bp.width / 2; //centre of the ball
  if (
    ny + bp.height >= pp.top &&
    bp.top <= pp.top &&
    bcx >= pp.left &&
    bcx <= pp.right
  ) {
    const r = (bcx - pp.left) / pp.width;
    if (r < 1 / 7) {
      state.dx = -4;
      state.dy = -4;
    } else if (r < 2 / 7) {
      state.dx = -2;
      state.dy = -5;
    } else if (r > 6 / 7) {
      state.dx = 4;
      state.dy = -4;
    } else if (r > 5 / 7) {
      state.dx = 2;
      state.dy = -5;
    } else {
      state.dy = -Math.abs(state.dy);
    }
  }
}

export function hitBricks(state, b2, layers, scoreEl) {
  for (const layer of layers) {
    const row = layer.bricks;
    for (let i = row.length - 1; i >= 0; i--) {
      const brick = row[i];
      if (!brick.isConnected) {
        row.splice(i, 1);
        continue;
      }
      const br = state.toField(brick.getBoundingClientRect());
      if (
        b2.right > br.left &&
        b2.left < br.right &&
        b2.bottom > br.top &&
        b2.top < br.bottom
      ) {
        brick.remove();
        row.splice(i, 1);
        scoreEl.innerHTML = +scoreEl.innerHTML + 50;
        const ox = Math.min(b2.right, br.right) - Math.max(b2.left, br.left);
        const oy = Math.min(b2.bottom, br.bottom) - Math.max(b2.top, br.top);
        if (oy < ox) state.dy = -state.dy;
        else state.dx = -state.dx;
        return;
      }
    }
  }
}
