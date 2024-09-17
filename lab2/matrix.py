class Matrix:

    def __init__(self, contents):
        self.contents = [tuple(r) for r in contents]

    def __mul__(self, other):
        if isinstance(other, int):
            return Matrix([[i * other for i in row] for row in self.contents])
        elif isinstance(other, Matrix):
            return Matrix([[sum(a * b for a, b in zip(row_a, col_b)) for col_b in zip(*other.contents)] for row_a in self.contents])
        elif isinstance(other, list):
            return [sum(a * b for a, b in zip(row, other)) for row in self.contents]

    def __add__(self, other):
        return Matrix([[a + b for a, b in zip(row_a, row_b)] for row_a, row_b in zip(self.contents, other.contents)])

    def __sub__(self, other):
        return Matrix([[a - b for a, b in zip(row_a, row_b)] for row_a, row_b in zip(self.contents, other.contents)])

    def transpose(self):
        return Matrix(list(zip(*self.contents)))

    def __eq__(self, other):
        if isinstance(other, Matrix):
            return self.contents == other.contents

        return self == Matrix(other)
