/** @jest-environment jsdom */
import React from 'react';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event'

// fix for structuredClone in jsdom
import structuredClone from '@ungap/structured-clone';
global.structuredClone = structuredClone;




// src imports 
import PuzzlePage from '../PuzzlePage';
import { create2DArray } from '../../utility/puzzleUtility';
import { BOARD_SIZES, CELL_STATE, CELL_STATE_CLASSES } from '../../utility/constants';
const {
  FILLED: f,
  BLANK: b,
  CROSSED: c
 } = CELL_STATE;






 // mocks
import { useParams } from 'react-router';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: jest.fn().mockName('mockUseParams')
}));



jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  Link: jest.fn(() => <div></div>)
}));



const generateDefaultCells = jest.requireActual('../../utility/generateDefaultCells');
let spy_generateDefaultCells;

const generatePuzzle = jest.requireActual('../../utility/generatePuzzle');
let spy_generatePuzzle;







// jest setup
jest.setTimeout(10 * 1000);

beforeEach(() => {
  spy_generatePuzzle = jest.spyOn(generatePuzzle, 'default');
  spy_generateDefaultCells = jest.spyOn(generateDefaultCells, 'default');
})

afterEach(() => {
  spy_generatePuzzle.mockRestore();
  spy_generateDefaultCells.mockRestore();
  useParams.mockReset();
})





// Page Text
const CHECK_BUTTON_TEXT = "Check Puzzle";
const RESTART_BUTTON_TEXT = "Restart Puzzle";
const PUZZLE_COMPLETE_TEXT = "Congratulations! You have solved the puzzle";
const PUZZLE_INCOMPLETE_TEXT = "The puzzle is incomplete / there are errors";






describe("Puzzle Board tests", () => {
  describe("Correct initialisation", () => {
    test.each(BOARD_SIZES)("Correct # of cells and initialised to BLANK (size: %i)", size => {
      useParams.mockReturnValue({size: size.toString(), seed: "0"});
      spy_generateDefaultCells.mockRestore(); /// mock restore is completely resetting the spyon, need to spyon before each test I think!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      spy_generatePuzzle.mockRestore();
      
  
      const { container } = render(<PuzzlePage />);
  
      const puzzleButtons = container.querySelectorAll('.cell');
      expect(puzzleButtons).toHaveLength(size*size);

      for(const puzzleButton of puzzleButtons) {
        expect(puzzleButton).toHaveClass('cell');
        expect(puzzleButton).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK]);
        expect(puzzleButton).not.toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED]);
        expect(puzzleButton).not.toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED]);
      }
    })
  })



  describe("Single click tests:", () => {
    // test suite mocks
    const size = "5";
    const seed = "0"
    const solution = create2DArray(size, CELL_STATE.BLANK);


    beforeEach(() => {
      // Note: seed isn't used to generate the puzzle since generatePuzzle is mocked
      useParams.mockReturnValue({size: size, seed: seed});
      spy_generatePuzzle.mockReturnValue(solution);
    })



    test("Left click on BLANK cell makes it FILLED", async () => {
      const init_cells = create2DArray(size, CELL_STATE.BLANK);
      spy_generateDefaultCells.mockReturnValue(init_cells);

      const user = userEvent.setup();
      const { container } = render(<PuzzlePage />);
  
      const puzzleButton = container.querySelector('.cell');    
      expect(puzzleButton).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK]);
      expect(puzzleButton).not.toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED]);
      expect(puzzleButton).not.toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED]);

      await user.pointer({ keys: '[MouseLeft]', target: puzzleButton });

      expect(puzzleButton).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED]);
      expect(puzzleButton).not.toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK]);
      expect(puzzleButton).not.toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED]);
    })



    test("Left click on FILLED cell makes it BLANK", async () => {
      const init_cells = create2DArray(size, CELL_STATE.FILLED);
      spy_generateDefaultCells.mockReturnValue(init_cells);

      const user = userEvent.setup();
      const { container } = render(<PuzzlePage />);
  
      const puzzleButton = container.querySelector('.cell');    
      expect(puzzleButton).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED]);
      expect(puzzleButton).not.toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK]);
      expect(puzzleButton).not.toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED]);

      await user.pointer({ keys: '[MouseLeft]', target: puzzleButton });

      expect(puzzleButton).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK]);
      expect(puzzleButton).not.toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED]);
      expect(puzzleButton).not.toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED]);
    })



    test("Left click on CROSSED cell makes it FILLED", async () => {
      const init_cells = create2DArray(size, CELL_STATE.CROSSED);
      spy_generateDefaultCells.mockReturnValue(init_cells);

      const user = userEvent.setup();
      const { container } = render(<PuzzlePage />);
  
      const puzzleButton = container.querySelector('.cell');    
      expect(puzzleButton).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED]);
      expect(puzzleButton).not.toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK]);
      expect(puzzleButton).not.toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED]);

      await user.pointer({ keys: '[MouseLeft]', target: puzzleButton });

      expect(puzzleButton).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED]);
      expect(puzzleButton).not.toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK]);
      expect(puzzleButton).not.toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED]);
    })



    test("Right click on BLANK cell makes it CROSSED", async () => {
      const init_cells = create2DArray(size, CELL_STATE.BLANK);
      spy_generateDefaultCells.mockReturnValue(init_cells);

      const user = userEvent.setup();
      const { container } = render(<PuzzlePage />);
  
      const puzzleButton = container.querySelector('.cell');
      
      expect(puzzleButton).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK]);
      expect(puzzleButton).not.toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED]);
      expect(puzzleButton).not.toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED]);

      await user.pointer({ keys: '[MouseRight]', target: puzzleButton });

      expect(puzzleButton).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED]);
      expect(puzzleButton).not.toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK]);
      expect(puzzleButton).not.toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED]);
    })



    test("Right click on FILLED cell makes it CROSSED", async () => {
      const init_cells = create2DArray(size, CELL_STATE.FILLED);
      spy_generateDefaultCells.mockReturnValue(init_cells);

      const user = userEvent.setup();
      const { container } = render(<PuzzlePage />);
  
      const puzzleButton = container.querySelector('.cell');
      
      expect(puzzleButton).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED]);
      expect(puzzleButton).not.toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK]);
      expect(puzzleButton).not.toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED]);

      await user.pointer({ keys: '[MouseRight]', target: puzzleButton });

      expect(puzzleButton).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED]);
      expect(puzzleButton).not.toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK]);
      expect(puzzleButton).not.toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED]);
    })



    test("Right click on CROSSED cell makes it BLANK", async () => {
      const init_cells = create2DArray(size, CELL_STATE.CROSSED);
      spy_generateDefaultCells.mockReturnValue(init_cells);

      const user = userEvent.setup();
      const { container } = render(<PuzzlePage />);
  
      const puzzleButton = container.querySelector('.cell');
      
      expect(puzzleButton).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED]);
      expect(puzzleButton).not.toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK]);
      expect(puzzleButton).not.toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED]);

      await user.pointer({ keys: '[MouseRight]', target: puzzleButton });

      expect(puzzleButton).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK]);
      expect(puzzleButton).not.toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED]);
      expect(puzzleButton).not.toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED]);
    })
  })



  describe("Click and drag tests", () => {
    // test suite mocks
    const size = "5";
    const seed = "0"
    const solution = create2DArray(size, CELL_STATE.BLANK);

    beforeEach(() => {
      // Note: seed isn't used to generate the puzzle since generatePuzzle is mocked
      useParams.mockReturnValue({size: size, seed: seed});
      spy_generatePuzzle.mockReturnValue(solution);      
    })



    test("Left click starting on BLANK, makes dragged over cells FILLED", async () => {
      const init_cells = create2DArray(size, CELL_STATE.BLANK);
      init_cells[0] = [b, b, f, c, b],
      spy_generateDefaultCells.mockReturnValue(init_cells);

      const user = userEvent.setup();
      const { container } = render(<PuzzlePage />);
  
      const puzzleButtons = container.querySelectorAll('.cell');

      expect(puzzleButtons[0]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK]);
      expect(puzzleButtons[1]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK]);
      expect(puzzleButtons[2]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED]);
      expect(puzzleButtons[3]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED]);

      // press and hold MouseLeft on BLANK cell , assert it is FILLED
      await user.pointer({keys: '[MouseLeft>]', target: puzzleButtons[0]});
      expect(puzzleButtons[0]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED]);

      // drag to BLANK cell, and assert it is FILLED
      await user.pointer({target: puzzleButtons[1]});
      expect(puzzleButtons[1]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED]);

      // drag to FILLED cell, and assert it is FILLED
      await user.pointer({target: puzzleButtons[2]});
      expect(puzzleButtons[2]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED]);

      // drag to CROSSED cell then raise mouse, and assert it is FILLED
      await user.pointer({target: puzzleButtons[3]});
      await user.pointer({keys: '[/MouseLeft]', target: puzzleButtons[3]});
      expect(puzzleButtons[3]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED]);
    })



    test("Left click starting on FILLED, makes dragged over cells BLANK", async () => {
      const init_cells = create2DArray(size, CELL_STATE.BLANK);
      init_cells[0] = [f, f, b, c, b],
      spy_generateDefaultCells.mockReturnValue(init_cells);

      const user = userEvent.setup();
      const { container } = render(<PuzzlePage />);
  
      const puzzleButtons = container.querySelectorAll('.cell');

      expect(puzzleButtons[0]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED]);
      expect(puzzleButtons[1]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED]);
      expect(puzzleButtons[2]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK]);
      expect(puzzleButtons[3]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED]);

      // press and hold MouseLeft on FILLED cell, assert it is BLANK 
      await user.pointer({keys: '[MouseLeft>]', target: puzzleButtons[0]});
      expect(puzzleButtons[0]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK]);

      // drag to FILLED cell, and assert it is BLANK
      await user.pointer({target: puzzleButtons[1]});
      expect(puzzleButtons[1]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK]);

      // drag to BLANK cell, and assert it is BLANK
      await user.pointer({target: puzzleButtons[2]});
      expect(puzzleButtons[2]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK]);

      // drag to CROSSED cell then raise mouse, and assert it is BLANK
      await user.pointer({target: puzzleButtons[3]});
      await user.pointer({keys: '[/MouseLeft]', target: puzzleButtons[3]});
      expect(puzzleButtons[3]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK]);
    })



    test("Left click starting on CROSSED, makes dragged over cells FILLED", async () => {
      const init_cells = create2DArray(size, CELL_STATE.BLANK);
      init_cells[0] = [c, c, b, f, b],
      spy_generateDefaultCells.mockReturnValue(init_cells);

      const user = userEvent.setup();
      const { container } = render(<PuzzlePage />);
  
      const puzzleButtons = container.querySelectorAll('.cell');

      expect(puzzleButtons[0]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED]);
      expect(puzzleButtons[1]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED]);
      expect(puzzleButtons[2]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK]);
      expect(puzzleButtons[3]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED]);

      // press and hold MouseLeft on CROSSED cell, assert it is FILLED 
      await user.pointer({keys: '[MouseLeft>]', target: puzzleButtons[0]});
      expect(puzzleButtons[0]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED]);

      // drag to CROSSED cell, and assert it is BLANK
      await user.pointer({target: puzzleButtons[1]});
      expect(puzzleButtons[1]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED]);

      // drag to BLANK cell, and assert it is BLANK
      await user.pointer({target: puzzleButtons[2]});
      expect(puzzleButtons[2]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED]);

      // drag to FILLED cell then raise mouse, and assert it is FILLED
      await user.pointer({target: puzzleButtons[3]});
      await user.pointer({keys: '[/MouseLeft]', target: puzzleButtons[3]});
      expect(puzzleButtons[3]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED]);
    })   



    test("Right click starting on BLANK, makes dragged over cells CROSSED", async () => {
      const init_cells = create2DArray(size, CELL_STATE.BLANK);
      init_cells[0] = [b, b, f, c, b],
      spy_generateDefaultCells.mockReturnValue(init_cells);

      const user = userEvent.setup();
      const { container } = render(<PuzzlePage />);
  
      const puzzleButtons = container.querySelectorAll('.cell');

      expect(puzzleButtons[0]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK]);
      expect(puzzleButtons[1]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK]);
      expect(puzzleButtons[2]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED]);
      expect(puzzleButtons[3]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED]);

      // press and hold MouseRight on BLANK cell, assert it is crossed
      await user.pointer({keys: '[MouseRight>]', target: puzzleButtons[0]});
      expect(puzzleButtons[0]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED]);

      // drag to BLANK cell, and assert it is CROSSED
      await user.pointer({target: puzzleButtons[1]});
      expect(puzzleButtons[1]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED]);

      // drag to FILLED cell, and assert it is CROSSED
      await user.pointer({target: puzzleButtons[2]});
      expect(puzzleButtons[2]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED]);

      // drag to CROSSED cell then raise mouse, and assert it is CROSSED
      await user.pointer({target: puzzleButtons[3]});
      await user.pointer({keys: '[/MouseRight]', target: puzzleButtons[3]});
      expect(puzzleButtons[3]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED]);
    })



    test("Right click starting on FILLED, makes dragged over cells CROSSED", async () => {
      const init_cells = create2DArray(size, CELL_STATE.BLANK);
      init_cells[0] = [f, f, b, c, b],
      spy_generateDefaultCells.mockReturnValue(init_cells);
  
      const user = userEvent.setup();
      const { container } = render(<PuzzlePage />);
  
      const puzzleButtons = container.querySelectorAll('.cell');
  
      expect(puzzleButtons[0]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED]);
      expect(puzzleButtons[1]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED]);
      expect(puzzleButtons[2]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK]);
      expect(puzzleButtons[3]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED]);
  
      // press and hold MouseRight on FILLED cell, assert it is CROSSED 
      await user.pointer({keys: '[MouseRight>]', target: puzzleButtons[0]});
      expect(puzzleButtons[0]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED]);
  
      // drag to FILLED cell, and assert it is CROSSED
      await user.pointer({target: puzzleButtons[1]});
      expect(puzzleButtons[1]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED]);
  
      // drag to BLANK cell, and assert it is CROSSED
      await user.pointer({target: puzzleButtons[2]});
      expect(puzzleButtons[2]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED]);
  
      // drag to CROSSED cell then raise mouse, and assert it is CROSSED
      await user.pointer({target: puzzleButtons[3]});
      await user.pointer({keys: '[/MouseRight]', target: puzzleButtons[3]});
      expect(puzzleButtons[3]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED]);
    })



    test("Right click starting on CROSSED, makes dragged over cells BLANK", async () => {
      const init_cells = create2DArray(size, CELL_STATE.BLANK);
      init_cells[0] = [c, c, b, f, b],
      spy_generateDefaultCells.mockReturnValue(init_cells);

      const user = userEvent.setup();
      const { container } = render(<PuzzlePage />);
  
      const puzzleButtons = container.querySelectorAll('.cell');

      expect(puzzleButtons[0]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED]);
      expect(puzzleButtons[1]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED]);
      expect(puzzleButtons[2]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK]);
      expect(puzzleButtons[3]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED]);

      // press and hold MouseRight on CROSSED cell, assert it is BLANK 
      await user.pointer({keys: '[MouseRight>]', target: puzzleButtons[0]});
      expect(puzzleButtons[0]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK]);

      // drag to CROSSED cell, and assert it is BLANK
      await user.pointer({target: puzzleButtons[1]});
      expect(puzzleButtons[1]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK]);

      // drag to BLANK cell, and assert it is BLANK
      await user.pointer({target: puzzleButtons[2]});
      expect(puzzleButtons[2]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK]);

      // drag to FILLED cell then raise mouse, and assert it is BLANK
      await user.pointer({target: puzzleButtons[3]});
      await user.pointer({keys: '[/MouseRight]', target: puzzleButtons[3]});
      expect(puzzleButtons[3]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK]);
    })   
  })



  describe("Simultaneous click tests", () => {
    // test suite mocks
    const size = "5";
    const seed = "0"
    const solution = create2DArray(size, CELL_STATE.BLANK);

    beforeEach(() => {
      // Note: seed isn't used to generate the puzzle since generatePuzzle is mocked
      useParams.mockReturnValue({size: size, seed: seed});
      spy_generatePuzzle.mockReturnValue(solution);
    })




    test("Right click while left click down", async () => {
      const init_cells = create2DArray(size, CELL_STATE.BLANK);
      init_cells[0] = [b, b, f, c, b],
      spy_generateDefaultCells.mockReturnValue(init_cells);

      const user = userEvent.setup();
      const { container } = render(<PuzzlePage />);
  
      const puzzleButtons = container.querySelectorAll('.cell');

      expect(puzzleButtons[0]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK]);
      expect(puzzleButtons[1]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK]);
      expect(puzzleButtons[2]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED]);
      expect(puzzleButtons[3]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED]);

      // press and hold MouseLeft on BLANK CELL, assert FILLED
      await user.pointer({keys: '[MouseLeft>]', target: puzzleButtons[0]});
      expect(puzzleButtons[0]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED]);

      // press and hold MouseRight on now FILLED cell, assert it is CROSSED
      await user.pointer({keys: '[MouseRight>]', target: puzzleButtons[0]});
      expect(puzzleButtons[0]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED]);

      // drag to BLANK cell, and assert it is CROSSED
      await user.pointer({target: puzzleButtons[1]});
      expect(puzzleButtons[1]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED]);

      // drag to FILLED cell, and assert it is CROSSED
      await user.pointer({target: puzzleButtons[2]});
      expect(puzzleButtons[2]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED]);

      // drag to CROSSED cell, raise MouseRight then MouseLeft, and assert it is CROSSED
      await user.pointer({target: puzzleButtons[3]});
      await user.pointer({keys: '[/MouseRight]', target: puzzleButtons[3]});
      await user.pointer({keys: '[/MouseLeft]', target: puzzleButtons[3]});
      expect(puzzleButtons[3]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED]);
    })



    test("Left click while right click down", async () => {
      const init_cells = create2DArray(size, CELL_STATE.BLANK);
      init_cells[0] = [b, b, f, c, b],
      spy_generateDefaultCells.mockReturnValue(init_cells);

      const user = userEvent.setup();
      const { container } = render(<PuzzlePage />);
  
      const puzzleButtons = container.querySelectorAll('.cell');

      expect(puzzleButtons[0]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK]);
      expect(puzzleButtons[1]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK]);
      expect(puzzleButtons[2]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED]);
      expect(puzzleButtons[3]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED]);

      // press and hold MouseRight on BLANK CELL, assert CROSSED
      await user.pointer({keys: '[MouseRight>]', target: puzzleButtons[0]});
      expect(puzzleButtons[0]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED]);

      // press and hold MouseLeft on now CROSSED cell, assert it is FILLED
      await user.pointer({keys: '[MouseLeft>]', target: puzzleButtons[0]});
      expect(puzzleButtons[0]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED]);

      // drag to BLANK cell, and assert it is FILLED
      await user.pointer({target: puzzleButtons[1]});
      expect(puzzleButtons[1]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED]);

      // drag to FILLED cell, and assert it is FILLED
      await user.pointer({target: puzzleButtons[2]});
      expect(puzzleButtons[2]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED]);

      // drag to CROSSED cell, raise MouseLeft then MouseRight, and assert it is FILLED
      await user.pointer({target: puzzleButtons[3]});
      await user.pointer({keys: '[/MouseLeft]', target: puzzleButtons[3]});
      await user.pointer({keys: '[/MouseRight]', target: puzzleButtons[3]});
      expect(puzzleButtons[3]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED]);
    })



    test("Cell state unchanged when hovering after pressing both and raising just left", async () => {
      const init_cells = create2DArray(size, CELL_STATE.BLANK);
      init_cells[0] = [b, b, f, c, b],
      spy_generateDefaultCells.mockReturnValue(init_cells);
  
      const user = userEvent.setup();
      const { container } = render(<PuzzlePage />);
  
      const puzzleButtons = container.querySelectorAll('.cell');
  
      expect(puzzleButtons[0]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK]);
      expect(puzzleButtons[1]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK]);
      expect(puzzleButtons[2]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED]);
      expect(puzzleButtons[3]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED]);
  
      // press and hold MouseLeft on BLANK CELL, assert FILLED
      await user.pointer({keys: '[MouseLeft>]', target: puzzleButtons[0]});
      expect(puzzleButtons[0]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED]);
  
      // press and hold MouseRight on now FILLED cell, assert it is CROSSED
      await user.pointer({keys: '[MouseRight>]', target: puzzleButtons[0]});
      expect(puzzleButtons[0]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED]);
  
      // raise MouseLeft
      await user.pointer({keys: '[/MouseLeft]', target: puzzleButtons[0]});
  
      // drag to BLANK cell, and assert it is BLANK
      await user.pointer({target: puzzleButtons[1]});
      expect(puzzleButtons[1]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK]);
  
      // drag to FILLED cell, and assert it is FILLED
      await user.pointer({target: puzzleButtons[2]});
      expect(puzzleButtons[2]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED]);
  
      // drag to CROSSED cell, and assert it is CROSSED
      await user.pointer({target: puzzleButtons[3]});
      expect(puzzleButtons[3]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED]);
    })



    test("Cell state unchanged when hovering after pressing both and raising just right", async () => {
      const init_cells = create2DArray(size, CELL_STATE.BLANK);
      init_cells[0] = [b, b, f, c, b],
      spy_generateDefaultCells.mockReturnValue(init_cells);
  
      const user = userEvent.setup();
      const { container } = render(<PuzzlePage />);
  
      const puzzleButtons = container.querySelectorAll('.cell');
  
      expect(puzzleButtons[0]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK]);
      expect(puzzleButtons[1]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK]);
      expect(puzzleButtons[2]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED]);
      expect(puzzleButtons[3]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED]);
  
      // press and hold MouseLeft on BLANK CELL, assert FILLED
      await user.pointer({keys: '[MouseLeft>]', target: puzzleButtons[0]});
      expect(puzzleButtons[0]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED]);
  
      // press and hold MouseRight on now FILLED cell, assert it is CROSSED
      await user.pointer({keys: '[MouseRight>]', target: puzzleButtons[0]});
      expect(puzzleButtons[0]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED]);
  
      // raise MouseRight
      await user.pointer({keys: '[/MouseRight]', target: puzzleButtons[0]});
  
      // drag to BLANK cell, and assert it is BLANK
      await user.pointer({target: puzzleButtons[1]});
      expect(puzzleButtons[1]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK]);
  
      // drag to FILLED cell, and assert it is FILLED
      await user.pointer({target: puzzleButtons[2]});
      expect(puzzleButtons[2]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED]);
  
      // drag to CROSSED cell, and assert it is CROSSED
      await user.pointer({target: puzzleButtons[3]});
      expect(puzzleButtons[3]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED]);
    })
  })



  describe("Click behaviour after checkButton clicked", () => {
    const size = "5";
    const seed= "0"
    const solution = [
      [b, f, f, b, f],
      [f, b, b, b, f],
      [b, b, f, f, f],
      [b, f, f, b, b],
      [b, b, b, b, f]
    ];

    beforeEach(() => {
      useParams.mockReturnValue({size: size, seed: seed});
      spy_generatePuzzle.mockReturnValue(solution);
    });



    test("Cells freeze after checkButton clicked with correct puzzle", async () => {
      const init_cells = structuredClone(solution);
      spy_generateDefaultCells.mockReturnValue(init_cells);

      const user = userEvent.setup();
      const { container } = render(<PuzzlePage />);

      const checkButton = screen.getByRole("button", {name: CHECK_BUTTON_TEXT});
      const cellButtons = container.querySelectorAll('.cell');


      // click check button
      await user.click(checkButton);
      expect(screen.getByText(PUZZLE_COMPLETE_TEXT)).toBeInTheDocument();


      for (const cellButton of cellButtons) {
        const cellClass = cellButton.className;

        // left click cell and assert class is unchanged
        await user.pointer({keys: '[MouseLeft]', target: cellButton});
        expect(cellButton.className).toStrictEqual(cellClass);

        // right click cell and assert class is unchanged
        await user.pointer({keys: '[MouseRight]', target: cellButton});
        expect(cellButton.className).toStrictEqual(cellClass);
      };
    })


    
    test("Cells can change state when clicked after checkButton clicked for an incomplete puzzle", async () => {
      const init_cells = create2DArray(size, CELL_STATE.BLANK);
      spy_generateDefaultCells.mockReturnValue(init_cells);

      const user = userEvent.setup();
      const { container } = render(<PuzzlePage />);

      const checkButton = screen.getByRole("button", {name: CHECK_BUTTON_TEXT})
      const cellButtons = container.querySelectorAll('.cell');

      // click check button and assert incomplete message appears
      await user.click(checkButton);
      expect(screen.getByText(PUZZLE_INCOMPLETE_TEXT)).toBeInTheDocument();

      for (const cellButton of cellButtons) {
        const cellClass = cellButton.className;

        // left click cell and assert class is unchanged
        await user.pointer({keys: '[MouseLeft]', target: cellButton});
        expect(cellButton.className).not.toStrictEqual(cellClass);
      };
    })
  })



  describe("Restart button tests", () => {
    const size = "5";
    const seed = "0"

    beforeEach(() => {
      useParams.mockReturnValue({size: size, seed: "0"});
    })
    


    test("Cells are all BLANK after clicking restart button and confirming", async () => {
      const solution = [
        [b, f, f, b, f],
        [f, b, b, b, f],
        [b, b, f, f, f],
        [b, f, f, b, b],
        [b, b, b, b, f]
      ];
      spy_generatePuzzle.mockReturnValue(solution);
      spy_generateDefaultCells.mockRestore();
      jest.spyOn(global, 'confirm').mockReturnValueOnce(true);

      const user = userEvent.setup();
      const { container } = render(<PuzzlePage />);

      const restartButton = screen.getByRole("button", {name: RESTART_BUTTON_TEXT})
      const cellButtons = container.querySelectorAll('.cell');

      // click some cells so the puzzle isn't blank
      for (let i = 0; i < cellButtons.length; i++) {
        if (i % 3 === 0) {
          await user.click(cellButtons[i]);
        }
        else if (i % 3 === 1) {
          await user.pointer({keys: '[MouseRight]', target: cellButtons[i]});
        }
      }

      // click restart button
      await user.click(restartButton);

      for (const cellButton of cellButtons) {
        expect(cellButton).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK])
      };
    })


    
    test("Cells are clickable after successful puzzle checked and then restarted", async () => {
      const solution = [
        [b, b, b, b, b],
        [b, b, b, b, b],
        [b, b, b, b, b],
        [b, b, b, b, b],
        [b, b, b, b, b]
      ];
      spy_generatePuzzle.mockReturnValue(solution);
      spy_generateDefaultCells.mockRestore();
      jest.spyOn(global, 'confirm').mockReturnValueOnce(true);

      const user = userEvent.setup();
      const { container } = render(<PuzzlePage />);

      const checkButton = screen.getByRole("button", {name: CHECK_BUTTON_TEXT});
      const restartButton = screen.getByRole("button", {name: RESTART_BUTTON_TEXT});
      const cellButtons = container.querySelectorAll('.cell');

      // click checkButton (solution set to blank so this should freeze the puzzle)
      await user.click(checkButton);
      expect(screen.getByText(PUZZLE_COMPLETE_TEXT)).toBeInTheDocument();
      

      // click restart button
      await user.click(restartButton);


      // test clicking buttons changes the class after restart
      for (let i = 0; i < cellButtons.length; i++) {
        if (i % 3 === 0) {
          await user.click(cellButtons[i]);
          expect(cellButtons[i]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED])
        }
        else if (i % 3 === 1) {
          await user.pointer({keys: '[MouseRight]', target: cellButtons[i]});
          expect(cellButtons[i]).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED])
        }
      };
    })
  })



  describe("Check Button tests", () => {
    const size = "5";
    const seed = "0"

    beforeEach(() => {
      useParams.mockReturnValue({size: size, seed: seed});
    })
  

  
    test("When correct solution, PUZZLE_COMPLETE_TEXT appears", async () => {
      const user = userEvent.setup();
  
      const solution = create2DArray(5, CELL_STATE.FILLED);
      const cells = create2DArray(5, CELL_STATE.FILLED);
  
      spy_generatePuzzle.mockReturnValue(solution);
      spy_generateDefaultCells.mockReturnValue(cells);
  
  
      const { container } = render(<PuzzlePage />);
  
      const checkButton = screen.getByRole("button", {name: CHECK_BUTTON_TEXT});
  
      await user.click(checkButton);
  
      expect(screen.getByText(PUZZLE_COMPLETE_TEXT)).toBeInTheDocument();
      expect(screen.queryByText(PUZZLE_INCOMPLETE_TEXT)).toBeNull();
    });
  
  
  
    test("When incorrect solution, PUZZLE_INCOMPLETE_TEXT appears", async () => {
      const user = userEvent.setup();
  
      const solution = create2DArray(5, CELL_STATE.BLANK);
      const cells = create2DArray(5, CELL_STATE.FILLED);
  
      spy_generatePuzzle.mockReturnValue(solution);
      spy_generateDefaultCells.mockReturnValue(cells);
  
      
      const { container } = render(<PuzzlePage />);
  
      const checkButton = screen.getByRole("button", {name: CHECK_BUTTON_TEXT});
  
      await user.click(checkButton);
  
      expect(screen.getByText(PUZZLE_INCOMPLETE_TEXT)).toBeInTheDocument();
      expect(screen.queryByText(PUZZLE_COMPLETE_TEXT)).toBeNull();
    })
  })
})



