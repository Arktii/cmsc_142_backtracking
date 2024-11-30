from time import sleep
import random
import numpy as np

from graphics import GridVisualizer

N = 4
N_SQUARED = N * N
PORTION_TO_REMOVE = 0.35
SLEEP_SECONDS = 0.001
WINDOW_SIZE = 600

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

    # https://abcnews.go.com/blogs/headlines/2012/06/can-you-solve-the-hardest-ever-sudoku
    HARDEST = [
        [8, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 3, 6, 0, 0, 0, 0, 0],
        [0, 7, 0, 0, 9, 0, 2, 0, 0],
        [0, 5, 0, 0, 0, 7, 0, 0, 0],
        [0, 0, 0, 0, 4, 5, 7, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 3, 0],
        [0, 0, 1, 0, 0, 0, 0, 6, 8],
        [0, 0, 8, 5, 0, 0, 0, 1, 0],
        [0, 9, 0, 0, 0, 0, 4, 0, 0],
    ]

    # problem = HARD

    # Transposing so that grid can be accessed as grid[x][y]
    # Only needed for hard-coded grids, generated are already accessed as grid[x][y]
    # grid = np.array(problem, dtype=int).transpose()

    grid = generate_valid()
    visualizer = GridVisualizer("Solution", WINDOW_SIZE, 50, grid, N)
    visualizer.run_blocking()

    grid = make_problem(grid)
    print("Problem: ")
    print_grid(grid.copy().transpose())
    print()
    visualizer = GridVisualizer("Problem", WINDOW_SIZE, grid, N)
    visualizer.run_blocking()

    print_grid(grid)
    print()

    visualizer = GridVisualizer("Backtracking", 900, grid, N)
    visualizer.run_blocking(lambda: solve(grid, 0, 0, visualizer))

    print_grid(grid)

def generate_valid() -> np.ndarray[int, int]:
    grid = np.zeros((N_SQUARED, N_SQUARED), dtype=int)
    generate(grid, 0, 0)
    return grid

def make_problem(grid: np.ndarray[int, int]) -> np.ndarray[int, int]:
    problem = grid.copy()
    to_remove = N_SQUARED * N_SQUARED * PORTION_TO_REMOVE

    while to_remove > 0:
        row = random.randint(0, N_SQUARED - 1)
        col = random.randint(0, N_SQUARED - 1)
        if problem[col, row] != 0:
            problem[col, row] = 0
            to_remove -= 1

    return problem

def print_grid(grid: np.ndarray[int, int]):
    for row in range(N_SQUARED):
        for col in range(N_SQUARED):
            print(grid[col, row], end=" ")
        print()

# exactly the same as solve, but change order of digits to try and no visualizer
def generate(grid: np.ndarray[int, int], row, col):
    if row == N_SQUARED:
        return True
    elif col == N_SQUARED:
        return generate(grid, row + 1, 0)
    elif grid[col, row] != 0:
        return generate(grid, row, col + 1)
    else:
        digits = list(range(1, N_SQUARED + 1))
        random.shuffle(digits)

        for digit in digits:
            if is_valid(grid, row, col, digit):
                grid[col, row] = digit
                if generate(grid, row, col + 1):
                    return True
                else:
                    grid[col, row] = 0

    # If no solution
    return False

def solve(grid: np.ndarray[int, int], row, col, visualizer: GridVisualizer):
    if visualizer != None:
        visualizer.update_grid(grid)
        sleep(SLEEP_SECONDS)
    
    if row == N_SQUARED:
        return True
    elif col == N_SQUARED:
        return solve(grid, row + 1, 0, visualizer)
    elif grid[col, row] != 0:
        return solve(grid, row, col + 1, visualizer)
    else:
        for digit in range(1, N_SQUARED + 1):
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
    for i in range(N_SQUARED):
        if grid[col, i] == digit or grid[i, row] == digit:
            return False

    # Check subgrid
    subgrid_first_col = col // N * N
    subgrid_first_row = row // N * N
    for c in range(subgrid_first_col, subgrid_first_col + N):
        for r in range(subgrid_first_row, subgrid_first_row + N):
            if grid[c, r] == digit:
                return False

    return True


main()
