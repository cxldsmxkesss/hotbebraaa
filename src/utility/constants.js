export const CELL_STATE = {
  BLANK: 0,
  FILLED: 1,
  CROSSED: 2
};

export const CELL_STATE_CLASSES = {
  [CELL_STATE.BLANK]: "blank",
  [CELL_STATE.FILLED]: "filled",
  [CELL_STATE.CROSSED]: "crossed"
}

export const BOARD_SIZES = [5, 10, 15, 20, 25];

export const MIN_SEED = 0;
export const MAX_SEED = 999999999;
