import React from "react";

export default function Display(props) {
  const { gameOver, text } = props;
  return <div>{text}</div>;
}
