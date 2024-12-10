import checkPuzzle from "./checkPuzzle";

describe("checkPuzzle tests", () => {
  describe("correct puzzle returns true", () => {
    test("with no crossed #1", () => {
      const cells = [
        [1, 0, 1, 0, 1],
        [0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0],
        [1, 1, 1, 0, 0],
        [0, 1, 1, 0, 1]
      ];
  
      const solution = [
        [1, 0, 1, 0, 1],
        [0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0],
        [1, 1, 1, 0, 0],
        [0, 1, 1, 0, 1]
      ]
  
      expect(checkPuzzle(cells, solution)).toStrictEqual(true);
    });
  
    test("with no crossed #2", () => {
      const cells = [
        [1, 0, 1, 0, 0],
        [1, 0, 0, 1, 0],
        [1, 1, 1, 1, 0],
        [0, 1, 1, 0, 0],
        [0, 1, 1, 0, 1]
      ];
  
      const solution = [
        [1, 0, 1, 0, 0],
        [1, 0, 0, 1, 0],
        [1, 1, 1, 1, 0],
        [0, 1, 1, 0, 0],
        [0, 1, 1, 0, 1]
      ];
  
      expect(checkPuzzle(cells, solution)).toStrictEqual(true);
    });
  
    test("with all blank cells crossed #1", () => {
      const cells = [
        [1, 2, 1, 0, 1],
        [0, 0, 0, 0, 1],
        [1, 0, 2, 1, 2],
        [1, 1, 1, 2, 0],
        [2, 1, 1, 0, 1]
      ];
  
      const solution = [
        [1, 0, 1, 0, 1],
        [0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0],
        [1, 1, 1, 0, 0],
        [0, 1, 1, 0, 1]
      ];
  
      expect(checkPuzzle(cells, solution)).toStrictEqual(true);
    });
  
    test("with all blank cells crossed #2", () => {
      const cells = [
        [1, 2, 1, 2, 2],
        [1, 2, 2, 1, 2],
        [1, 1, 1, 1, 2],
        [2, 1, 1, 2, 2],
        [2, 1, 1, 2, 1]
      ];
  
      const solution = [
        [1, 0, 1, 0, 0],
        [1, 0, 0, 1, 0],
        [1, 1, 1, 1, 0],
        [0, 1, 1, 0, 0],
        [0, 1, 1, 0, 1]
      ];
  
      expect(checkPuzzle(cells, solution)).toStrictEqual(true);
    });
  
    test("with some blank cells crossed  #1", () => {
      const cells = [
        [1, 2, 1, 0, 1],
        [0, 0, 0, 0, 1],
        [1, 0, 2, 1, 0],
        [1, 1, 1, 0, 2],
        [2, 1, 1, 0, 1]
      ];
  
      const solution = [
        [1, 0, 1, 0, 1],
        [0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0],
        [1, 1, 1, 0, 0],
        [0, 1, 1, 0, 1]
      ];
  
      expect(checkPuzzle(cells, solution)).toStrictEqual(true);
    });

    test("with some blank cells crossed #2", () => {
      const cells = [
        [1, 0, 1, 0, 2],
        [1, 2, 0, 1, 2],
        [1, 1, 1, 1, 0],
        [0, 1, 1, 2, 0],
        [2, 1, 1, 0, 1]
      ];
  
      const solution = [
        [1, 0, 1, 0, 0],
        [1, 0, 0, 1, 0],
        [1, 1, 1, 1, 0],
        [0, 1, 1, 0, 0],
        [0, 1, 1, 0, 1]
      ];
  
      expect(checkPuzzle(cells, solution)).toStrictEqual(true);
    });

    test("different solution for non-unique solution returns true #1", () => {
      const cells = [
        [1, 0, 1, 0],
        [0, 1, 0, 1],
        [1, 0, 1, 0],
        [0, 1, 0, 1],
      ];
  
      const solution = [
        [0, 1, 0, 1],
        [1, 0, 1, 0],
        [0, 1, 0, 1],
        [1, 0, 1, 0],
      ];
  
      expect(checkPuzzle(cells, solution)).toStrictEqual(true);
    });

    test("different solution for non-unique solution returns true #2", () => {
      const cells = [
        [1, 1, 0, 1, 0],
        [0, 1, 0, 0, 1],
        [1, 0, 1, 0, 0],
        [0, 1, 0, 1, 1],
        [1, 1, 0, 1, 1],
      ];
  
      const solution = [
        [1, 1, 0, 0, 1],
        [0, 1, 0, 1, 0],
        [1, 0, 1, 0, 0],
        [0, 1, 0, 1, 1],
        [1, 1, 0, 1, 1],
      ];
  
      expect(checkPuzzle(cells, solution)).toStrictEqual(true);
    });

  })

  describe("incorrect puzzle returns false", () => {
    test("with correct rows, incorrect columns", () => {
      const cells = [
        [1, 0, 1, 0, 1],
        [0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0],
        [1, 1, 1, 0, 0],
        [0, 1, 1, 0, 1]
      ];
  
      const solution = [
        [1, 0, 1, 0, 1],
        [0, 0, 1, 0, 0],
        [1, 0, 1, 0, 0],
        [0, 1, 1, 1, 0],
        [1, 1, 0, 0, 1]
      ]
  
      expect(checkPuzzle(cells, solution)).toStrictEqual(false);
    });

    test("with correct columns, incorrect rows", () => {
      const cells = [
        [1, 0, 1, 0, 1],
        [0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0],
        [1, 1, 1, 0, 0],
        [0, 1, 1, 0, 1]
      ];
  
      const solution = [
        [1, 1, 1, 0, 1],
        [0, 1, 0, 0, 1],
        [0, 0, 0, 0, 0],
        [1, 0, 1, 1, 0],
        [1, 0, 1, 0, 1]
      ];
  
      expect(checkPuzzle(cells, solution)).toStrictEqual(false);
    });

    test("with incorrect columns, incorrect rows", () => {
      const cells = [
        [1, 0, 1, 0, 1],
        [0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0],
        [1, 1, 1, 0, 0],
        [0, 1, 1, 0, 1]
      ];
  
      const solution = [
        [1, 0, 0, 1, 1],
        [0, 1, 0, 1, 0],
        [1, 1, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 0, 0, 1]
      ];
  
      expect(checkPuzzle(cells, solution)).toStrictEqual(false);
    });

    test("blank puzzle, non-blank solution", () => {
      const cells = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ];
  
      const solution = [
        [1, 0, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0],
        [1, 0, 1, 0, 1]
      ];

      expect(checkPuzzle(cells, solution)).toStrictEqual(false);
    });

    test("correct puzzle but with crossed instead of filled", () => {
      const cells = [
        [2, 0, 2, 0, 2],
        [0, 0, 0, 0, 2],
        [2, 0, 0, 2, 0],
        [2, 2, 2, 0, 0],
        [0, 2, 2, 0, 2]
      ];
  
      const solution = [
        [1, 0, 1, 0, 1],
        [0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0],
        [1, 1, 1, 0, 0],
        [0, 1, 1, 0, 1]
      ];

      expect(checkPuzzle(cells, solution)).toStrictEqual(false);
    });

  })
  
})