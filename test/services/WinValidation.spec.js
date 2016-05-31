import React from 'react';
import { expect } from 'chai';

import WinValidation from '../../src/services/WinValidation.js';

const validation = new WinValidation();

describe('Win Validation', function() {
  it('should be an object', function() {
    expect(typeof validation).to.equal('object');
  });

  describe('equalContents', function() {
    it('should be a function', function() {
      expect(typeof validation.equalContents).to.equal('function');
    });

    it('should return false if an empty array is passed in', function() {
      expect(validation.equalContents([])).to.equal(false);
    });

    it('should return true if all contents in an array are the same', function() {
      const test = ['o', 'o', 'o'];
      const intTest = [0, 0, 0, 0];
      const largeTest = test.concat(test).concat(test);

      expect(validation.equalContents(test)).to.equal(true);
      expect(validation.equalContents(intTest)).to.equal(true);
      expect(validation.equalContents(largeTest)).to.equal(true);
    });

    it('should return false if all contents in an array are not the same', function() {
      const test = ['x', 'o', 'x'];
      const intTest = [1, 2, 3, 4];
      const largeTest = test.concat(test).concat(test);

      expect(validation.equalContents(test)).to.equal(false);
      expect(validation.equalContents(intTest)).to.equal(false);
      expect(validation.equalContents(largeTest)).to.equal(false);
    });
  });

  describe('getColumn', function() {
    it('should be a function', function() {
      expect(typeof validation.getColumn).to.equal('function');
    });

    it('should return an array with all of the values in a column of an array matrix', function() {
      const matrix = [
        ['x', 'o', 'x'],
        ['x', 'x', 'o'],
        ['x', 'x', 'o'],
      ];

      expect(validation.getColumn(matrix, 0)).to.deep.equal(['x', 'x', 'x']);
      expect(validation.getColumn(matrix, 1)).to.deep.equal(['o', 'x', 'x']);
      expect(validation.getColumn(matrix, 2)).to.deep.equal(['x', 'o', 'o']);
    });
  });

  describe('getDiagonals', function() {
    it('should be a function', function() {
      expect(typeof validation.getDiagonals).to.equal('function');
    });

    it('should return an object with downward and upward arrays extracted from a matrix', function() {
      const matrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];

      expect(typeof validation.getDiagonals(matrix)).to.equal('object');

      const { downward, upward } = validation.getDiagonals(matrix);

      expect(downward).to.include.members([1, 5, 9]);
      expect(upward).to.include.members([7, 5, 3]);
    });
  });

  describe('isHorizontalWin', function() {
    it('should be a function', function() {
      expect(typeof validation.isHorizontalWin).to.equal('function');
    });

    it('should return false if no horizontal win is present', function() {
      const noHorizontalWin = [
        ['x', 'o', 'x'],
        ['x', 'x', 'o'],
        ['x', 'x', 'o'],
      ];

      expect(validation.isHorizontalWin(noHorizontalWin)).to.equal(false);
    });

    describe('should return true if a horizontal win is present in', function() {
      it('the first row', function() {
        const firstRow = [
          ['x', 'x', 'x'],
          ['x', 'o', 'o'],
          ['x', 'x', 'o'],
        ];

        expect(validation.isHorizontalWin(firstRow)).to.equal(true);
      });

      it('the second row', function() {
        const secondRow = [
          ['x', 'o', 'x'],
          ['o', 'o', 'o'],
          ['x', 'x', 'o'],
        ];

        expect(validation.isHorizontalWin(secondRow)).to.equal(true);
      });

      it('the third row', function() {
        const thirdRow = [
          ['x', 'o', 'x'],
          ['x', 'x', 'o'],
          ['o', 'o', 'o'],
        ];

        expect(validation.isHorizontalWin(thirdRow)).to.equal(true);
      });

      it('any row', function() {
        const anyRow = [
          ['x', 'o', 'x', 'o', 'o', 'x'],
          ['o', 'o', 'o', '', 'x', 'x'],
          ['x', 'x', 'o', '', 'o', 'o'],
          ['x', 'x', 'o', '', '', ''],
          ['x', 'x', 'o', '', '', ''],
          ['x', 'x', 'x', 'x', 'x', 'x'],
        ];

        expect(validation.isHorizontalWin(anyRow)).to.equal(true);
      });
    });
  });

  describe('isVerticalWin', function() {
    it('should be a function', function() {
      expect(typeof validation.isVerticalWin).to.equal('function');
    });

    it('should return false if no vertical win is present', function() {
      const noVerticalWin = [
        ['x', 'o', 'x'],
        ['o', 'o', 'o'],
        ['x', 'x', 'o'],
      ];

      expect(validation.isVerticalWin(noVerticalWin)).to.equal(false);
    });

    describe('should return true if a vertical win is present in', function() {
      it('the first col', function() {
        const firstCol = [
          ['x', 'x', 'x'],
          ['x', 'o', 'o'],
          ['x', 'x', 'o'],
        ];

        expect(validation.isVerticalWin(firstCol)).to.equal(true);
      });

      it('the second col', function() {
        const secondCol = [
          ['x', 'x', 'x'],
          ['o', 'x', 'o'],
          ['x', 'x', 'o'],
        ];

        expect(validation.isVerticalWin(secondCol)).to.equal(true);
      });

      it('the third col', function() {
        const thirdCol = [
          ['x', 'o', 'o'],
          ['x', 'x', 'o'],
          ['o', 'o', 'o'],
        ];

        expect(validation.isVerticalWin(thirdCol)).to.equal(true);
      });

      it('any col', function() {
        const anyCol = [
          ['x', 'o', 'x', 'o', 'o', 'x'],
          ['o', 'o', 'o', 'o', 'x', 'x'],
          ['x', 'x', 'o', 'o', 'o', 'o'],
          ['x', 'x', 'o', 'o', 'o', 'x'],
          ['x', 'x', 'o', 'o', '', ''],
          ['x', 'x', 'x', 'o', 'x', 'x'],
        ];

        expect(validation.isVerticalWin(anyCol)).to.equal(true);
      });
    });
  });

  describe('isDiagnolWin', function() {
    it('should be a function', function() {
      expect(typeof validation.isDiagonalWin).to.equal('function');
    });

    it('should return false if no diagonal win is present', function() {
      const noVerticalWin = [
        ['x', 'o', 'x'],
        ['o', 'o', 'o'],
        ['x', 'x', 'o'],
      ];

      expect(validation.isDiagonalWin(noVerticalWin)).to.equal(false);
    });

    describe('should return true if a diagonal win is present in a', function() {
      it('3x3 matrix with a downward diagnol', function() {
        const downward = [
          ['x', 'o', 'x'],
          ['o', 'x', 'o'],
          ['o', 'o', 'x'],
        ];

        expect(validation.isDiagonalWin(downward)).to.equal(true);
      });

      it('3x3 matrix with an upward diagnol', function() {
        const upward = [
          ['x', 'o', 'x'],
          ['o', 'x', 'o'],
          ['x', 'o', 'x'],
        ];

        expect(validation.isDiagonalWin(upward)).to.equal(true);
      });

      it('large matrix with an downward diagnol', function() {
        const downward = [
          ['o', 'o', 'x', 'o', 'x'],
          ['o', 'o', 'o', 'x', 'x'],
          ['x', 'o', 'o', 'o', 'x'],
          ['x', 'x', 'x', 'o', 'x'],
          ['x', 'o', 'x', 'o', 'o'],
        ];

        expect(validation.isDiagonalWin(downward)).to.equal(true);
      });

      it('large matrix with an upward diagnol', function() {
        const upward = [
          ['o', 'o', 'x', 'o', 'x'],
          ['o', 'o', 'o', 'x', 'x'],
          ['x', 'o', 'x', 'o', 'x'],
          ['x', 'x', 'x', 'o', 'x'],
          ['x', 'o', 'x', 'o', 'x'],
        ];

        expect(validation.isDiagonalWin(upward)).to.equal(true);
      });
    });
  });
});