import React from "react";
import Board from "./board/Board";
import Display from "./display/Display";
import StartButton from "./startButton/StartButton";
import { createBoard } from "./game-helper-files/createBoard";
import { StyledTetrisWrapper, StyledTetris } from "./StyledTetris";

export default function Tetris() {
  return (
    <StyledTetrisWrapper>
      <StyledTetris>
        <Board board={createBoard()} />
        <aside>
          <div>
            <Display text="Score" />
            <Display text="Rows" />
            <Display text="Level" />
          </div>
          <StartButton />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
}
