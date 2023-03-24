// The following EventListener allows all my html files to be read
// before loading my javascript file
document.addEventListener("DOMContentLoaded", () => {
  const divClassGridEl = document.querySelector(".classGrid");
  const scoreDisplay = document.getElementById("score");
  const startButton = document.getElementById("startButton");
  const resetButton = document.getElementById("resetButton");
  const levelName = document.getElementById("level-name");
  const levelNum = document.getElementById("level-num");

  const width = 6;
  let score = 0;

  // here we store all divs for candies to work with
  const candyDivs = [];

  // list of random candies to be selected
  const candyImages = [
    "url(CandyImages/blue-candy.png)",
    "url(candyImages/green-candy.png)",
    "url(candyImages/orange-candy.png)",
    "url(candyImages/purple-candy.png)",
    "url(candyImages/red-candy.png",
    "url(candyImages/yellow-candy.png",
  ];
  //Display the score
  scoreDisplay.innerText = score;

  // create Board
  function creatBoard() {
    for (let i = 0; i < width * width; i++) {
      const candyDiv = document.createElement("div");

      // pick a random candy image from our candyImages array
      let randomCandy = Math.floor(Math.random() * candyImages.length);

      // here we are assiging each div/candy an id to work with
      candyDiv.setAttribute("id", i);

      // this allows each each div/candy draggable
      candyDiv.setAttribute("draggable", true);

      // assigns each div a random color/image(CandyImage)
      candyDiv.style.backgroundImage = candyImages[randomCandy];

      //append each div for candy to the board div
      divClassGridEl.appendChild(candyDiv);

      candyDivs.push(candyDiv);
    }
  }

  creatBoard();

  // variables to use to capture ids, images/colors of each div
  // being moved or replaced
  let movedCandyDiv;
  let updatedCandyDiv;
  let movedCandyDivId;
  let updatedCandyDivId;

  function dragStart() {
    // capture the background color of the div/candy being moved
    movedCandyDiv = this.style.backgroundImage;

    // capture the id of the div/candy being moved
    movedCandyDivId = parseInt(this.id);

    // display on the console the current div index
    // that are being dragged
    console.log(this.id, "dragstart");
    // display on the console the color of the current div
    // that is being dragged
    console.log(movedCandyDiv);
  }

  function dragOver(e) {
    // prevent
    e.preventDefault();
    console.log(this.id, "dragover");
  }

  function dragEnter(e) {
    // prevent the drag enterenter
    e.preventDefault();
    console.log(this.id, "dragenter");
  }

  function dragLeave() {
    console.log(this.id, "dragleave");
  }

  function dragDrop() {
    // show the id of the div/candy being dropped
    console.log(this.id, "drop");

    // capture what color/candy is the div/candy being replaced
    updatedCandyDiv = this.style.backgroundImage;

    //capture the id of the div being replaced
    updatedCandyDivId = parseInt(this.id);

    //
    this.style.backgroundImage = movedCandyDiv;

    candyDivs[movedCandyDivId].style.backgroundImage = updatedCandyDiv;

    // let movedCandyDiv; //movedCandyDiv;
    // let updatedCandyDiv; //colorBeingReplaced;

    // let movedCandyDivId; // squareIDBeingDragged
    // let updatedCandyDivId; // squareIDBeingReplaced
  }

  function dragEnd() {
    console.log(this.id, "dragend");
    // Here are we define the valid moves allowed in the game
    let validMoves = [
      movedCandyDivId - 1,
      movedCandyDivId - width,
      movedCandyDivId + 1,
      movedCandyDivId + width,
    ];

    // if the div/candy being replaced can be found in our validMoves array
    // than that is valid move and we store the boolean true in validMove
    let validMove = validMoves.includes(updatedCandyDivId);

    if (updatedCandyDivId && validMove) {
      updatedCandyDivId = null;
    } else if (updatedCandyDivId && !validMove) {
      candyDivs[updatedCandyDivId].style.backgroundImage = updatedCandyDiv;
      candyDivs[movedCandyDivId].style.backgroundImage = movedCandyDiv;
    } else {
      candyDivs[movedCandyDivId].style.backgroundImage = movedCandyDiv;
    }
  }

  function moveCandiesBelow() {
    for (i = 0; i < 29; i++) {
      if (candyDivs[i + width].style.backgroundImage === "") {
        candyDivs[i + width].style.backgroundImage =
          candyDivs[i].style.backgroundImage;
        candyDivs[i].style.backgroundImage = "";

        const firstRowCandies = [0, 1, 2, 3, 4, 5];
        if (
          firstRowCandies.includes(i) &&
          candyDivs[i].style.backgroundImage === ""
        ) {
          let randomCandy = Math.floor(Math.random() * candyImages.length);
          candyDivs[i].style.backgroundImage = candyImages[randomCandy];
        }
      }
    }
  }

  // checking for matches
  // check for row of five
  function checkRowForFive() {
    for (i = 0; i < 32; i++) {
      let rowOfFive = [i, i + 1, i + 2, , i + 3, 1 + 4];
      let decidedCandyDiv = candyDivs[i].style.backgroundImage;

      const isBlank = candyDivs[i].style.backgroundImage === "";

      // // do I need invalid moves
      let notValid = [
        2, 3, 4, 5, 8, 9, 10, 11, 14, 15, 16, 17, 20, 21, 22, 23, 26, 27, 28,
        29, 32, 33, 34, 35,
      ];

      if (notValid.includes(i)) {
        continue;
      }

      if (
        rowOfFive.every(
          (index) =>
            candyDivs[index].style.backgroundImage === decidedCandyDiv &&
            !isBlank
        )
      ) {
        score += 5 * 2;
        scoreDisplay.innerHTML = score;
        rowOfFive.forEach((index) => {
          candyDivs[index].style.backgroundImage = "";
        });
      }
    }
  }

  //checkRowForFive();

  // check for column of Five
  function checkColumnForFive() {
    for (i = 0; i < 12; i++) {
      let columnOfFive = [
        i,
        i + width,
        i + width * 2,
        i + width * 3,
        i + width * 4,
      ];
      let decidedCandyDiv = candyDivs[i].style.backgroundImage;

      const isBlank = candyDivs[i].style.backgroundImage === "";

      if (
        columnOfFive.every(
          (index) =>
            candyDivs[index].style.backgroundImage === decidedCandyDiv &&
            !isBlank
        )
      ) {
        score += 5 * 2;
        scoreDisplay.innerHTML = score;
        columnOfFive.forEach((index) => {
          candyDivs[index].style.backgroundImage = "";
        });
      }
    }
  }

  //checkColumnForFour();

  // check for row of four
  function checkRowForFour() {
    for (i = 0; i < 33; i++) {
      let rowOfFour = [i, i + 1, i + 2, , i + 3];
      let decidedCandyDiv = candyDivs[i].style.backgroundImage;

      const isBlank = candyDivs[i].style.backgroundImage === "";

      // // do I need invalid moves
      let notValid = [
        3, 4, 5, 9, 10, 11, 15, 16, 17, 21, 22, 23, 27, 28, 29, 33, 34, 35,
      ];

      if (notValid.includes(i)) {
        continue;
      }

      if (
        rowOfFour.every(
          (index) =>
            candyDivs[index].style.backgroundImage === decidedCandyDiv &&
            !isBlank
        )
      ) {
        score += 4 * 2;
        scoreDisplay.innerHTML = score;
        rowOfFour.forEach((index) => {
          candyDivs[index].style.backgroundImage = "";
        });
      }
    }
  }

  //checkRowForFour();

  // check for column of four
  function checkColumnForFour() {
    for (i = 0; i < 17; i++) {
      let columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      let decidedCandyDiv = candyDivs[i].style.backgroundImage;

      const isBlank = candyDivs[i].style.backgroundImage === "";

      if (
        columnOfFour.every(
          (index) =>
            candyDivs[index].style.backgroundImage === decidedCandyDiv &&
            !isBlank
        )
      ) {
        score += 4 * 2;
        scoreDisplay.innerHTML = score;
        columnOfFour.forEach((index) => {
          candyDivs[index].style.backgroundImage = "";
        });
      }
    }
  }

  //checkColumnForFour();

  // check for row of three
  function checkRowForThree() {
    for (i = 0; i < 34; i++) {
      let rowOfThree = [i, i + 1, i + 2];
      let decidedCandyDiv = candyDivs[i].style.backgroundImage;

      const isBlank = candyDivs[i].style.backgroundImage === "";

      // do I need invalid moves
      let notValid = [4, 5, 10, 11, 16, 17, 22, 23, 28, 29, 34, 35];

      if (notValid.includes(i)) {
        continue;
      }

      if (
        rowOfThree.every(
          (index) =>
            candyDivs[index].style.backgroundImage === decidedCandyDiv &&
            !isBlank
        )
      ) {
        score += 3 * 2;
        scoreDisplay.innerHTML = score;
        rowOfThree.forEach((index) => {
          candyDivs[index].style.backgroundImage = "";
        });
      }
    }
  }

  //checkRowForThree();

  // check for column of three
  function checkColumnForThree() {
    for (i = 0; i < 23; i++) {
      let columnOfThree = [i, i + width, i + width * 2];
      let decidedCandyDiv = candyDivs[i].style.backgroundImage;

      const isBlank = candyDivs[i].style.backgroundImage === "";

      if (
        columnOfThree.every(
          (index) =>
            candyDivs[index].style.backgroundImage === decidedCandyDiv &&
            !isBlank
        )
      ) {
        score += 3 * 2;
        scoreDisplay.innerHTML = score;
        columnOfThree.forEach((index) => {
          candyDivs[index].style.backgroundImage = "";
        });
      }
    }
  }

  levelNum.innerText = "LEVEL: 1";

  startButton.addEventListener("click", function () {
    setInterval(function () {
      moveCandiesBelow();
      checkRowForFive();
      checkColumnForFive();
      checkRowForFour();
      checkColumnForFour();
      checkRowForThree();
      checkColumnForThree();

      if (score >= 30) {
        levelName.innerText = "Congrats! Level 1 Won!.";
        levelNum.innerText = "LEVEL: 2";
      }

      if (score >= 45) {
        levelName.innerText = "Congrats! Level 2 Won!.";
        levelNum.innerText = "GAME WON! THE END!";
        removeEventListeners();
      }
    }, 100);

    // Each event listener will call the specific method passed on
    // they will show if you started dragging, ended dragging,
    // or dragged over another div etc.
    //if you started moving it,
    candyDivs.forEach((candy) =>
      candy.addEventListener("dragstart", dragStart)
    );
    candyDivs.forEach((candy) => candy.addEventListener("dragover", dragOver));
    candyDivs.forEach((candy) =>
      candy.addEventListener("dragenter", dragEnter)
    );
    candyDivs.forEach((candy) =>
      candy.addEventListener("dragleave", dragLeave)
    );
    candyDivs.forEach((candy) => candy.addEventListener("dragend", dragEnd));
    candyDivs.forEach((candy) => candy.addEventListener("drop", dragDrop));
  });

  function removeEventListeners() {
    // // Remove event listeners
    candyDivs.forEach((candy) =>
      candy.removeEventListener("dragstart", dragStart)
    );

    candyDivs.forEach((candy) =>
      candy.removeEventListener("dragover", dragOver)
    );
    candyDivs.forEach((candy) =>
      candy.removeEventListener("dragenter", dragEnter)
    );
    candyDivs.forEach((candy) =>
      candy.removeEventListener("dragleave", dragLeave)
    );
    candyDivs.forEach((candy) => candy.removeEventListener("dragend", dragEnd));
    candyDivs.forEach((candy) => candy.removeEventListener("drop", dragDrop));

    // document.removeEventListener("click", startButton());
  }
  // reset the score and removeEvent listners
  resetButton.addEventListener("click", () => {
    score = 0;
    scoreDisplay.innerHTML = 0;
    removeEventListeners();
  });

  // }
});
