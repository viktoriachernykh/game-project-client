import { useState, useEffect } from "react";
import { createBoard } from "../components/tetris/game-helper-files/createBoard";

export const useBoard = (player, resetPlayer) => {
  const [board, setBoard] = useState(createBoard());

  useEffect(() => {
    const updateBoard = previousBoard => {
      const newBoard = previousBoard.map(row =>
        row.map(cell => {
          return cell[1] === "clear" ? [0, "clear"] : cell;
        })
      );

      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newBoard[y + player.position.y][x + player.position.x] = [
              value,
              `${player.collided ? "merged" : "clear"}`
            ];
          }
        });
      });

      //Check if collided THIS CAUSES TO PLAY WITH A NEW TETROMINO
      if (player.collided) {
        resetPlayer();
      }

      return newBoard;
    };

    setBoard(previousBoardState => updateBoard(previousBoardState));
  }, [player]);
  return [board, setBoard];
};
