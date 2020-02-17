import React, { useState } from "react";

import { createBoard } from "./game-helper-files/createBoard";

//components
import Board from "./board/Board";
import Display from "./display/Display";
import StartButton from "./startButton/StartButton";

//hooks
import { usePlayer } from "../../hooks/usePlayer";
import { useBoard } from "../../hooks/useBoard";

//styled components
import { StyledTetrisWrapper, StyledTetris } from "./StyledTetris";

export default function Tetris() {
  const [dropTime, setDroptime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPosition, resetPlayer] = usePlayer();
  const [board, setBoard] = useBoard(player);

  console.log("Render of Tetris function");

  function movePlayer(direction) {
    updatePlayerPosition({ x: direction, y: 0 });
  }

  function startGame() {
    // reset everything
    setBoard(createBoard());
    resetPlayer();
  }

  function drop() {
    updatePlayerPosition({ x: 0, y: 1, collided: false });
  }

  function dropPlayer() {
    drop();
  }

  function move(event) {
    const { keyCode } = event;
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      }
    }
  }

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={event => move(event)}>
      <StyledTetris>
        <Board board={board} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text="Score" />
              <Display text="Rows" />
              <Display text="Level" />
            </div>
          )}
          <StartButton onClick={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
}
