import { useState, useCallback } from "react";

import { BOARD_WIDTH } from "../components/tetris/game-helper-files/createBoard";
import { checkCollision } from "../components/tetris/game-helper-files/collision";

import {
  randomTetromino,
  TetrominosTemplate
} from "../components/tetris/game-helper-files/tetrominos";

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    position: { x: 0, y: 0 },
    tetromino: TetrominosTemplate[0].shape,
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
      position: { x: BOARD_WIDTH / 2 - 1, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false
    });
  });

  return [player, updatePlayerPosition, resetPlayer];
};
