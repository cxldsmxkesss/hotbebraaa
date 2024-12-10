import React from "react";

import "./styles/Hints.css";




class Hints extends React.Component {
  constructor(props) {
    super(props)

    this.toggleChecked = this.toggleChecked.bind(this);
  }

  toggleChecked(event) {
    event.target.classList.toggle("checked")
  }

  render() {
    let rowOrColHints = this.props.hintsGenerator(this.props.solution);

    // front-fill hintarrays with null values so lengths match
    const maxHints = Math.max(...rowOrColHints.map(arr => arr.length));
    rowOrColHints = rowOrColHints.map(rowOrCol => (
      Array.from(Array(maxHints - rowOrCol.length).fill(null).concat(rowOrCol)
    )));

    const rowOrColHintsMarkup = rowOrColHints.map((rowOrColHint, rowOrColIndex) => (
      <div 
        key={rowOrColIndex} 
        className={`${this.props.rowOrCol}Hint`} 
        data-pos={rowOrColIndex}
      >
        {
          rowOrColHint.map((hint, hintIndex) => (
            <button 
              key={hintIndex} 
              className={`hint`}
              onClick={hint? this.toggleChecked: null}
            >
              { hint }
            </button>
          ))
        }
      </div>
    ))

    return (
      <div id={`${this.props.rowOrCol}Hints`}>
        {rowOrColHintsMarkup}
      </div>
    )
  }
}



export default Hints;