from typing import Callable
import numpy as np
import tkinter as tk
import tkinter.font as tkFont


class GridVisualizer:
    def __init__(self, title: str, window_length: float, grid: np.ndarray, N: int):
        self.root = tk.Tk()
        self.root.title(title)

        self.canvas = tk.Canvas(self.root, width=window_length, height=window_length)
        self.canvas.pack()

        self.grid_side = grid.shape[0]

        self.spacing = window_length / grid.shape[0]

        # Lines
        normal_width = 1
        bold_width = 3
        for i in range(0, grid.shape[0] + 1):
            line_width = normal_width if i % N != 0 else bold_width
            self.canvas.create_line(
                0, i * self.spacing, window_length, i * self.spacing, width=line_width
            )
            self.canvas.create_line(
                i * self.spacing, 0, i * self.spacing, window_length, width=line_width
            )

        # Text
        bold_font = tkFont.Font(weight="bold", size=20)
        normal_font = tkFont.Font(weight="normal", size=20)

        self.texts = []
        for row in range(grid.shape[1]):
            self.texts.append([])
            for col in range(grid.shape[0]):
                if grid[col, row] != 0:
                    text = str(grid[col, row])
                    font = bold_font
                else:
                    text = " "
                    font = normal_font
                id = self.canvas.create_text(
                    (col + 0.5) * self.spacing,
                    (row + 0.5) * self.spacing,
                    text=text,
                    font=font,
                )
                self.texts[row].append(id)

    def update_grid(self, grid: np.ndarray[int, int]):
        for row in range(self.grid_side):
            for col in range(self.grid_side):
                value = grid[col, row]
                if value == 0:
                    self.canvas.itemconfig(self.texts[row][col], text=" ")
                else:
                    self.canvas.itemconfig(self.texts[row][col], text=str(value))

        self.canvas.update()

    def call_after(self, function, delay_ms=10):
        self.root.after(delay_ms, function)

    def run_blocking(self, solver: Callable[[None], None] = None):
        if solver is not None:
            self.root.after(100, solver)
        self.root.mainloop()
