import React from "react";
import Cell from "../cell/Cell";
import { StyledBoard } from "./StyledBoard";

export default function Board(props) {
  const { board } = props;
  return (
    <StyledBoard width={board[0].length} height={board.length}>
      {board.map(row =>
        row.map((cell, index) => <Cell key={index} type={cell[0]} />)
      )}
    </StyledBoard>
  );
}
