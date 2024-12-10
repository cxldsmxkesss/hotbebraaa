import React from "react";
import { BOARD_SIZES } from "../utility/constants";

import "./styles/InvalidSizeSeedMessage.css";



function InvalidSizeSeedMessage({size, seed, isValidSize, isValidSeed}) {
  let sizeMarkup = null;
  let seedMarkup = null;
  let leadingZerosMarkup = null;

  function clean(str) {
    const MAX_STR_LENGTH = 15;

    if (str.length > MAX_STR_LENGTH) {
      return str.slice(0, MAX_STR_LENGTH) + '...';
    }
    
    return str;
  }
  


  if (isValidSize === false) {
    sizeMarkup = (
      <>
        <h3>{"Invalid Size: "}<span>{clean(size)}</span></h3>
        <p>{`Choose a size from: ${BOARD_SIZES.join(", ")}`}</p>
      </>
    );
  }


  if (isValidSeed === false) {
    seedMarkup = (
      <>
        <h3>{"Invalid Seed: "}<span>{clean(seed)}</span></h3>
        <p>{"The seed must be a non-negative integer (max 9 digits)"}</p>
      </>
    );
  }


  if (
    (isNaN(Number(size)) === false && Number(size).toString() !== size) || 
    (isNaN(Number(seed)) === false && Number(seed).toString() !== seed)
  ) {
    leadingZerosMarkup = (
      <b>
        {"Please remove leading zeros"}
      </b>    
    )
  }




  return (
    <div id="invalid-size-seed-message">
      <h1>ERROR</h1>
      {leadingZerosMarkup}
      {sizeMarkup}
      {seedMarkup}
      
    </div>
  )
}


export default InvalidSizeSeedMessage;