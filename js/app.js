/*-------------- Constants -------------*/

const MAX_MOVES = 10;

/*---------- Variables (state) ---------*/

let board;
let player;
let movesLeft;
let gameOver;
let gameStarted;
let message;


/*----- Cached Element References  -----*/

const gameBoardEl = document.querySelector("#game-board");
const movesEl = document.querySelector("#moves");
const messageEl = document.querySelector("#message");
const controlsEl = document.querySelector("#controls");
const startBtnEl = document.querySelector("#start-btn");
const restartBtnEl = document.querySelector("#restart-btn");


/*-------------- Functions -------------*/

const init = () => {
  let newBoard =
    BOARDS[Math.floor(Math.random() * BOARDS.length)];

  while (newBoard === board && BOARDS.length > 1) {
    newBoard =
      BOARDS[Math.floor(Math.random() * BOARDS.length)];
  }

  board = newBoard;

  player = {
    row: 4,
    col: 0
  };

  movesLeft = MAX_MOVES;
  gameOver = false;
  gameStarted = false;

  message = "Press Start Game to begin!";

  render();
};


const render = () => {
  renderBoard();
  renderMoves();
  renderMessage();

  startBtnEl.disabled = gameStarted;
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

        tileEl.textContent = "🐧";
        tileEl.classList.add("player");


      } else if (tile === "blocked") {

        tileEl.textContent = "❌";
        tileEl.classList.add("blocked");


      } else if (tile === "goal") {

        tileEl.textContent = "🏠";
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


const startGame = () => {
  if (gameStarted) {
    return;
  }

  gameStarted = true;

  message =
    "Get home before the ice wins ! You’ve got 10 moves.";

  render();
};


const handleMove = (event) => {
  const direction = event.target.dataset.direction;

  if (!direction) {
    return;
  }

  movePlayer(direction);
};


const movePlayer = (direction) => {
  if (!gameStarted || gameOver) {
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

    message = "Blocked! You lost one move.";

    checkGame();

    render();

    return;
  }


  player.row = newRow;
  player.col = newCol;

  movesLeft -= 1;

  message = "Keep going!";

  checkGame();

  render();
};


const handleKeydown = (event) => {
  let direction;


  if (event.key === "ArrowUp") {

    direction = "up";

  } else if (event.key === "ArrowDown") {

    direction = "down";

  } else if (event.key === "ArrowLeft") {

    direction = "left";

  } else if (event.key === "ArrowRight") {

    direction = "right";
  }


  if (!direction) {
    return;
  }


  event.preventDefault();

  movePlayer(direction);
};


const checkGame = () => {

  if (board[player.row][player.col] === "goal") {

    message =
      `Home safe! You win with ${movesLeft} moves left! 🐧🏠`;

    gameOver = true;


  } else if (movesLeft <= 0) {

    movesLeft = 0;

    message =
      "No moves left! Try a different path.";

    gameOver = true;
  }
};

/*----------- Event Listeners ----------*/

controlsEl.addEventListener("click", handleMove);

startBtnEl.addEventListener("click", startGame);

restartBtnEl.addEventListener("click", init);

document.addEventListener("keydown", handleKeydown);

init();