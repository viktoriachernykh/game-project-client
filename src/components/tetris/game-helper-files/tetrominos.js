export const TetrominosTemplate = {
  0: { shape: [[0]], color: "0, 0, 0" },
  I: {
    shape: [
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0]
    ],
    color: "80, 227, 230"
  },
  J: {
    shape: [
      [0, "J", 0],
      [0, "J", 0],
      ["J", "J", 0]
    ],
    color: "80, 227, 230"
  },
  L: {
    shape: [
      [0, "L", 0],
      [0, "L", 0],
      [0, "L", "L"]
    ],
    color: "80, 227, 230"
  },
  O: {
    shape: [
      ["O", "O"],
      ["O", "O"]
    ],
    color: "80, 227, 230"
  },
  S: {
    shape: [
      [0, "S", "S"],
      ["S", "S", 0],
      [0, 0, 0]
    ],
    color: "80, 227, 230"
  },
  Z: {
    shape: [
      ["Z", "Z", 0],
      [0, "Z", "Z"],
      [0, 0, 0]
    ],
    color: "80, 227, 230"
  },
  T: {
    shape: [
      [0, 0, 0],
      ["T", "T", "T"],
      [0, "T", 0]
    ],
    color: "80, 227, 230"
  }
};

export function randomTetromino() {
  const tetrominos = "IJLOSZT";
  const randomTetromino =
    tetrominos[Math.floor(Math.random() * tetrominos.length)];

  return TetrominosTemplate[randomTetromino];
}
