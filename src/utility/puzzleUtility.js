import { CELL_STATE, MAX_SEED } from "./constants";

/**
 * A helper function to get the transpose of a 2D-array
 * 
 * @param {*} matrix A 2D-array
 * @returns The 2D-array transpose of the input matrix
 */
export function transpose(matrix) {
  return matrix[0].map((col, colIndex) => matrix.map(row => row[colIndex]))
}



/**
 *  Creates a square 2D array with specified length and element values
 * 
 * @param {integer} size The length of the inner and outer arrays
 * @param {*} value The value to fill the cells with
 * @returns A size by size 2D array with value elements
 */
export function create2DArray(size, value) {
  return Array.from({length: size}, () => (
    Array.from({length: size}, () => value))
  );
}



/**
 * CURRENTLY UNUSED
 * A helper function to generate the number of block groups for the given array
 * 
 * @param {*} array A row/column to calculate the number of block groups for
 * @returns The integer number of block groups 
 */
export function getNumBlockGroups(rowOrCol) {
  let numBlockGroups = 0
  let inBlock = false;

  for (let i = 0; i < rowOrCol.length; i++) {
    if (rowOrCol[i] === CELL_STATE.FILLED) {
      inBlock = true;

      if (i === rowOrCol.length - 1) {
        numBlockGroups++;
      }
    }
    else if (inBlock) {
      numBlockGroups++;
      inBlock = false;
    }
  }

  return numBlockGroups;
}


/**
 * Generate a random seed in a consistent range
 * 
 * @returns A random seed integer
 */
export function getRandomSeed() {
  return Math.floor(Math.random() * (MAX_SEED + 1));
}



/**
 * A helper function to generate the hints for the given array
 * 
 * @param {*} array A row/column to generate the hint array for
 * @returns Hint array for the input row/column array
 */
export function generateHint(array) {
  const hintArray = [];
  let currentBlockLength = 0;

  for (let i = 0; i < array.length; i++) {
    if (array[i] === CELL_STATE.FILLED) {
      currentBlockLength += 1;

      if (i === array.length - 1) {
        hintArray.push(currentBlockLength);
      }
    }
    else if (currentBlockLength > 0) {
      hintArray.push(currentBlockLength);
      currentBlockLength = 0;
    }
  }

  return hintArray;
}



/**
 * Generates a 2D-array containing the hints for each row
 * 
 * @param {*} cells A 2D-array of the cells of a puzzle
 * @returns A 2D-array containing a hint array for each row of the puzzle
 */
export function generateRowHints(cells) {
  return cells.map(row => generateHint(row))
}



/**
 * Generates a 2D-array containing the hints for each column
 * 
 * @param {*} cells A 2D-array of the cells of a puzzle
 * @returns A 2D-array containing a hint array for each column of the puzzle
 */
export function generateColHints(cells) {
  const cellsTranspose = transpose(cells);
  return cellsTranspose.map(col => generateHint(col))
}

