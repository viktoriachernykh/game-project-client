import React from "react";
import { StyledCell } from "./StyledCell";
import { TetrominosTemplate } from "../game-helper-files/tetrominos";

export default function Cell(props) {
  const { type } = props;
  return <StyledCell type={type} color={TetrominosTemplate[type].color} />;
}
