/** @jest-environment jsdom */
'strict'
import React from 'react';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import Hints from "../Hints";
import { CELL_STATE } from '../../utility/constants';


const {
  FILLED: f,
  BLANK: b
 } = CELL_STATE;

const hintCheckedClass = 'checked';



describe("Hints tests", () => {
  describe("row hints tests", () => {
    // suite props and constants 
    const rowHints = [
      [3, 1],
      [1, 1, 1],
      [2],
      [1, 1],
      [4],
    ];

    const flatRowHints = rowHints.flat();

    const solution = [
      [f, f, f, b, b],
      [f, b, f, b, f],
      [f, f, b, b, b],
      [f, b, b, b, f],
      [f, f, f, f, b]
    ];

    const mockRowHintsGenerator = jest.fn()
      .mockName("mockRowHintsGenerator")
      .mockReturnValue(rowHints)
    ;

    afterEach(() => {
      jest.clearAllMocks();
    });



    test('row hint buttons appear "in order" with correct text content', () => {
      /*  this only tests the button elements are found in the correct order in the DOM
          It does not ensure they are visually correct
      */
      const {container} = render(
        <Hints
          rowOrCol="row"
          hintsGenerator={mockRowHintsGenerator}
          solution={solution}
        />
      );
  
      const hintButtons = screen.getAllByRole("button").filter(button => button.textContent !== "");

      expect(hintButtons).toHaveLength(flatRowHints.length);
  
      flatRowHints.forEach((hint, i) => {
        expect(hintButtons[i]).toHaveTextContent(hint);
      });
    })



    test('html structure of #rowHints element', () => {
      const {container} = render(
        <Hints
          rowOrCol="row"
          hintsGenerator={mockRowHintsGenerator}
          solution={solution}
        />
      );
  
      // tests the html structure to be more confident the buttons are appearing in the correct order
      const rowHintsElement = container.querySelector('#rowHints');
    
      expect(rowHintsElement).toBeInTheDocument();
      expect(container.querySelector('#colHints')).not.toBeInTheDocument();
      
      rowHints.forEach((rowHint, rowIndex) => {
        const rowHintElement = rowHintsElement.children[rowIndex];
        const hintElements = Array.from(rowHintElement.children)
          .filter(hintElement => hintElement.textContent !== "")
        ;
        rowHint.forEach((hint, hintIndex) => {
          
          expect(hintElements[hintIndex]).toHaveTextContent(hint);
        });
      });
    })



    test("hint button toggles class when clicked", async () => {
      const user = userEvent.setup();
      const {container} = render(
        <Hints
          rowOrCol="row"
          hintsGenerator={mockRowHintsGenerator}
          solution={solution}
        />
      );

      const hintButtons = screen.getAllByRole("button").filter(button => button.textContent !== "");
      
      for(const hintButton of hintButtons) {
        expect(hintButton).not.toHaveClass(hintCheckedClass);
        await user.click(hintButton);
        expect(hintButton).toHaveClass(hintCheckedClass);
        await user.click(hintButton);
        expect(hintButton).not.toHaveClass(hintCheckedClass)
      } 
    })
  })
  


  describe("column hints tests", () => {
    // suite props and constants 
    const colHints = [
      [3, 1],
      [1, 1, 1],
      [2],
      [1, 1],
      [4],
    ];

    const flatColHints = colHints.flat();

    const solution = [
      [f, f, f, f, b],
      [f, b, f, b, f],
      [f, f, b, f, f],
      [b, b, b, b, f],
      [f, f, b, b, f]
    ];

    const mockColHintsGenerator = jest.fn()
      .mockName("mockColHintGenerator")
      .mockReturnValue(colHints)
    ;

    afterEach(() => {
      jest.clearAllMocks();
    });



    test('col hint buttons appear "in order" with correct text content', () => {
      /*  this only tests the button elements are found in the correct order in the DOM
          It does not ensure they are visually correct
      */
      const {container} = render(
        <Hints
          rowOrCol="col"
          hintsGenerator={mockColHintsGenerator}
          solution={solution}
        />
      );
  
      const hintButtons = screen.getAllByRole("button").filter(button => button.textContent !== "");
      expect(hintButtons).toHaveLength(flatColHints.length);
  
      // buttons appear "in order" with correct text content (this doesn't account for styling though)
      flatColHints.forEach((hint, i) => {
        expect(hintButtons[i]).toHaveTextContent(hint);
      });
    })



    test('html structure of #colHints element', () => {
      const {container} = render(
        <Hints
          rowOrCol="col"
          hintsGenerator={mockColHintsGenerator}
          solution={solution}
        />
      );
  
      // tests the html structure to be more confident the buttons are appearing in the correct order
      const colHintsElement = container.querySelector('#colHints');
    
      expect(colHintsElement).toBeInTheDocument();
      expect(container.querySelector('#rowHints')).not.toBeInTheDocument();
      
      colHints.forEach((colHint, colIndex) => {
        const colHintElement = colHintsElement.children[colIndex];
        const hintElements = Array.from(colHintElement.children)
          .filter(hintElement => hintElement.textContent !== "")
        ;

        colHint.forEach((hint, hintIndex) => {
          expect(hintElements[hintIndex]).toHaveTextContent(hint);
        });
      });
    })



    test("hint button toggles class when clicked", async () => {
      const user = userEvent.setup();
      const {container} = render(
        <Hints
          rowOrCol="col"
          hintsGenerator={mockColHintsGenerator}
          solution={solution}
        />
      );

      const hintButtons = screen.getAllByRole("button").filter(button => button.textContent !== "");
      
      for(const hintButton of hintButtons) {
        expect(hintButton).not.toHaveClass(hintCheckedClass);
        await user.click(hintButton);
        expect(hintButton).toHaveClass(hintCheckedClass);
        await user.click(hintButton);
        expect(hintButton).not.toHaveClass(hintCheckedClass)
      } 
    })
  })
})