import axios from "axios";

const url = `http://localhost:4000/games`;

export function gameStart(gameId, token) {
  return async (dispatch, getState) => {
    try {
      const gameHasStarted = await axios.patch(
        url,
        {
          gameStarted: true,
          id: gameId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    } catch (error) {
      throw error;
    }
  };
}

export function createNewGame(roomId, board, maxPlayers, token) {
  return async (dispatch, getState) => {
    try {
      const newGame = await axios.post(
        url,
        {
          maxPlayers,
          roomId: roomId,
          boardState: board
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      // response will the game, set to room container state CHANGE THIS TO SET TO STORE (state.rooms.room.game)
      dispatch(newGame.data);
    } catch (error) {
      throw error;
    }
  };
}
