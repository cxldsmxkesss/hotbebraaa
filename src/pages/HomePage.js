import React from "react";

import WithNavigateHook from "../components/WithNavigateHook";
import { BOARD_SIZES, MIN_SEED, MAX_SEED } from "../utility/constants";
import { getRandomSeed } from "../utility/puzzleUtility";

import title from "../assets/homepageTitle.png";
import "./styles/HomePage.css";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const generateFromSeedButton = document.getElementById("generate-from-seed-btn");
    
    generateFromSeedButton.addEventListener("click", event => {
      event.preventDefault();

      const formData = new FormData(document.getElementById("puzzle-form")); 
      const size = formData.get('puzzle-size');
      const seed = formData.get('seed') === ""? getRandomSeed(): Number(formData.get('seed'));

      if (Number.isInteger(seed) === false || seed < MIN_SEED || seed > MAX_SEED) {
        alert("Насіння повинно бути невід'ємним цілим числом (макс. 9 цифр)");
      }
      else {     
        const nextUrl = `/puzzle/${size}/${seed}`;   
        this.props.navigation(nextUrl);
      }
    })

    const generateRandomButton = document.getElementById("generate-random-btn");

    generateRandomButton.addEventListener("click", event => {
      event.preventDefault();

      const formData = new FormData(document.getElementById("puzzle-form")); 
      const size = formData.get('puzzle-size');
      const seed = getRandomSeed();

      const nextUrl = `/puzzle/${size}/${seed}`;
      
      this.props.navigation(nextUrl);
    })
  }

  render() {
    const sizeRadioButtons = BOARD_SIZES.map(boardSize => (
      <div key={boardSize} className="size-button">
        <input 
          type="radio" 
          className="btn-check" 
          id={`radio-size-${boardSize}`} 
          value={boardSize} 
          name="puzzle-size" 
          autoComplete="off" 
          defaultChecked={boardSize === 5}
        />
        <label 
          className="btn" 
          htmlFor={`radio-size-${boardSize}`} 
        >
          {`${boardSize} x ${boardSize}`} 
        </label>
      </div>
    ));

    return (
      <main id="homepage-main">
        <img src={title} id="title-img" alt="title-img" title="НОНОГРАМА" />

        <hr className="thick" />
        
        <form id="puzzle-form">
          <h2>Оберіть розмір пазлу:</h2>

          <div id="size-buttons">
            {sizeRadioButtons}
          </div>

          <hr className="thick" /> 
          <h2>{"Згенерувати пазл з випадковим числом"}</h2>

          <input type="submit" id="generate-random-btn" value="Згенерувати випадковий пазл" />

          <p className="divider">АБО</p>

          <h2>{"Згенерувати пазл з певним числом"}</h2>
          <h5>{"(Насіння може бути будь-яким невід'ємним цілим числом до 9 цифр)"}</h5>

          <div id="seed-container">
            <label htmlFor="seed">
              {"Введіть насіння: "}
            </label>
            <input type="text" id="seed" name="seed" pattern="\d*"/>
          </div>

          <input type="submit" id="generate-from-seed-btn" value="Згенерувати пазл з числами" />
          
        </form>
      </main>
    )
  }
}

export default WithNavigateHook(HomePage);
