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

