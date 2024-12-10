import generatePuzzle from "./generatePuzzle";
import { CELL_STATE, BOARD_SIZES } from "./constants";
import { transpose } from "./puzzleUtility";


describe("generatePuzzle tests", () => {
  describe("test puzzle is correct size", () => {
    test.each(BOARD_SIZES)("correct number of rows", async size => {
      const puzzle = generatePuzzle(size, 123);
      expect(puzzle.length).toStrictEqual(size);
    });

    test.each(BOARD_SIZES)("correct number of columns", async size => {
      const puzzle = generatePuzzle(size, 123);
      puzzle.forEach(row => {
        expect(row.length).toStrictEqual(size);
      });
    });
  });


  describe("test same seed gives same puzzle", () => {
    const seeds = Array.from(Array(100).keys());

    BOARD_SIZES.forEach(size => {   
      test.each(seeds)(`for size ${size}`, async seed => {
        const puzzle1 = generatePuzzle(size, seed);
        const puzzle2 = generatePuzzle(size, seed);
        expect(puzzle1).toStrictEqual(puzzle2);
      });
    });
  });


  describe("test different seed gives different puzzle", () => {
    const seeds = [[467186, 232], [2194791, 532], [1242, 12], [99852, 41000]];

    BOARD_SIZES.forEach(size => {
      test.each(seeds)(`for size ${size}`, async (seed1, seed2) => {
        const puzzle1 = generatePuzzle(size, seed1);
        const puzzle2 = generatePuzzle(size, seed2);
        expect(puzzle1).not.toStrictEqual(puzzle2);
      });
    });
  });


  describe("test at least minfFilled cells", () => {
    const params = [[5, 13], [10, 50], [15, 113], [20, 200], [25, 313]];
    test.each(params)("size %i has at least %i filled", (size, minFilled) => {
      const puzzle = generatePuzzle(size, 123);
      const filledCount = puzzle.flat().reduce((n, x) => n + (x === CELL_STATE.FILLED), 0);

      expect(filledCount).toBeGreaterThanOrEqual(minFilled)
    })
  })


  describe("test all rows and columns are non-empty", () => {
    const seeds = Array.from(Array(100).keys());
    test.each(BOARD_SIZES)("all rows and columns are non-empty with size %i", (size) => {
      seeds.forEach(seed => {
        const puzzle = generatePuzzle(size, seed);
        const transposedPuzzle = transpose(puzzle);
  
        expect(puzzle.every(row => row.includes(CELL_STATE.FILLED))).toStrictEqual(true);
        expect(transposedPuzzle.every(col => col.includes(CELL_STATE.FILLED))).toStrictEqual(true);
      })
    })
  })

})