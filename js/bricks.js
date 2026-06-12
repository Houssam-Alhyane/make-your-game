export function BrickGenerator() {
  const grid = document.getElementById('container');
  const layers = [];
  for (let r = 0; r < 7; r++) layers[r] = { bricks: [] };

  for (let i = 1; i <= 70; i++) {
    const row = Math.ceil(i / 10); // 1–7
    const col = i % 10 || 10; // 1–10

    const brick = document.createElement('div');
    brick.className = 'brick';
    brick.dataset.row = row;
    brick.style.gridColumn = col;
    brick.style.gridRow = row;
    grid.append(brick);

    layers[row - 1].bricks.push(brick);
  }

  return layers;
}
