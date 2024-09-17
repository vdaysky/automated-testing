const Mtrx = require("mtrx");
const { expect } = require("chai");
const { it } = require("mocha");


it("zeros", () => {
    const matrix = Mtrx.zeros(2, 2)
    expect(matrix[0][0]).to.equal(0);
    expect(matrix[0][1]).to.equal(0);
    expect(matrix[1][0]).to.equal(0);
    expect(matrix[1][1]).to.equal(0);
})

it('test diagonal', () => {
    const matrix = new Mtrx([0, 1, 2])
    expect(matrix.get(0, 0)).to.equal(0)
    expect(matrix.get(1, 1)).to.equal(1)
    expect(matrix.get(2, 2)).to.equal(2)
});

it('det', () => {
    const matrix = new Mtrx([[1, 2], [3, 4]])
    expect(matrix.det).to.equal(-2)
});

it('det should fail', () => {
    const matrix = new Mtrx([[1, 2, 3], [3, 4, 5]])
    expect(matrix.det).to.NaN
});

it('multiplication by number', () => {
    const matrix = new Mtrx([[1, 2], [3, 4]])
    const matrix2 = matrix.mul(2)
    expect(matrix2.get(0, 0)).to.equal(2)
    expect(matrix2.get(0, 1)).to.equal(4)
    expect(matrix2.get(1, 0)).to.equal(6)
    expect(matrix2.get(1, 1)).to.equal(8)
});

it('multiply two matrices', () => {
    const matrix = new Mtrx([[1, 2], [3, 4]])
    const matrix2 = new Mtrx([[1, 2], [3, 4]])
    const matrix3 = matrix.mul(matrix2)
    expect(matrix3.get(0, 0)).to.equal(7)
    expect(matrix3.get(0, 1)).to.equal(10)
    expect(matrix3.get(1, 0)).to.equal(15)
    expect(matrix3.get(1, 1)).to.equal(22)
});

it('add two matrices', () => {
    const matrix = new Mtrx([[1, 2], [3, 4]])
    const matrix2 = new Mtrx([[1, 2], [3, 4]])
    const matrix3 = matrix.add(matrix2)
    expect(matrix3.get(0, 0)).to.equal(2)
    expect(matrix3.get(0, 1)).to.equal(4)
    expect(matrix3.get(1, 0)).to.equal(6)
    expect(matrix3.get(1, 1)).to.equal(8)
});

it('is same shape', () => {
    const matrix = new Mtrx([[1, 2], [3, 4]])
    const matrix2 = new Mtrx([[1, 2], [3, 4]])
    expect(Mtrx.isSameShape(matrix, matrix2)).to.equal(true)
});

it('is not same shape', () => {
    const matrix = new Mtrx([[1, 2], [3, 4]])
    const matrix2 = new Mtrx([[1, 2], [3, 4], [5, 6]])
    expect(Mtrx.isSameShape(matrix, matrix2)).to.equal(false)
});
