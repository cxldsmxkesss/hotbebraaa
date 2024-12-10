import React from "react";

import Board from "./Board.js";
import Hints from "./Hints.js";

import { generateRowHints, generateColHints } from "../utility/puzzleUtility.js";

import "./styles/Puzzle.css";


class Puzzle extends React.Component {
  constructor(props) {
    super(props);

    // bind methods
    this.setCellState = this.setCellState.bind(this);
  }

  setCellState(row, col, cellState) {
    this.props.setCells(oldCells => {
      const newCells = structuredClone(oldCells);
      newCells[row][col] = cellState;
      return newCells;
    })
  }

  componentDidMount() {
    const puzzleElement = document.getElementById("puzzle");
    puzzleElement.addEventListener("contextmenu", event => {
      event.preventDefault();
    });
  }


  render() {    
    return (
      <div id="puzzle">
        <div>{/*empty*/}</div>
        <Hints 
          rowOrCol="col"
          hintsGenerator={generateColHints}
          solution={this.props.solution}
        />
        <Hints 
          rowOrCol="row"
          hintsGenerator={generateRowHints}
          solution={this.props.solution}
        />
        <Board
          cells={this.props.cells}  
          setCellState={this.setCellState}
          puzzleComplete={this.props.puzzleComplete}
        />
      </div>
    )
  }
}

export default Puzzle;