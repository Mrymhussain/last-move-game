/*-------------- Constants -------------*/

const MAX_MOVES = 10;


/*---------- Variables (state) ---------*/

let board;
let player;
let movesLeft;
let gameOver;
let message;


/*----- Cached Element References  -----*/

const gameBoardEl = document.querySelector("#game-board");
const movesEl = document.querySelector("#moves");
const messageEl = document.querySelector("#message");
const controlsEl = document.querySelector("#controls");
const restartBtnEl = document.querySelector("#restart-btn");


/*-------------- Functions -------------*/

const init = () => {
  board = BOARDS[Math.floor(Math.random() * BOARDS.length)];

  player = {
    row: 4,
    col: 0
  };

  movesLeft = MAX_MOVES;
  gameOver = false;
  message = "Reach the flag!";

  render();
};


const render = () => {
  renderBoard();
  renderMoves();
  renderMessage();
};


const renderBoard = () => {
  gameBoardEl.innerHTML = "";

  board.forEach((row, rowIndex) => {
    row.forEach((tile, colIndex) => {
      const tileEl = document.createElement("div");

      tileEl.classList.add("tile");

      if (
        player.row === rowIndex &&
        player.col === colIndex
      ) {
        tileEl.textContent = "🙂";
        tileEl.classList.add("player");

      } else if (tile === "blocked") {
        tileEl.textContent = "❌";
        tileEl.classList.add("blocked");

      } else if (tile === "goal") {
        tileEl.textContent = "🏁";
        tileEl.classList.add("goal");

      } else {
        tileEl.textContent = "🧊";
        tileEl.classList.add("ice");
      }

      gameBoardEl.appendChild(tileEl);
    });
  });
};


const renderMoves = () => {
  movesEl.textContent = `Moves Left: ${movesLeft}`;
};


const renderMessage = () => {
  messageEl.textContent = message;
};


const handleMove = (event) => {
  if (gameOver) {
    return;
  }

  const direction = event.target.dataset.direction;

  if (!direction) {
    return;
  }

  let newRow = player.row;
  let newCol = player.col;

  if (direction === "up") {
    newRow -= 1;

  } else if (direction === "down") {
    newRow += 1;

  } else if (direction === "left") {
    newCol -= 1;

  } else if (direction === "right") {
    newCol += 1;
  }

  if (
    newRow < 0 ||
    newRow >= board.length ||
    newCol < 0 ||
    newCol >= board[0].length
  ) {
    message = "You can't leave the grid!";
    render();
    return;
  }

  if (board[newRow][newCol] === "blocked") {
    movesLeft -= 1;
    message = "That path is blocked!";

    checkGame();
    render();
    return;
  }

  player.row = newRow;
  player.col = newCol;

  movesLeft -= 1;

  checkGame();
  render();
};


const checkGame = () => {
  if (board[player.row][player.col] === "goal") {
    message = "You made it! You win!";
    gameOver = true;

  } else if (movesLeft <= 0) {
    movesLeft = 0;
    message = "No moves left. You lose!";
    gameOver = true;

  } else {
    message = "Keep going!";
  }
};


/*----------- Event Listeners ----------*/

controlsEl.addEventListener("click", handleMove);

restartBtnEl.addEventListener("click", init);

init();