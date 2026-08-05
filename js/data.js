const LEVELS = [
  {
    name: "Frozen Shore",
    theme: "frozen",
    moves: 10,

    board: [
      ["ice", "blocked", "ice", "ice", "goal"],
      ["ice", "blocked", "ice", "blocked", "ice"],
      ["ice", "ice", "ice", "blocked", "ice"],
      ["blocked", "ice", "ice", "ice", "ice"],
      ["start", "ice", "blocked", "ice", "ice"]
    ]
  },

  {
    name: "Christmas Village",
    theme: "christmas",
    moves: 10,

    board: [
      ["ice", "ice", "ice", "ice", "goal"],
      ["ice", "blocked", "ice", "ice", "blocked"],
      ["ice", "ice", "ice", "ice", "ice"],
      ["ice", "blocked", "ice", "ice", "ice"],
      ["start", "ice", "ice", "blocked", "ice"]
    ]
  },

  {
    name: "Midnight Cabins",
    theme: "midnight",
    moves: 10,

    board: [
      ["ice", "blocked", "fakeGoal", "ice", "goal"],
      ["ice", "blocked", "ice", "ice", "ice"],
      ["ice", "ice", "ice", "blocked", "fakeGoal"],
      ["blocked", "ice", "fakeGoal", "ice", "ice"],
      ["start", "ice", "blocked", "ice", "ice"]
    ]
  }
];