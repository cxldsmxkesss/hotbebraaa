import { generateHint, generateRowHints, generateColHints, transpose, create2DArray, getNumBlockGroups } from "./puzzleUtility.js";


describe("generateHint Tests", () => {
  test('single central block group of 1', () => {
    const input = [0, 0, 1, 0, 0];
    const expected = [1];
    expect(generateHint(input)).toStrictEqual(expected);
  })

  test('single start block group of 1', () => {
    const input = [1, 0, 0, 0, 0];
    const expected = [1];
    expect(generateHint(input)).toStrictEqual(expected);
  })

  test('single end block group of 1', () => {
    const input = [0, 0, 0, 0, 1];
    const expected = [1];
    expect(generateHint(input)).toStrictEqual(expected);
  })

  test('single end block group of 2', () => {
    const input = [0, 0, 0, 1, 1];
    const expected = [2];
    expect(generateHint(input)).toStrictEqual(expected);
  })

  test('single end block group of 3', () => {
    const input = [0, 0, 1, 1, 1];
    const expected = [3];
    expect(generateHint(input)).toStrictEqual(expected);
  })

  test('full array filled', () => {
    const input = [1, 1, 1, 1, 1];
    const expected = [5];
    expect(generateHint(input)).toStrictEqual(expected);
  })

  test('two block groups of 1', () => {
    const input = [1, 0, 1, 0, 0];
    const expected = [1, 1];
    expect(generateHint(input)).toStrictEqual(expected);
  })

  test('two central block groups of 1', () => {
    const input = [0, 1, 0, 1, 0];
    const expected = [1, 1];
    expect(generateHint(input)).toStrictEqual(expected);
  })

  test('three block groups of 1', () => {
    const input = [1, 0, 1, 0, 1];
    const expected = [1, 1, 1];
    expect(generateHint(input)).toStrictEqual(expected);
  })

  test('block group of 1 and block group of 3', () => {
    const input = [1, 0, 1, 1, 1];
    const expected = [1, 3];
    expect(generateHint(input)).toStrictEqual(expected);
  })

  test('block group of 3 and block group of 1', () => {
    const input = [1, 1, 1, 0, 1];
    const expected = [3, 1];
    expect(generateHint(input)).toStrictEqual(expected);
  })

  test('large assortment', () => {
    const input = [1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1];
    const expected = [2, 1, 4, 2, 1];
    expect(generateHint(input)).toStrictEqual(expected);
  })

  test('no filled squares', () => {
    const input = [0, 0, 0, 0, 0];
    const expected = [];
    expect(generateHint(input)).toStrictEqual(expected);
  })
})



describe("generateRowHints Tests", () => {
  test("5 by 5 puzzle #1", () => {
    const input = [
      [0, 1, 1, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 1, 1],
      [0, 1, 1, 0, 1],
      [0, 0, 1, 0, 1]
    ];
    const expected = [
      [2],
      [1],
      [1, 2],
      [2, 1],
      [1, 1]
    ];

    expect(generateRowHints(input)).toStrictEqual(expected)
  })
})



describe("generateColHints Tests", () => {
  test("5 by 5 puzzle #1", () => {
    const input = [
      [0, 1, 1, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 1, 1],
      [0, 1, 1, 0, 1],
      [0, 0, 1, 0, 1]
    ];
    const expected = [
      [2],
      [1, 1],
      [1, 2],
      [1],
      [3]
    ];

    expect(generateColHints(input)).toStrictEqual(expected)
  })
})



describe("transpose tests", () => {
  const matrices = [
    [
      [[1,0,0],[1,1,0],[1,1,1]],
      [[1,1,1],[0,1,1],[0,0,1]]
    ],

    [
      [[1,0,0],[0,1,0],[0,0,1]],
      [[1,0,0],[0,1,0],[0,0,1]]
    ],

    [
      [[1,1,1],[0,1,1],[0,0,1]],
      [[1,0,0],[1,1,0],[1,1,1]]
    ],
  ]; 

  test.each(matrices)("test correct transpose", (input, expected) => {
    expect(transpose(input)).toStrictEqual(expected);
  });
})



describe("create2DArray tests", () => {
  const params = [
    [1, 0], [1, -2], [1, "a"], [1, true],
    [2, 0], [2, -2], [2, "a"], [2, true],
    [5, 0], [5, -2], [5, "a"], [5, true],
    [10, 0], [10, -2], [10, "a"], [10, true],
    [15, 0], [15, -2], [15, "a"], [15, true],
    [20, 0], [20, -2], [20, "a"], [20, true],
    [25, 0], [25, -2], [25, "a"], [25, true],
  ];

  test.each(params)("size %i, value %p", (size, value) => {
    const actual = create2DArray(size, value);
    const expected = [];
    for (let i = 0; i < size; i++) {
      expected[i] = [];
      for (let j = 0; j < size; j++) {
          expected[i][j] = value;
      }
    }

    expect(actual).toStrictEqual(expected);
  }) 
})



describe("getNumBlockGroups tests", () => {
  test("completely blank #1", () => {
    const input = [0, 0, 0, 0, 0];
    const output = 0;
    expect(getNumBlockGroups(input)).toStrictEqual(output);
  })

  test("partially filled #1", () => {
    const input = [0, 1, 0, 1, 0];
    const output = 2;
    expect(getNumBlockGroups(input)).toStrictEqual(output);
  })

  test("partially filled #2", () => {
    const input = [0, 1, 0, 1, 0];
    const output = 2;
    expect(getNumBlockGroups(input)).toStrictEqual(output);
  })

  test("partially filled #3", () => {
    const input = [0, 1, 1, 1, 0];
    const output = 1;
    expect(getNumBlockGroups(input)).toStrictEqual(output);
  })

  test("partially filled #4", () => {
    const input = [0, 1, 1, 1, 1];
    const output = 1;
    expect(getNumBlockGroups(input)).toStrictEqual(output);
  })

  test("partially filled #5", () => {
    const input = [1, 0, 1, 0, 1];
    const output = 3;
    expect(getNumBlockGroups(input)).toStrictEqual(output);
  })

  test("completely filled #1", () => {
    const input = [1, 1, 1, 1, 1];
    const output = 1;
    expect(getNumBlockGroups(input)).toStrictEqual(output);
  })
})