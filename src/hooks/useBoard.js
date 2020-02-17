import { useState } from "react";

import { createBoard } from "../components/tetris/game-helper-files/createBoard";

export function useBoard() {
  const [board, setBoard] = useState(createBoard());

  return [board, setBoard];
}
