const { expect } = require('chai');
const sinon = require('sinon');
const Matrix = require('./matrix');
const {
    gauss,
    gauss_forward,
    gauss_backward,
} = require('./gauss_functions');

describe('Matrix Class', () => {
    let mat;

    beforeEach(() => {
        mat = new Matrix(3);
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('Constructor and get_matrix()', () => {
        it('should create a matrix of given dimensions filled with zeros', () => {
            expect(mat.matrix).to.deep.equal([[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]);
        });
    });

    describe('mull_add()', () => {
        it('should call get_cols() the correct number of times', () => {
            const getColsSpy = sinon.spy(mat, 'get_cols');

            mat.set(0, 0, 1);
            mat.set(1, 0, 2);
            mat.mull_add(0, 1, 3);

            expect(getColsSpy.callCount).to.equal(5);
            expect(getColsSpy.calledBefore(mat.matrix[0][0])).to.be.true;
        });
    });

    describe('exists_wrong_row()', () => {
        it('should call get_rows() correctly', () => {
            const getRowsSpy = sinon.spy(mat, 'get_rows');

            mat.set(2, 0, 0);
            mat.set(2, 1, 0);
            mat.set(2, 2, 0);
            mat.set(2, 3, 5);

            mat.exists_wrong_row();

            expect(getRowsSpy.callCount).to.be.greaterThan(0);
        });
    });

    describe('exists_zero_row()', () => {
        it('should call get_rows() and get_cols() correctly', () => {
            const getRowsSpy = sinon.spy(mat, 'get_rows');
            const getColsSpy = sinon.spy(mat, 'get_cols');

            expect(mat.exists_zero_row()).to.be.true;

            expect(getRowsSpy.callCount).to.equal(1);
            expect(getColsSpy.callCount).to.equal(5);
        });
    });

    describe('swap_with_nonzero_row()', () => {
        it('should call get_rows() correctly when looking for a non-zero row', () => {
            const getRowsSpy = sinon.spy(mat, 'get_rows');

            mat.set(1, 0, 1);
            mat.swap_with_nonzero_row(0);

            expect(getRowsSpy.callCount).to.be.greaterThan(0);
        });
    });

});


describe('Gauss Elimination Functions', () => {
    let mockMatrix;

    beforeEach(() => {
        mockMatrix = sinon.createStubInstance(Matrix);
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('gauss_forward()', () => {
        it('should perform forward elimination correctly', () => {
            mockMatrix.get_rows.returns(3);
            mockMatrix.get_cols.returns(4);
            mockMatrix.get.withArgs(0, 0).returns(2);
            mockMatrix.get.withArgs(1, 0).returns(4);
            mockMatrix.get.withArgs(2, 0).returns(6);
            mockMatrix.get.withArgs(1, 1).returns(1);
            mockMatrix.get.withArgs(2, 1).returns(3);

            gauss_forward(mockMatrix);

            expect(mockMatrix.mull_add.callCount).to.be.equal(3);
            expect(mockMatrix.swap_with_nonzero_row.notCalled).to.be.true;
        });
    });

    describe('gauss_backward()', () => {
        it('should return the correct solutions', () => {
            mockMatrix.get_rows.returns(3);
            mockMatrix.get_cols.returns(4);
            mockMatrix.get.withArgs(0, 0).returns(2);
            mockMatrix.get.withArgs(0, 1).returns(1);
            mockMatrix.get.withArgs(0, 2).returns(3);
            mockMatrix.get.withArgs(0, 3).returns(5);
            mockMatrix.get.withArgs(1, 0).returns(4);
            mockMatrix.get.withArgs(1, 1).returns(1);
            mockMatrix.get.withArgs(1, 2).returns(2);
            mockMatrix.get.withArgs(1, 3).returns(3);
            mockMatrix.get.withArgs(2, 0).returns(6);
            mockMatrix.get.withArgs(2, 1).returns(1);
            mockMatrix.get.withArgs(2, 2).returns(1);
            mockMatrix.get.withArgs(2, 3).returns(1);

            const solutions = gauss_backward(mockMatrix);
            expect(solutions).to.deep.equal([0.5, 1, 1]);
        });
    });

    describe('gauss()', () => {
        it('should return solutions if no wrong or zero rows exist', () => {
            mockMatrix.exists_wrong_row.returns(false);
            mockMatrix.exists_zero_row.returns(false);

            mockMatrix.get_rows.returns(3);
            mockMatrix.get_cols.returns(4);
            mockMatrix.get.withArgs(0, 0).returns(2);
            mockMatrix.get.withArgs(0, 1).returns(1);
            mockMatrix.get.withArgs(0, 2).returns(3);
            mockMatrix.get.withArgs(0, 3).returns(5);
            mockMatrix.get.withArgs(1, 0).returns(4);
            mockMatrix.get.withArgs(1, 1).returns(1);
            mockMatrix.get.withArgs(1, 2).returns(2);
            mockMatrix.get.withArgs(1, 3).returns(3);
            mockMatrix.get.withArgs(2, 0).returns(6);
            mockMatrix.get.withArgs(2, 1).returns(1);
            mockMatrix.get.withArgs(2, 2).returns(1);
            mockMatrix.get.withArgs(2, 3).returns(1);


            const solutions = gauss(mockMatrix);
            expect(solutions).to.deep.equal([0.5, 1, 1]);
        });

        it('should return null if there is a wrong row', () => {
            mockMatrix.exists_wrong_row.returns(true);

            const result = gauss(mockMatrix);
            expect(result).to.be.null;
        });

        it('should return null if there is a zero row', () => {
            mockMatrix.exists_zero_row.returns(true);

            const result = gauss(mockMatrix);
            expect(result).to.be.null;
        });
    });

});
