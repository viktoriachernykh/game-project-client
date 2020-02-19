import React from "react";
import { StyledDisplay } from "./StyledDisplay";

export default function Display(props) {
  const { text } = props;
  return <StyledDisplay>{text}</StyledDisplay>;
}
