import React from "react";

import checkPuzzle from "../utility/checkPuzzle";
import { getRandomSeed } from "../utility/puzzleUtility";

import "./styles/PuzzleMenu.css";

class PuzzleMenu extends React.Component {
  constructor(props) {
    super(props);

    this.statusMessage = {
      null: "",
      false: "Пазл незавершений / є помилки",
      true: "Вітаємо! Ви розв'язали пазл",
    };
  }

  componentDidMount() {
    const checkButton = document.getElementById("btn-check-puzzle");
    const restartButton = document.getElementById("btn-restart-puzzle");
    const newButton = document.getElementById("btn-new-puzzle");

    checkButton.addEventListener("click", () => {
      if (this.props.puzzleComplete) {
        return;
      }
      const puzzleComplete = checkPuzzle(this.props.cells, this.props.solution);
      this.props.setPuzzleComplete(puzzleComplete);
    });

    restartButton.addEventListener("click", () => {
      if (confirm("Ви впевнені, що хочете почати пазл заново?")) {
        this.props.setCells(this.props.defaultCells);
        this.props.setPuzzleComplete(null);
      }
    });

    newButton.addEventListener("click", () => {
      if (this.props.puzzleComplete || confirm("Ви впевнені, що хочете почати новий пазл?")) {
        this.props.navigateToNewPuzzlePage(
          this.props.size,
          getRandomSeed()
        )
      }
    })
  }

  render() {
    return (
      <div id="puzzle-menu">
        <p id="puzzle-info">
          {`${this.props.size} x ${this.props.size} Пазл (насіння: ${this.props.seed})` }
        </p>

        <div 
          id="status-message"
          className={this.props.puzzleComplete? "complete": "incomplete"}
        >
          {this.statusMessage[this.props.puzzleComplete]}
        </div>

        <div id="puzzle-buttons">
          <input
            type="button"
            id="btn-check-puzzle"
            value="Перевірити пазл"
          />
          <input
            type="button"
            id="btn-restart-puzzle"
            value="Перезапустити пазл"
          />
          <input 
            type="button"
            id="btn-new-puzzle"
            value={`Новий пазл (${this.props.size} x ${this.props.size})`}
          />
        </div>

      </div>   
    )
  }
}

export default PuzzleMenu;
