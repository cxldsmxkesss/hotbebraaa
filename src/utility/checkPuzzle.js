import { generateRowHints, generateColHints} from "./puzzleUtility";
import { CELL_STATE } from "./constants";

/**
 * checks if the puzzle has been completed correctly
 * note: compares hints rather than the solution 2D-array in case solution is not unique.
 *       it would be much better to ensure all solutions are unique
 * 
 * @param {*} cells 2D-array of the users filled out cells
 * @param {*} solution 2D-array containing solution cells
 * @returns true if puzzle is correct, false otherwise
 */
function checkPuzzle(cells, solution) {
  // convert crossed cells to blank
  const cleanCells = cells.map(row => (
    row.map(cell => cell === CELL_STATE.CROSSED? CELL_STATE.BLANK: cell)
  ))

  return (
    JSON.stringify(generateRowHints(solution)) === JSON.stringify(generateRowHints(cleanCells)) &&
    JSON.stringify(generateColHints(solution)) === JSON.stringify(generateColHints(cleanCells))
  )
}

export default checkPuzzle