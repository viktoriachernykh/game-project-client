import React from "react";
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

export default function Tetris() {
  return (
    <div>
      <Stage />
      <aside>
        <div>
          <Display text="Score" />
          <Display text="Rows" />
          <Display test="Level" />
        </div>
        <StartButton />
      </aside>
    </div>
  );
}
