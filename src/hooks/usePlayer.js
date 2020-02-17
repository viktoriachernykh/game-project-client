import { useState } from "react";

import { randomTetromino } from "../components/tetris/game-helper-files/tetrominos";

export function usePlayer() {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: randomTetromino().shape,
    collided: false
  });

  return [player];
}
