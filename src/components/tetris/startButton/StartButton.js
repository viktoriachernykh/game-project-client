import React from "react";
import { StyledButton } from "./StyledStartButton";

export default function GameControlButton(props) {
  const { callback, text } = props;
  return <StyledButton onClick={callback}>{text}</StyledButton>;
}
