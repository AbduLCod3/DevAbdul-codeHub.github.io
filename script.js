document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".classGrid");
  const width = 4;

  const candyColors = ["red", "yellow", "orange", "purple"]; //"green", "blue"];

  // create Board
  function creatBoard() {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      let randomColor = Math.floor(Math.random() * candyColors.length);

      square.style.backgroundColor = candyColors[randomColor];

      grid.appendChild(square);
      //squares.push(square);
    }
  }

  creatBoard();
});
