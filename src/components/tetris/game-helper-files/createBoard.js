export const BOARD_WIDTH = 12;
const BOARD_HEIGHT = 20;

export const createBoard = () => {
  return Array.from(Array(BOARD_HEIGHT), () => {
    return new Array(BOARD_WIDTH).fill([0, "clear"]);
  });
};

// const stage = createStage();

// console.log("stage test", stage);
