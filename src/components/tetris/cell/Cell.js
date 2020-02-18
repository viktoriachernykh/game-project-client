import React from "react";
import { StyledCell } from "./StyledCell";
import { TetrominosTemplate } from "../game-helper-files/tetrominos";

function Cell(props) {
  const { type } = props;
  return <StyledCell type={type} color={TetrominosTemplate[type].color} />;
}

export default React.memo(Cell);
