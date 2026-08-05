/*-------------- Constants -------------*/

const TOTAL_LEVELS = LEVELS.length;

const NUMBER_OF_TRAPS = 4;
const NUMBER_OF_HOLES = 4;


/*---------- Variables (state) ---------*/

let level;
let currentLevel;
let board;
let player;
let movesLeft;
let gameOver;
let gameStarted;
let levelComplete;
let message;


/*----- Cached Element References  -----*/

const gameBoardEl =
  document.querySelector("#game-board");

const movesEl =
  document.querySelector("#moves");

const messageEl =
  document.querySelector("#message");

const controlsEl =
  document.querySelector("#controls");

const startBtnEl =
  document.querySelector("#start-btn");

const restartBtnEl =
  document.querySelector("#restart-btn");

const levelLabelEl =
  document.querySelector(".level-label");

const levelNameEl =
  document.querySelector(".game-header h2");


/*-------------- Functions -------------*/

const init = () => {
  level = 0;

  loadLevel();
};


const loadLevel = () => {
  currentLevel = LEVELS[level];

  board = currentLevel.board.map((row) => {
    return row.slice();
  });


  if (level === 1) {
    addRandomTraps();
  }


  if (level === 2) {
    addRandomHoles();
  }


  player = {
    row: 4,
    col: 0
  };


  movesLeft = currentLevel.moves;

  gameOver = false;
  gameStarted = false;
  levelComplete = false;

  message = "Press Start Game to begin!";

  document.body.className =
    currentLevel.theme;

  restartBtnEl.textContent =
    "Restart Level";

  render();
};


const addRandomTraps = () => {
  const trapSpaces = [
    [4, 4],
    [3, 4],
    [3, 3],
    [2, 4],
    [1, 3],
    [1, 2],
    [0, 2],
    [0, 1]
  ];

  let trapsAdded = 0;


  while (trapsAdded < NUMBER_OF_TRAPS) {
    const randomIndex =
      Math.floor(
        Math.random() * trapSpaces.length
      );

    const randomSpace =
      trapSpaces[randomIndex];

    const row = randomSpace[0];
    const col = randomSpace[1];


    if (board[row][col] === "ice") {
      board[row][col] = "trap";

      trapsAdded += 1;
    }
  }
};


const addRandomHoles = () => {
  const holeSpaces = [
    [4, 1],
    [4, 4],
    [3, 3],
    [3, 4],
    [2, 4],
    [1, 0],
    [1, 4],
    [0, 0]
  ];

  let holesAdded = 0;


  while (holesAdded < NUMBER_OF_HOLES) {
    const randomIndex =
      Math.floor(
        Math.random() * holeSpaces.length
      );

    const randomSpace =
      holeSpaces[randomIndex];

    const row = randomSpace[0];
    const col = randomSpace[1];


    if (
      !board[row][col].startsWith("hole-")
    ) {
      board[row][col] =
        `hole-${board[row][col]}`;

      holesAdded += 1;
    }
  }
};


const render = () => {
  renderBoard();
  renderMoves();
  renderMessage();
  renderLevel();

  startBtnEl.disabled = gameStarted;
};


const renderBoard = () => {
  gameBoardEl.innerHTML = "";


  board.forEach((row, rowIndex) => {

    row.forEach((space, colIndex) => {

      const spaceEl =
        document.createElement("div");

      spaceEl.classList.add("tile");


      if (level === 2) {
        renderWordSpace(
          spaceEl,
          space,
          rowIndex,
          colIndex
        );

      } else {
        renderNormalSpace(
          spaceEl,
          space,
          rowIndex,
          colIndex
        );
      }


      gameBoardEl.appendChild(spaceEl);
    });
  });
};


const renderNormalSpace = (
  spaceEl,
  space,
  rowIndex,
  colIndex
) => {

  if (
    player.row === rowIndex &&
    player.col === colIndex &&
    space === "broken"
  ) {

    const grinchImg =
      document.createElement("img");

    grinchImg.src = "./grinch.gif";
    grinchImg.alt = "Grinch";

    grinchImg.classList.add(
      "grinch-img"
    );

    spaceEl.appendChild(grinchImg);

    spaceEl.classList.add("broken");


  } else if (
    player.row === rowIndex &&
    player.col === colIndex
  ) {

    if (level === 1) {
      spaceEl.textContent = "🎅";

    } else {
      spaceEl.textContent = "🐧";
    }

    spaceEl.classList.add("player");


  } else if (space === "blocked") {

    if (level === 1) {
      spaceEl.textContent = "🎄";

    } else {
      spaceEl.textContent = "❌";
    }

    spaceEl.classList.add("blocked");


  } else if (space === "goal") {

    if (level === 1) {
      spaceEl.textContent = "🎁";

    } else {
      spaceEl.textContent = "🏠";
    }

    spaceEl.classList.add("goal");


  } else {

    if (level === 1) {
      spaceEl.textContent = "❄️";

    } else {
      spaceEl.textContent = "🧊";
    }

    spaceEl.classList.add("ice");
  }
};


const renderWordSpace = (
  spaceEl,
  space,
  rowIndex,
  colIndex
) => {

  if (
    player.row === rowIndex &&
    player.col === colIndex &&
    space === "fallen"
  ) {

    spaceEl.textContent = "🕳️";

    spaceEl.classList.add(
      "hole-hit"
    );


  } else if (
    player.row === rowIndex &&
    player.col === colIndex &&
    space === "poisoned"
  ) {

    spaceEl.textContent = "☠️";

    spaceEl.classList.add(
      "poison-hit"
    );


  } else if (
    player.row === rowIndex &&
    player.col === colIndex
  ) {

    spaceEl.textContent = "🦊";

    spaceEl.classList.add(
      "word-player"
    );


  } else {

    let displayedWord = space;


    if (space.startsWith("hole-")) {
      displayedWord =
        space.replace("hole-", "");
    }


    spaceEl.textContent = displayedWord;


    if (
      displayedWord === "POISON" ||
      displayedWord === "VENOM" ||
      displayedWord === "TOXIC" ||
      displayedWord === "EMBER"
    ) {

      spaceEl.classList.add(
        "poison-word"
      );


    } else if (
      displayedWord === "WALL"
    ) {

      spaceEl.classList.add(
        "word-wall"
      );


    } else if (
      displayedWord === "ESCAPE"
    ) {

      spaceEl.classList.add(
        "word-goal"
      );


    } else {

      spaceEl.classList.add(
        "safe-word"
      );
    }
  }
};


const renderMoves = () => {
  movesEl.textContent =
    `Moves Left: ${movesLeft}`;
};


const renderMessage = () => {
  messageEl.textContent = message;
};


const renderLevel = () => {
  levelLabelEl.textContent =
    `LEVEL ${level + 1}`;

  levelNameEl.textContent =
    currentLevel.name;
};


const startGame = () => {
  if (gameStarted) {
    return;
  }


  gameStarted = true;


  if (level === 1) {
    message =
      "Choose carefully. Not every path is safe.";

  } else if (level === 2) {
    message =
      "Avoid poison words and hidden holes.";

  } else {
    message =
      "Choose your path carefully.";
  }


  render();
};


const handleMove = (event) => {
  const direction =
    event.target.dataset.direction;


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

    message =
      "You can't leave the board.";

    render();

    return;
  }


  if (level === 2) {
    moveThroughWords(
      newRow,
      newCol
    );

    return;
  }


  if (
    board[newRow][newCol] === "blocked"
  ) {

    movesLeft -= 1;

    message =
      "That path is blocked.";

    checkGame();

    render();

    return;
  }


  if (
    board[newRow][newCol] === "trap"
  ) {

    player.row = newRow;
    player.col = newCol;

    board[newRow][newCol] =
      "broken";

    movesLeft -= 1;

    message =
      "The Grinch got you! Go back to Level 1.";

    gameOver = true;

    restartBtnEl.textContent =
      "Back to Level 1";

    render();

    return;
  }


  player.row = newRow;
  player.col = newCol;

  movesLeft -= 1;

  message = "Keep going.";

  checkGame();

  render();
};


const moveThroughWords = (
  newRow,
  newCol
) => {

  const selectedSpace =
    board[newRow][newCol];


  if (selectedSpace === "WALL") {

    movesLeft -= 1;

    message =
      "That path is blocked by a wall.";

    checkGame();

    render();

    return;
  }


  player.row = newRow;
  player.col = newCol;

  movesLeft -= 1;


  if (
    selectedSpace.startsWith("hole-")
  ) {

    board[newRow][newCol] =
      "fallen";

    message =
      "The ground disappeared! You fell into a hidden hole.";

    gameOver = true;

    restartBtnEl.textContent =
      "Back to Level 1";

    render();

    return;
  }


  if (
    selectedSpace === "POISON" ||
    selectedSpace === "VENOM" ||
    selectedSpace === "TOXIC" ||
    selectedSpace === "EMBER"
  ) {

    board[newRow][newCol] =
      "poisoned";

    message =
      "You selected a poison word!";

    gameOver = true;

    restartBtnEl.textContent =
      "Back to Level 1";

    render();

    return;
  }


  message =
    "Safe word. Keep going.";

  checkGame();

  render();
};


const handleKeydown = (event) => {
  let direction;


  if (event.key === "ArrowUp") {
    direction = "up";

  } else if (
    event.key === "ArrowDown"
  ) {
    direction = "down";

  } else if (
    event.key === "ArrowLeft"
  ) {
    direction = "left";

  } else if (
    event.key === "ArrowRight"
  ) {
    direction = "right";
  }


  if (!direction) {
    return;
  }


  event.preventDefault();

  movePlayer(direction);
};


const checkGame = () => {
  const currentSpace =
    board[player.row][player.col];


  const reachedGoal =
    currentSpace === "goal" ||
    currentSpace === "ESCAPE";


  if (reachedGoal) {

    gameOver = true;
    levelComplete = true;


    if (
      level === TOTAL_LEVELS - 1
    ) {

      message =
        "You completed Last Move!";

      restartBtnEl.textContent =
        "Play Again";

    } else {

      message =
        `Level ${level + 1} complete!`;

      restartBtnEl.textContent =
        "Next Level";
    }


  } else if (movesLeft <= 0) {

    movesLeft = 0;

    gameOver = true;

    message =
      "No moves left. Go back to Level 1.";

    restartBtnEl.textContent =
      "Back to Level 1";
  }
};


const handleRestart = () => {
  if (
    levelComplete &&
    level < TOTAL_LEVELS - 1
  ) {

    level += 1;

    loadLevel();

    return;
  }


  if (
    levelComplete &&
    level === TOTAL_LEVELS - 1
  ) {

    init();

    return;
  }


  if (
    gameOver &&
    !levelComplete
  ) {

    init();

    return;
  }


  loadLevel();
};


/*----------- Event Listeners ----------*/

controlsEl.addEventListener(
  "click",
  handleMove
);

startBtnEl.addEventListener(
  "click",
  startGame
);

restartBtnEl.addEventListener(
  "click",
  handleRestart
);

document.addEventListener(
  "keydown",
  handleKeydown
);

init();