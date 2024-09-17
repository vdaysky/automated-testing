from matrix import Matrix


def test_matrix_multiply_by_scalar():
    matrix = Matrix([[1, 2], [3, 4]])
    result = matrix * 2
    assert result == [[2, 4], [6, 8]]


def test_matrix_multiply_by_matrix():
    matrix1 = Matrix([[1, 2], [3, 4]])
    matrix2 = Matrix([[1, 2], [3, 4]])
    result = matrix1 * matrix2
    assert result == [[7, 10], [15, 22]]


def test_matrix_addition():
    matrix1 = Matrix([[1, 2], [3, 4]])
    matrix2 = Matrix([[1, 2], [3, 4]])
    result = matrix1 + matrix2
    assert result == [[2, 4], [6, 8]]


def test_matrix_subtraction():
    matrix1 = Matrix([[1, 2], [3, 4]])
    matrix2 = Matrix([[1, 2], [3, 4]])
    result = matrix1 - matrix2
    assert result == [[0, 0], [0, 0]]


def test_matrix_transpose():
    matrix = Matrix([[1, 2], [3, 4]])
    result = matrix.transpose()
    assert result == [[1, 3], [2, 4]]


def test_matrix_multiply_by_vector():
    matrix = Matrix([[1, 2], [3, 4]])
    vector = [1, 2]
    result = matrix * vector
    assert result == [5, 11]
