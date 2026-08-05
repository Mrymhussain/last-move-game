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
    name: "Midnight Word Forest",
    theme: "words",
    moves: 10,

    board: [
      ["FROST", "POISON", "AURORA", "GLACIER", "ESCAPE"],
      ["GLACIER", "WALL", "ICICLE", "VENOM", "SNOW"],
      ["WINTER", "FROST", "BLIZZARD", "WALL", "ICE"],
      ["SNOW", "WALL", "TOXIC", "GLACIER", "COLD"],
      ["START", "ICICLE", "EMBER", "WALL", "AURORA"]
    ]
  }
];