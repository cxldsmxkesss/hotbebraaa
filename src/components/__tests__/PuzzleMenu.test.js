/** @jest-environment jsdom */
import React from 'react';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import PuzzleMenu from "../PuzzleMenu";
import { CELL_STATE } from '../../utility/constants';
import { create2DArray } from '../../utility/puzzleUtility';



// Page Text
const CHECK_BUTTON_TEXT = "Check Puzzle";
const RESTART_BUTTON_TEXT = "Restart Puzzle";
const PUZZLE_COMPLETE_TEXT = "Congratulations! You have solved the puzzle";
const PUZZLE_INCOMPLETE_TEXT = "The puzzle is incomplete / there are errors";



describe("Puzzle Menu Tests", () => {
  test("PuzzleMenu has correct initial render", () => {
    const cells = create2DArray(5, CELL_STATE.BLANK);

    render(
      <PuzzleMenu
        cells={cells}
        setCells={jest.fn()}
        puzzleComplete={null}
        setPuzzleComplete={jest.fn()}
        defaultCells={cells}
        solution={cells}
      />
    )

    expect(screen.getByRole("button", {name: CHECK_BUTTON_TEXT})).toBeInTheDocument();
    expect(screen.getByRole("button", {name: RESTART_BUTTON_TEXT})).toBeInTheDocument();
    expect(screen.queryByText(PUZZLE_COMPLETE_TEXT)).toBeNull();
    expect(screen.queryByText(PUZZLE_INCOMPLETE_TEXT)).toBeNull();
  })



  describe("Check Button tests", () => {
    test("When correct solution, setPuzzleComplete called with true", async () => {
      const user = userEvent.setup();
      const cells = create2DArray(5, CELL_STATE.FILLED);
      const solution = create2DArray(5, CELL_STATE.FILLED);
      const setPuzzleComplete = jest.fn().mockName("setPuzzleComplete");

      render(
        <PuzzleMenu
          cells={cells}
          setCells={jest.fn()}
          puzzleComplete={null}
          setPuzzleComplete={setPuzzleComplete}
          defaultCells={cells}
          solution={solution}
        />
      );

      const checkButton = screen.getByRole("button", {name: CHECK_BUTTON_TEXT});

      await user.click(checkButton);

      expect(setPuzzleComplete.mock.calls).toHaveLength(1);
      expect(setPuzzleComplete.mock.calls[0][0]).toStrictEqual(true);
    });



    test("When incorrect solution, setPuzzleComplete called with false", async () => {
      const user = userEvent.setup();
      const cells = create2DArray(5, CELL_STATE.FILLED);
      const solution = create2DArray(5, CELL_STATE.BLANK);
      const setPuzzleComplete = jest.fn().mockName("setPuzzleComplete");

      render(
        <PuzzleMenu
          cells={cells}
          setCells={jest.fn()}
          puzzleComplete={null}
          setPuzzleComplete={setPuzzleComplete}
          defaultCells={cells}
          solution={solution}
        />
      );

      const checkButton = screen.getByRole("button", {name: CHECK_BUTTON_TEXT});

      await user.click(checkButton);

      expect(setPuzzleComplete.mock.calls).toHaveLength(1);
      expect(setPuzzleComplete.mock.calls[0][0]).toStrictEqual(false);
    })
  })



  describe("Restart Button tests", () => {
    test("When Restart Button clicked...", async () => {
      const user = userEvent.setup();
      jest.spyOn(global, 'confirm').mockReturnValueOnce(true);

      const cells = create2DArray(5, CELL_STATE.FILLED);
      const solution = create2DArray(5, CELL_STATE.FILLED);
      const defaultCells = create2DArray(5, CELL_STATE.BLANK);
      const setCells = jest.fn().mockName('setCells');
      const setPuzzleComplete = jest.fn().mockName('setPuzzleComplete');

      render(
        <PuzzleMenu
          cells={cells}
          setCells={setCells}
          puzzleComplete={null}
          setPuzzleComplete={setPuzzleComplete}
          defaultCells={defaultCells}
          solution={solution}
        />
      );

      const restartButton = screen.getByRole("button", {name: RESTART_BUTTON_TEXT});

      await user.click(restartButton);

      expect(setCells.mock.calls).toHaveLength(1);
      expect(setCells.mock.calls[0][0]).toStrictEqual(defaultCells);
      expect(setPuzzleComplete.mock.calls).toHaveLength(1);
      expect(setPuzzleComplete.mock.calls[0][0]).toBeNull();
      expect(screen.queryByText(PUZZLE_COMPLETE_TEXT)).toBeNull();
      expect(screen.queryByText(PUZZLE_INCOMPLETE_TEXT)).toBeNull();
    });
  })
});
 