import { useState, useCallback } from "react";

import { BOARD_WIDTH } from "../components/tetris/game-helper-files/createBoard";

import { randomTetromino } from "../components/tetris/game-helper-files/tetrominos";

export function usePlayer() {
  const [player, setPlayer] = useState({
    position: { x: 0, y: 0 },
    tetromino: randomTetromino().shape,
    collided: false
  });

  function updatePlayerPosition({ x, y, collided }) {
    setPlayer(previousState => {
      return {
        ...previousState,
        position: {
          x: (previousState.position.x += x),
          y: (previousState.position.y += y)
        },
        collided
      };
    });
  }

  const resetPlayer = useCallback(() => {
    setPlayer({
      position: { x: BOARD_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false
    });
  });

  return [player, updatePlayerPosition, resetPlayer];
}
