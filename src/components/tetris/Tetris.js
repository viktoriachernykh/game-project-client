import React, { useState } from "react";

import { createBoard } from "./game-helper-files/createBoard";
import { checkCollision } from "./game-helper-files/collision";

//components
import Board from "./board/Board";
import Display from "./display/Display";
import GameControlButton from "./startButton/StartButton";

//hooks
import { usePlayer } from "../../hooks/usePlayer";
import { useBoard } from "../../hooks/useBoard";
import { useInterval } from "../../hooks/useInterval";
import { useGameStatus } from "../../hooks/useGameStatus";

//styled components
import { StyledTetrisWrapper, StyledTetris } from "./StyledTetris";

export default function Tetris(props) {
  const { gameId, boardState, token, gameStarted, tellDBToStartGame } = props;
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const gameData = {
    id: gameId,
    boardState
  };

  const [player, updatePlayerPosition, resetPlayer, playerRotate] = usePlayer();
  const [board, setBoard, rowsCleared] = useBoard(
    player,
    resetPlayer,
    gameData,
    token
  );

  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );

  function movePlayer(direction) {
    const intendedMove = { x: direction, y: 0 };
    if (!checkCollision(player, board, intendedMove)) {
      updatePlayerPosition(intendedMove);
    }
  }

  function startGame() {
    setBoard(boardState);
    setDropTime(900 / (level + 1) + 200);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  }

  function restartGame() {
    setBoard(createBoard());
    setDropTime(900 / (level + 1) + 200);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  }

  function pauseGame() {
    setDropTime(null);
  }

  function unpauseGame() {
    setDropTime(900 / (level + 1) + 200);
  }

  function drop() {
    //Increase level when player has cleared 10 rows.
    if (rows > (level + 1) * 10) {
      setLevel(previousLevelState => previousLevelState + 1);

      //Also increase speed
      setDropTime(900 / (level + 1) + 200);
    }

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
    event.preventDefault();
    const { keyCode } = event;
    if (!gameOver) {
      if (keyCode === 40) {
        setDropTime(900 / (level + 1) + 200);
      }
    }
  }

  function dropPlayer() {
    setDropTime(null);
    drop();
  }

  function move(event) {
    if (dropTime !== null) {
      event.preventDefault();
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
  }

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={event => move(event)}
      onKeyUp={keyUp}
    >
      <StyledTetris>
        <Board board={board} />
        <aside>
          {gameOver ? (
            <div>
              <Display gameOver={gameOver} text="Game Over" />
              <GameControlButton
                text="Delete Game"
                callback={() => {
                  console.log("game delete button pressed");
                }}
              />
              <GameControlButton
                text="Restart Game"
                callback={() => {
                  restartGame();
                  console.log("game restart button pressed");
                }}
              />
            </div>
          ) : (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>
          )}
          <GameControlButton
            text="Start Game"
            callback={() => {
              startGame();
              tellDBToStartGame();
            }}
          />
          <GameControlButton
            text="Restart Game"
            callback={() => {
              restartGame();
              tellDBToStartGame();
            }}
          />
          <GameControlButton
            text="Pause Game"
            callback={() => {
              pauseGame();
              console.log("game pause button pressed");
            }}
          />
          <GameControlButton
            text="Continue Game"
            callback={() => {
              unpauseGame();
              console.log("game continue button pressed");
            }}
          />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
}
