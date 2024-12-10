import { useState } from "react";
import { useParams } from "react-router-dom";

import Puzzle from "../components/Puzzle";
import PuzzleMenu from "../components/PuzzleMenu";
import Sidebar from "../components/Sidebar";
import WithNavigateHook from "../components/WithNavigateHook";
import InvalidSizeSeedMessage from "../components/InvalidSizeSeedMessage";
import Rules from "../components/Rules";

import { BOARD_SIZES, MIN_SEED, MAX_SEED } from "../utility/constants";
import generatePuzzle from "../utility/generatePuzzle";
import generateDefaultCells from "../utility/generateDefaultCells";

import "./styles/PuzzlePage.css";







function PuzzlePage(props) {
  const {size, seed} = useParams();

  const isValidSize = Number(size).toString() === size && BOARD_SIZES.includes(Number(size));
  const isValidSeed = (
    Number(seed).toString() === seed && 
    Number.isInteger(Number(seed)) && 
    Number(seed) >= MIN_SEED 
    && Number(seed) <= MAX_SEED
  );


  let defaultCells = [];
  let solution = [];

  if (isValidSize && isValidSeed) {
    defaultCells = generateDefaultCells(size);
    solution = generatePuzzle(size, seed); 
  }

  
  // state 
  const [cells, setCells] = useState(defaultCells);
  const [puzzleComplete, setPuzzleComplete] = useState(null);


  function navigateToNewPuzzlePage(nextSize, nextSeed) {
    const newUrl = `/puzzle/${nextSize}/${nextSeed}`;
    props.navigation(newUrl);
    setCells(generateDefaultCells(nextSize));
    setPuzzleComplete(null); 
  }
    



  // Rendering
  function invalidSizeSeedRender() {
    return (
      <InvalidSizeSeedMessage 
        size={size}
        seed={seed}
        isValidSize={isValidSize}
        isValidSeed={isValidSeed}
      />
    )
  }


  function validSizeSeedRender() {
    return (
      <div id="puzzle-area">
          <Puzzle 
            size={size}
            seed={seed}
            cells={cells}
            setCells={setCells}
            puzzleComplete={puzzleComplete}
            solution={solution}
          />
          <PuzzleMenu
            size={size}
            seed={seed}
            cells={cells}
            setCells={setCells}
            puzzleComplete={puzzleComplete}
            setPuzzleComplete={setPuzzleComplete}
            defaultCells={defaultCells}
            solution={solution}
            navigateToNewPuzzlePage={navigateToNewPuzzlePage}
          />
        </div>
    )
  }


  
  return (
    <>
      <Sidebar
        size={size}
        navigateToNewPuzzlePage={navigateToNewPuzzlePage}
        puzzleComplete={puzzleComplete}
        isValidSize={isValidSize}
        isValidSeed={isValidSeed}
      />
      <main id="puzzlepage-main">
        {isValidSize && isValidSeed? validSizeSeedRender(): invalidSizeSeedRender()}
      </main>

      <Rules/>
      
    </>
  )
}

export default WithNavigateHook(PuzzlePage);