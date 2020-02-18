import React from "react";
import { StyledDisplay } from "./StyledDisplay";

export default function Display(props) {
  const { gameOver, text } = props;
  return <StyledDisplay>{text}</StyledDisplay>;
}
