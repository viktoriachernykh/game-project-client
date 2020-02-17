import React, { useState } from "react";

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

  const [player] = usePlayer();
  const [board, setBoard] = useBoard(player);

  console.log("Render of Tetris function");
  return (
    <StyledTetrisWrapper>
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
          <StartButton />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
}
