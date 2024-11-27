import numpy as np


def main():
    problem = [
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
    # Transposing so that grid can be accessed as grid[x][y]
    grid = np.array(problem, dtype=int).transpose()

    print_grid(grid)
    print()
    
    solve(grid)

    print_grid(grid)


def print_grid(grid: np.ndarray[int, int]):
    for row in range(9):
        for col in range(9):
            print(grid[col, row], end=" ")
        print()


def solve(grid: np.ndarray[int, int], row = 0, col = 0):
    if row == grid.shape[0]:
        return True
    elif col == grid.shape[0]:
        return solve(grid, row + 1, 0)
    elif grid[col, row] != 0:
        return solve(grid, row, col + 1)
    else:
        for digit in range(1, grid.shape[0] + 1):
            if is_valid(grid, row, col, digit):
                grid[col, row] = digit
                if solve(grid, row, col + 1):
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
    # TODO: Make this generalized
    subgrid_first_col = col // 3 * 3
    subgrid_first_row = row // 3 * 3
    for c in range(subgrid_first_col, subgrid_first_col + 3):
        for r in range(subgrid_first_row, subgrid_first_row + 3):
            if grid[c, r] == digit:
                return False

    return True


main()
