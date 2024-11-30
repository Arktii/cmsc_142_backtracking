// https://www.youtube.com/watch?v=G_UYXzGuqvM computerphile vid

const EASY = [
  [6, 9, 0, 1, 7, 0, 0, 0, 0],
  [3, 5, 0, 0, 4, 0, 1, 0, 0],
  [8, 0, 2, 3, 6, 0, 7, 0, 4],
  [0, 0, 0, 0, 0, 0, 9, 0, 8],
  [9, 4, 0, 0, 0, 0, 0, 0, 5],
  [0, 0, 0, 5, 9, 0, 6, 3, 0],
  [2, 6, 0, 0, 5, 0, 0, 8, 7],
  [0, 8, 1, 0, 0, 6, 4, 9, 0],
  [0, 7, 3, 0, 8, 2, 0, 1, 0],
];

const HARD = [
  [0, 0, 0, 0, 0, 3, 0, 6, 0],
  [0, 8, 0, 0, 5, 0, 7, 0, 0],
  [0, 1, 5, 0, 8, 0, 0, 4, 0],
  [8, 0, 0, 3, 0, 0, 0, 0, 9],
  [3, 4, 9, 0, 0, 6, 0, 0, 0],
  [2, 0, 6, 0, 9, 0, 3, 7, 0],
  [0, 0, 0, 4, 0, 0, 5, 0, 6],
  [7, 0, 0, 0, 0, 8, 0, 0, 2],
  [0, 9, 0, 0, 0, 0, 4, 3, 0],
];

const clues = [];
const problem = EASY;
for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    if (problem[i][j] !== 0) {
      clues.push({ row: i, col: j });
    }
  }
}
const delay = parseInt(process.argv[2]) || 100;
console.clear();
solve(problem, delay);

function possible(grid, row, col, num) {
  for (let i = 0; i < 9; i++) {
    // horizontal check || vertical Check
    if (grid[row][i] === num || grid[i][col] === num) {
      return false;
    }
  }

  // subgrid check
  let x0 = Math.floor(row / 3) * 3;
  let y0 = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[x0 + i][y0 + j] === num) {
        return false;
      }
    }
  }
  return true;
}

async function solve(grid, delay) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j] === 0) {
        for (let k = 1; k <= 9; k++) {
          if (possible(grid, i, j, k)) {
            grid[i][j] = k;
            await printSudoku(grid, i, j, delay);
            if (await solve(grid, delay)) return true;
            grid[i][j] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function pause(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function printSudoku(grid, a, b, delay) {
  // spaghetti but it works for now
  console.clear();

  process.stdout.write("row: " + a + "\tcol: " + b + "\n\n");
  console.log("--------------------------------");
  for (let i = 0; i < 9; i++) {
    if (i % 3 === 0 && i !== 0) {
      console.log("--------------------------------");
    }
    for (let j = 0; j < 9; j++) {
      const num = grid[i][j];
      if (num === 0) {
        process.stdout.write("   ");
      } else {
        if (i === a && j === b) {
          // current row col in solve
          process.stdout.write("\x1b[33m" + " " + num + " " + "\x1b[0m");
        } else {
          if (clues.some((clue) => clue.row === i && clue.col === j)) {
            process.stdout.write(" " + num + " ");
          } else {
            process.stdout.write("\x1b[32m" + " " + num + " " + "\x1b[0m");
          }
        }
      }
      if ((j + 1) % 3 === 0 && j !== 8) {
        process.stdout.write(" | ");
      }
    }
    process.stdout.write("\n");
  }
  console.log("--------------------------------");
  await pause(delay);
}
