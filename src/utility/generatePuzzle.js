import seedrandom from "seedrandom";
import { CELL_STATE } from "./constants";
import { create2DArray } from "./puzzleUtility";


/**
 * Creates a size by size 2D-array containing a puzzle
 * 
 * @param {*} size The number of rows and columns of the puzzle
 * @param {*} seed The seed of the puzzle
 * @returns A size by size 2D-array containing a puzzle
 */
function generatePuzzle(size, seed) {
  const rng = seedrandom(seed);
  const puzzle = create2DArray(size, CELL_STATE.BLANK);

  const MAX_BLOCK_SIZE = Math.floor(0.8 * size);
  const MIN_FILLED = Math.ceil(size * size / 2);

  function getCol(colIndex) {
    return puzzle.map(row => row[colIndex]);
  }

  function setCol(colIndex, newCol) {
    puzzle.forEach((row, rowIndex) => {
      row[colIndex] = newCol[rowIndex];
    })
  }


  // ensure every row and column has filled cells
  for (let k = 0; k < size; k++) {
    // set row
    const rowStart = Math.floor(rng() * size);
    puzzle[k].fill(
      CELL_STATE.FILLED,
      rowStart,
      rowStart + 1 + Math.floor(rng() * Math.min(MAX_BLOCK_SIZE, size - rowStart))
    )

    // set col
    const colStart = Math.floor(rng() * size);
    const newCol = getCol(k).fill(
      CELL_STATE.FILLED,
      colStart,
      colStart + 1 + Math.floor(rng() * Math.min(MAX_BLOCK_SIZE, size - colStart))
    )
    setCol(k, newCol);
  }


  let filledCount = puzzle.flat().reduce((n, x) => n + (x === CELL_STATE.FILLED), 0);

  // add random cells if less than the required filled amount
  while (filledCount < MIN_FILLED) {
    const flatPuzzle = puzzle.flat();
    let randomIndex = Math.floor(rng() * size * size); 

    while (flatPuzzle[randomIndex] !== CELL_STATE.BLANK) {
      randomIndex = (randomIndex + 1) % (size * size) ;
    }

    const rowIndex = Math.floor(randomIndex / size);
    const colIndex = randomIndex % size;
    puzzle[rowIndex][colIndex] = CELL_STATE.FILLED; 
    filledCount++;
  }

  return puzzle
}

export default generatePuzzle;