// The following EventListener allows all my html files to be read
// before loading my javascript file
document.addEventListener("DOMContentLoaded", () => {
  const divClassGridEl = document.querySelector(".classGrid");
  const width = 6;

  // here we store all divs for candies to work with
  const candyDivs = [];

  // list of random candies to be selected
  const candyImages = ["blue", "green", "orange", "purple", "red", "yellow"];

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
      candyDiv.style.backgroundColor = candyImages[randomCandy];

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
    movedCandyDiv = this.style.backgroundColor;

    // capture the id of the div/candy being moves
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
    // prevent
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
    updatedCandyDiv = this.style.backgroundColor;

    //capture the id of the div being replaced
    updatedCandyDivId = parseInt(this.id);

    candyDivs[movedCandyDivId].style.backgroundColor = updatedCandyDiv;

    // let movedCandyDiv; //movedCandyDiv;
    // let updatedCandyDiv; //colorBeingReplaced;

    // let movedCandyDivId; // squareIDBeingDragged
    // let updatedCandyDivId; // squareIDBeingReplaced
  }

  function dragEnd() {
    console.log(this.id, "dragend");
    // Here we valid the moves
  }

  // Each event listener will call the specific method passed on
  // they will show if you started dragging, ended dragging,
  // or dragged over another div etc.
  //if you started moving it,
  candyDivs.forEach((candy) => candy.addEventListener("dragstart", dragStart));
  candyDivs.forEach((candy) => candy.addEventListener("dragover", dragOver));
  candyDivs.forEach((candy) => candy.addEventListener("dragenter", dragEnter));
  candyDivs.forEach((candy) => candy.addEventListener("dragleave", dragLeave));
  candyDivs.forEach((candy) => candy.addEventListener("dragend", dragEnd));
  candyDivs.forEach((candy) => candy.addEventListener("drop", dragDrop));

  //
  //
});
