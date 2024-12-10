import { CELL_STATE } from "./constants";
import { create2DArray } from "./puzzleUtility";


/*
This function is used to give us something to spy on in tests.
We can then initialise the Puzzle's cells however we please rather than 
always starting with a blank puzzle
*/

function generateDefaultCells(size) {
  return create2DArray(size, CELL_STATE.BLANK);
}

export default generateDefaultCells;
