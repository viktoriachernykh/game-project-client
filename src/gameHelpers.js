const STAGE_WITDH = 12;
const STAGE_HEIGHT = 20;

const createStage = () => {
  return Array.from(Array(STAGE_HEIGHT), () => {
    return new Array(STAGE_WITDH).fill([0, "clear"]);
  });
};

const stage = createStage();

console.log("stage test", stage);
