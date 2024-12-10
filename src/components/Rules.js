import React from "react";

import "./styles/Rules.css";

class Rules extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const rulesScreen = document.getElementById("rules-screen");
    const closeRulesButton = document.getElementById("close-rules-button");

    rulesScreen.addEventListener("click", event => {
      if (event.currentTarget === event.target) {
        rulesScreen.classList.toggle("hidden");
      }
    });

    closeRulesButton.addEventListener("click", event => {
      rulesScreen.classList.toggle("hidden");
    })
  }

  render() {
    return (
      <div 
        id="rules-screen"
        className="hidden"
      >
        <div
          id="rules"
        >
          <h1>Як грати</h1>
          <p>
            Вам надається порожня сітка квадратів. Мета — заповнити або викреслити кожен квадрат на основі наданих підказок.
          </p>
          <p>
            Кожне число вказує на довжину групи заповнених квадратів, які йдуть підряд у відповідному рядку або колонці.
          </p>
          <p>
            Для рядків/колонок із кількома числами між групами повинен бути принаймні один викреслений квадрат для їх розділення.
          </p>
          <p> 
            Ви можете заповнити квадрат, натиснувши на нього лівою кнопкою миші, або викреслити його, натиснувши правою кнопкою миші.
          </p>
          <p> 
            Щоб заповнити або викреслити кілька квадратів одночасно, ви можете натиснути та перетягнути.
          </p>

          <input type="button" id="close-rules-button" value="Приховати правила" />
        </div>
      </div>
    )
  }
}

export default Rules;
