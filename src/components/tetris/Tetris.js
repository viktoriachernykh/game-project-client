import React, { useState } from "react";

import { createBoard } from "./game-helper-files/createBoard";
import { checkCollision } from "./game-helper-files/collision";

//components
import Board from "./board/Board";
import Display from "./display/Display";
import StartButton from "./startButton/StartButton";

//hooks
import { usePlayer } from "../../hooks/usePlayer";
import { useBoard } from "../../hooks/useBoard";
import { useInterval } from "../../hooks/useInterval";

//styled components
import { StyledTetrisWrapper, StyledTetris } from "./StyledTetris";

export default function Tetris() {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPosition, resetPlayer, playerRotate] = usePlayer();
  const [board, setBoard] = useBoard(player, resetPlayer);

  //useBoard needs: resetPlayer, but infinite loop ...?

  console.log("Render of Tetris function");

  function movePlayer(direction) {
    const intendedMove = { x: direction, y: 0 };
    if (!checkCollision(player, board, intendedMove)) {
      updatePlayerPosition(intendedMove);
    }
  }

  function startGame() {
    setBoard(createBoard());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
  }

  function drop() {
    if (!checkCollision(player, board, { x: 0, y: 1 })) {
      updatePlayerPosition({ x: 0, y: 1, collided: false });
    } else {
      // create something for game over
      if (player.position.y < 1) {
        console.log("Game over");
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPosition({ x: 0, y: 0, collided: true });
    }
  }

  function keyUp(event) {
    const { keyCode } = event;
    if (!gameOver) {
      if (keyCode === 40) {
        setDropTime(1000);
      }
    }
  }

  function dropPlayer() {
    setDropTime(null);
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
      } else if (keyCode === 38) {
        playerRotate(board, 1);
      }
    }
  }

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={event => move(event)}
      onKeyUp={keyUp}>
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
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
}
