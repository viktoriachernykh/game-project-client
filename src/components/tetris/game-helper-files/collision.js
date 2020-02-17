export function checkCollision(player, board, { x: moveX, y: moveY }) {
  for (let y = 0; y < player.tetromino.length; y += 1) {
    for (let x = 0; x < player.tetromino[0].length; x += 1) {
      // check that were on a tetromino

      if (player.tetromino[y][x] !== 0) {
        if (
          //Check if the move is within game board height (y)
          //We shouldnt go out of the bottom
          !board[y + player.position.y + moveY] ||
          //check if the move is within game board width(x)
          !board[y + player.position.y + moveY][
            x + player.position.x + moveX
          ] ||
          //check if cell that we're moving to is not set to clear
          board[y + player.position.y + moveY][
            x + player.position.x + moveX
          ][1] !== "clear"
        ) {
          return true;
        }
      }
    }
  }
}
