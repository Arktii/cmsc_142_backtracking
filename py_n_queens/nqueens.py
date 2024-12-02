import numpy as np

def print_board(board: np.ndarray[int, int]):
    for row in range(board.shape[0]):
        for col in range(board.shape[1]):
            if board[col,row] == 1:
                print("Q",end=" ")
            else:
                print(".",end=" ")
        print()


def is_valid(board: np.ndarray, col: int, row: int):
    # Check rows and columns
    for i in range(board.shape[0]):
        if board[col, i] == 1 or board[i, row] == 1:
            return False
    
    # Only need to check upper diagonals since queens are filled in row by row
    # Check upper-left diagonal
    for i in range(1, min(col, row) + 1):
        if board[col - i][row - i] == 1:
            return False

    # Check upper-right diagonal
    for i in range(1, min(board.shape[0] - col, row + 1)):
        if board[col + i][row - i] == 1:
            return False

    return True


def solve(board, row):
    N = board.shape[0]

    # If all queen are placed then return true
    if row >= N:
        return True

    # Consider this row and try placing this queen
    # in all columns one by one
    for i in range(N):

        if is_valid(board, i, row):
            # Place queen
            board[i][row] = 1

            # Recur to place rest of the queens
            if solve(board, row + 1):
                return True

            # If placing queen in board[i][row]
            # doesn't lead to a solution, then
            # remove queen from board[i][row] to 
            # try other columns
            board[i][row] = 0

    # If the queen can not be placed in column in
    # this row then return False to backtrack
    return False


def main():
    N = 5
    
    board = np.zeros((N, N), dtype=int)

    if solve(board, 0) == False:
        print("Solution does not exist")
        return False

    print_board(board)
    return True


# Driver Code
if __name__ == '__main__':
    main()