import { useState, useEffect, useCallback } from "react";

export const useGameStatus = rowsCleared => {
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);

  const linePoints = [40, 100, 300, 1200];

  const calculateScore = useCallback(() => {
    //Do we have score?
    if (rowsCleared > 0) {
      setScore(
        previousScoreState =>
          previousScoreState + linePoints[rowsCleared - 1] * (level + 1)
      );
      setRows(previousRowsState => previousRowsState + rowsCleared);
    }
  }, [level, linePoints, rowsCleared]);

  useEffect(() => {
    calculateScore();
  }, [calculateScore, rowsCleared, score]);

  return [score, setScore, rows, setRows, level, setLevel];
};
