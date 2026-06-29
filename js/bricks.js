export function BrickGenerator(rows = 7, cols = 10) {
  const grid = document.getElementById('container');
  const layers = [];
  grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

  for (let r = 0; r < rows; r++) layers[r] = { bricks: [] };

  for (let i = 1; i <= rows * cols; i++) {
    const row = Math.ceil(i / cols);
    const col = i % cols || cols;

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
