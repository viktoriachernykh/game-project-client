import React from "react";
import { StyledStartButton } from "./StyledStartButton";

export default function StartButton(props) {
  const { callback } = props;
  return <StyledStartButton onClick={callback}>Start game</StyledStartButton>;
}
