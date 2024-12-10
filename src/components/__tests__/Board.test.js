/** @jest-environment jsdom */
import React from 'react';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import Board from "../Board";
import { create2DArray } from '../../utility/puzzleUtility';
import { CELL_STATE, CELL_STATE_CLASSES, BOARD_SIZES } from "../../utility/constants";


describe("Board Component tests", () => {
  describe("elements rendered correctly from cells prop", () => {
    test.each(BOARD_SIZES)("board renders correct number of cells (size: %i)", size => {
      const cells = create2DArray(size, CELL_STATE.BLANK);
      const setCellState = jest.fn(); // unused
      const puzzleComplete = false; // unused
    
      render(
        <Board 
          cells={cells}
          setCellState={setCellState}
          puzzleComplete={puzzleComplete}
        />
      );

      const cellElements = screen.getAllByRole("button");

      expect(cellElements).toHaveLength(size * size);
      cellElements.forEach(cell => {
        expect(cell).toHaveClass('cell');
      });
    })



    test("board renders 'BLANK' cells with correct class", () => {
      const cells = create2DArray(5, CELL_STATE.BLANK)
      const setCellState = jest.fn(); // unused
      const puzzleComplete = false; // unused
    
      render(
        <Board 
          cells={cells}
          setCellState={setCellState}
          puzzleComplete={puzzleComplete}
        />
      );

      const cellElements = screen.getAllByRole("button");
      cellElements.forEach(cell => {
        expect(cell).toHaveClass('cell');
        expect(cell).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK])
        expect(cell).not.toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED])
        expect(cell).not.toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED])
      });
    })



    test("board renders 'FILLED' cells with correct class", () => {
      const cells = create2DArray(5, CELL_STATE.FILLED);
      const setCellState = jest.fn(); // unused
      const puzzleComplete = false; // unused
    
      render(
        <Board 
          cells={cells}
          setCellState={setCellState}
          puzzleComplete={puzzleComplete}
        />
      );

      const cellElements = screen.getAllByRole("button");
      cellElements.forEach(cell => {
        expect(cell).toHaveClass('cell');
        expect(cell).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED])
        expect(cell).not.toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK])
        expect(cell).not.toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED])
      });
    })



    test("board renders 'CROSSED' cells with correct class", () => {
      const cells = create2DArray(5, CELL_STATE.CROSSED);
      const setCellState = jest.fn(); // unused
      const puzzleComplete = false; // unused
    
      render(
        <Board 
          cells={cells}
          setCellState={setCellState}
          puzzleComplete={puzzleComplete}
        />
      );

      const cellElements = screen.getAllByRole("button");
      cellElements.forEach(cell => {
        expect(cell).toHaveClass('cell');
        expect(cell).toHaveClass(CELL_STATE_CLASSES[CELL_STATE.CROSSED])
        expect(cell).not.toHaveClass(CELL_STATE_CLASSES[CELL_STATE.BLANK])
        expect(cell).not.toHaveClass(CELL_STATE_CLASSES[CELL_STATE.FILLED])
      });
    })
  })
})

