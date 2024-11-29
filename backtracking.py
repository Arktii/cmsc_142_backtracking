from time import sleep
import numpy as np

from graphics import GridVisualizer

N = 9
SUBGRID_SIZE = 3


def main():
    EASY = [
        [6, 9, 0, 1, 7, 0, 0, 0, 0],
        [3, 5, 0, 0, 4, 0, 1, 0, 0],
        [8, 0, 2, 3, 6, 0, 7, 0, 4],
        [0, 0, 0, 0, 0, 0, 9, 0, 8],
        [9, 4, 0, 0, 0, 0, 0, 0, 5],
        [0, 0, 0, 5, 9, 0, 6, 3, 0],
        [2, 6, 0, 0, 5, 0, 0, 8, 7],
        [0, 8, 1, 0, 0, 6, 4, 9, 0],
        [0, 7, 3, 0, 8, 2, 0, 1, 0],
    ]

    HARD = [
        [0, 0, 0, 0, 0, 3, 0, 6, 0],
        [0, 8, 0, 0, 5, 0, 7, 0, 0],
        [0, 1, 5, 0, 8, 0, 0, 4, 0],
        [8, 0, 0, 3, 0, 0, 0, 0, 9],
        [3, 4, 9, 0, 0, 6, 0, 0, 0],
        [2, 0, 6, 0, 9, 0, 3, 7, 0],
        [0, 0, 0, 4, 0, 0, 5, 0, 6],
        [7, 0, 0, 0, 0, 8, 0, 0, 2],
        [0, 9, 0, 0, 0, 0, 4, 3, 0],
    ]

    #TODO: add more problems

    problem = HARD

    # Transposing so that grid can be accessed as grid[x][y]
    grid = np.array(problem, dtype=int).transpose()

    print_grid(grid)
    print()

    visualizer = GridVisualizer("Backtracking", 600, grid)
    visualizer.run_blocking(lambda: solve(grid, 0, 0, visualizer))

    print_grid(grid)


def print_grid(grid: np.ndarray[int, int]):
    for row in range(N):
        for col in range(N):
            print(grid[col, row], end=" ")
        print()


def solve(grid: np.ndarray[int, int], row, col, visualizer: GridVisualizer):
    visualizer.update_grid(grid)
    sleep(0.05)
    if row == N:
        return True
    elif col == N:
        return solve(grid, row + 1, 0, visualizer)
    elif grid[col, row] != 0:
        return solve(grid, row, col + 1, visualizer)
    else:
        for digit in range(1, N + 1):
            if is_valid(grid, row, col, digit):
                grid[col, row] = digit
                if solve(grid, row, col + 1, visualizer):
                    return True
                else:
                    grid[col, row] = 0

    # If no solution
    return False


def is_valid(grid, row: int, col: int, digit: int) -> bool:
    # Check rows and columns
    for i in range(9):
        if grid[col, i] == digit or grid[i, row] == digit:
            return False

    # Check subgrid
    subgrid_first_col = col // SUBGRID_SIZE * SUBGRID_SIZE
    subgrid_first_row = row // SUBGRID_SIZE * SUBGRID_SIZE
    for c in range(subgrid_first_col, subgrid_first_col + SUBGRID_SIZE):
        for r in range(subgrid_first_row, subgrid_first_row + SUBGRID_SIZE):
            if grid[c, r] == digit:
                return False

    return True


main()
