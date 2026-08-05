/*-------------- Constants -------------*/
const TOTAL_LEVELS = LEVELS.length;
const NUMBER_OF_TRAPS = 4;
const NUMBER_OF_FAKE_HOUSES = 3;
/*---------- Variables ---------*/

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
    addRandomFakeGoals();
  }


  player = {
    row: 4,
    col: 0
  };


  movesLeft = currentLevel.moves;

  gameOver = false;

  levelComplete = false;


  if (level === 0) {

    gameStarted = false;

    message =
      "Press Start Game to begin!";

    startBtnEl.style.display =
      "inline-block";

  } else {

    gameStarted = true;

    startBtnEl.style.display =
      "none";


    if (level === 1) {

      message =
        "Choose carefully. Not every path is safe.";

    } else {

      message =
        "Reach the cabin in the top-right. Other cabins are traps.";
    }
  }


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


  while (
    trapsAdded < NUMBER_OF_TRAPS
  ) {

    const randomIndex =
      Math.floor(
        Math.random() *
        trapSpaces.length
      );


    const randomSpace =
      trapSpaces[randomIndex];


    const row =
      randomSpace[0];

    const col =
      randomSpace[1];


    if (
      board[row][col] === "ice"
    ) {

      board[row][col] =
        "trap";

      trapsAdded += 1;
    }
  }
};

const addRandomFakeGoals = () => {
  const fakeGoalSpaces = [
    [4, 4],
    [3, 4],
    [3, 3],
    [3, 2],
    [2, 4],
    [2, 2],
    [2, 1],
    [1, 4],
    [1, 3],
    [1, 2],
    [0, 2],
    [0, 1]
  ];


  let fakeGoalsAdded = 0;


  while (
    fakeGoalsAdded <
    NUMBER_OF_FAKE_HOUSES
  ) {

    const randomIndex =
      Math.floor(
        Math.random() *
        fakeGoalSpaces.length
      );


    const randomSpace =
      fakeGoalSpaces[randomIndex];


    const row =
      randomSpace[0];

    const col =
      randomSpace[1];


    if (
      board[row][col] === "ice"
    ) {

      board[row][col] =
        "fakeGoal";

      fakeGoalsAdded += 1;
    }
  }
};

const render = () => {
  renderBoard();

  renderMoves();

  renderMessage();

  renderLevel();


  startBtnEl.disabled =
    gameStarted;
};

const renderBoard = () => {
  gameBoardEl.innerHTML = "";


  board.forEach(
    (row, rowIndex) => {

      row.forEach(
        (space, colIndex) => {

          const spaceEl =
            document.createElement(
              "div"
            );


          spaceEl.classList.add(
            "tile"
          );

          if (
            level === 1 &&
            space === "trap"
          ) {

            spaceEl.classList.add(
              "presenter-trap"
            );
          }
          if (
            level === 2 &&
            space === "fakeGoal"
          ) {

            spaceEl.classList.add(
              "presenter-fake-goal"
            );
          }


          if (
            player.row === rowIndex &&
            player.col === colIndex &&
            space === "broken"
          ) {

            const grinchImg =
              document.createElement(
                "img"
              );


            grinchImg.src =
              "./grinch.gif";


            grinchImg.alt =
              "Grinch";


            grinchImg.classList.add(
              "grinch-img"
            );


            spaceEl.appendChild(
              grinchImg
            );


            spaceEl.classList.add(
              "broken"
            );


          } else if (
            player.row === rowIndex &&
            player.col === colIndex &&
            space === "fakeBroken"
          ) {

            spaceEl.textContent =
              "🕳️";


            spaceEl.classList.add(
              "fake-broken"
            );


          } else if (
            player.row === rowIndex &&
            player.col === colIndex
          ) {

            if (level === 0) {

              spaceEl.textContent =
                "🐧";

            } else if (
              level === 1
            ) {

              spaceEl.textContent =
                "🎅";

            } else {

              spaceEl.textContent =
                "🦊";
            }


            spaceEl.classList.add(
              "player"
            );


          } else if (
            space === "blocked"
          ) {

            if (level === 0) {

              spaceEl.textContent =
                "❌";

            } else if (
              level === 1
            ) {

              spaceEl.textContent =
                "🎄";

            } else {

              spaceEl.textContent =
                "🌲";
            }


            spaceEl.classList.add(
              "blocked"
            );


          } else if (
            space === "goal"
          ) {

            if (level === 1) {

              spaceEl.textContent =
                "🎁";

            } else {

              spaceEl.textContent =
                "🏠";
            }


            spaceEl.classList.add(
              "goal"
            );


          } else if (
            space === "fakeGoal"
          ) {

            spaceEl.textContent =
              "🏠";


            spaceEl.classList.add(
              "fake-goal"
            );


          } else {

            if (level === 0) {

              spaceEl.textContent =
                "🧊";

            } else if (
              level === 1
            ) {

              spaceEl.textContent =
                "❄️";

            } else {

              spaceEl.textContent =
                "❄️";
            }


            spaceEl.classList.add(
              "ice"
            );
          }


          gameBoardEl.appendChild(
            spaceEl
          );
        }
      );
    }
  );
};

const renderMoves = () => {
  movesEl.textContent =
    `Moves Left: ${movesLeft}`;
};


const renderMessage = () => {
  messageEl.textContent =
    message;
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


  message =
    "Choose your path carefully.";


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
  if (
    !gameStarted ||
    gameOver
  ) {
    return;
  }


  let newRow =
    player.row;

  let newCol =
    player.col;


  if (
    direction === "up"
  ) {

    newRow -= 1;

  } else if (
    direction === "down"
  ) {

    newRow += 1;

  } else if (
    direction === "left"
  ) {

    newCol -= 1;

  } else if (
    direction === "right"
  ) {

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


  if (
    board[newRow][newCol] ===
    "blocked"
  ) {

    movesLeft -= 1;


    message =
      "That path is blocked.";


    checkGame();

    render();

    return;
  }


  if (
    board[newRow][newCol] ===
    "trap"
  ) {

    player.row =
      newRow;

    player.col =
      newCol;


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


  if (
    board[newRow][newCol] ===
    "fakeGoal"
  ) {

    player.row =
      newRow;

    player.col =
      newCol;


    board[newRow][newCol] =
      "fakeBroken";


    movesLeft -= 1;


    message =
      "Wrong cabin! You fell into a hidden hole.";


    gameOver = true;


    restartBtnEl.textContent =
      "Back to Level 1";


    render();

    return;
  }


  player.row =
    newRow;

  player.col =
    newCol;


  movesLeft -= 1;


  message =
    "Keep going.";


  checkGame();

  render();
};

const handleKeydown = (event) => {
  let direction;


  if (
    event.key === "ArrowUp"
  ) {

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

  if (
    board[player.row][player.col] ===
    "goal"
  ) {

    gameOver = true;

    levelComplete = true;


    if (
      level ===
      TOTAL_LEVELS - 1
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


  } else if (
    movesLeft <= 0
  ) {

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
    level ===
      TOTAL_LEVELS - 1
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