fn is_valid(board: &Vec<Vec<u8>>, row: usize, col: usize, num: u8) -> bool {
    // Check the row and column constraints
    for i in 0..9 {
        if board[row][i] == num || board[i][col] == num {
            return false;
        }
    }

    // Check the 3x3 subgrid constraint
    let subgrid_row_start = row / 3 * 3;
    let subgrid_col_start = col / 3 * 3;
    for r in 0..3 {
        for c in 0..3 {
            if board[subgrid_row_start + r][subgrid_col_start + c] == num {
                return false;
            }
        }
    }
    true
}

fn solve_sudoku(board: &mut Vec<Vec<u8>>) -> bool {
    for row in 0..9 {
        for col in 0..9 {
            if board[row][col] == 0 {
                // Try each number from 1 to 9
                for num in 1..=9 {
                    if is_valid(board, row, col, num) {
                        board[row][col] = num; // Place the number
                        if solve_sudoku(board) {
                            return true; // Solved
                        }
                        board[row][col] = 0; // Backtrack
                    }
                }
                return false; // Trigger backtracking
            }
        }
    }
    true // Puzzle solved
}


fn print_board(board: &Vec<Vec<u8>>) {
    for row in board {
        println!("{:?}", row);
    }
}

fn main() {
    let mut board1 = vec![
        vec![5, 3, 0, 0, 7, 0, 0, 0, 0],
        vec![6, 0, 0, 1, 9, 5, 0, 0, 0],
        vec![0, 9, 8, 0, 0, 0, 0, 6, 0],
        vec![8, 0, 0, 0, 6, 0, 0, 0, 3],
        vec![4, 0, 0, 8, 0, 3, 0, 0, 1],
        vec![7, 0, 0, 0, 2, 0, 0, 0, 6],
        vec![0, 6, 0, 0, 0, 0, 2, 8, 0],
        vec![0, 0, 0, 4, 1, 9, 0, 0, 5],
        vec![0, 0, 0, 0, 8, 0, 0, 7, 9],
    ];

    let mut board = vec![
            vec![8, 0, 0, 0, 0, 0, 0, 0, 0],
            vec![0, 0, 3, 6, 0, 0, 0, 0, 0],
            vec![0, 7, 0, 0, 9, 0, 2, 0, 0],
            vec![0, 5, 0, 0, 0, 7, 0, 0, 0],
            vec![0, 0, 0, 0, 4, 5, 7, 0, 0],
            vec![0, 0, 0, 1, 0, 0, 0, 3, 0],
            vec![0, 0, 1, 0, 0, 0, 0, 6, 8],
            vec![0, 0, 8, 5, 0, 0, 0, 1, 0],
            vec![0, 9, 0, 0, 0, 0, 4, 0, 0],
        ];

    println!("Original Sudoku:");
    print_board(&board);
    println!();

    if solve_sudoku(&mut board) {
        println!("Solved Sudoku:");
        print_board(&board);
    } else {
        println!("No solution exists.");
    }
}
