import { useState, useEffect } from "react";
import axios from "axios";

export const useBoard = (player, resetPlayer, gameData, token) => {
  const { id, boardState } = gameData;
  const [board, setBoard] = useState(boardState);
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);

    const sweepRows = board => {
      let cleared = 0;
      const newBoard = board.reduce((newBoard, row) => {
        if (row.findIndex(cell => cell[0] === "0") === -1) {
          setRowsCleared(
            previousAmountOfRowsCleared => previousAmountOfRowsCleared + 1
          );
          cleared += 1;
          newBoard.unshift(new Array(board[0].length).fill(["0", "clear"]));
          return newBoard;
        } else {
          newBoard.push(row);
          return newBoard;
        }
      }, []);
      return [cleared, newBoard];
    };

    const updateBoard = previousBoard => {
      if (player !== null) {
        const newBoard = previousBoard.map(row =>
          row.map(cell => {
            return cell[1] === "clear" ? ["0", "clear"] : cell;
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
          // resetPlayer();
          const sweepedRowsAndNewBoard = sweepRows(newBoard);

          const clearedBoard = sweepedRowsAndNewBoard[1];
          const clearedRows = sweepedRowsAndNewBoard[0];

          //SEND SWEEPEDROWNEWBOARD TO DB
          sendBoardToDB(clearedBoard, clearedRows);

          return clearedBoard;
        }
        return newBoard;
      }
    };

    const sendBoardToDB = async (board, cleared) => {
      try {
        const updatedGame = await axios.patch(
          `http://localhost:4000/games`,
          {
            boardState: board,
            clearedRows: cleared,
            id
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      } catch (error) {
        throw error;
      }
    };

    setBoard(previousBoardState => updateBoard(previousBoardState));
  }, [player, resetPlayer]);

  return [board, setBoard, rowsCleared];
};
