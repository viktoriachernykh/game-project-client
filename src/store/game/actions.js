import axios from "axios";
import { updateUserData } from "../user/actions";

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

export function joinCurrentGame(token, gameId, userId) {
  // console.log(token);
  // console.log(gameId);
  // console.log(userId);
  return async (dispatch, getState) => {
    try {
      const updatedUser = await axios.patch(
        `http://localhost:4000/users/${userId}`,
        {
          gameId: gameId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      dispatch(updateUserData(updatedUser.data));
    } catch (error) {
      throw error;
    }
  };
}

export function createNewGame(roomId, board, maxPlayers, token, userId) {
  return async (dispatch, getState) => {
    try {
      //Update player to have newGame id as game ID
      const newGame = await axios.post(
        "http://localhost:4000/games",
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
      console.log("new game data", newGame.data.game);

      const updatedUser = await axios.patch(
        `http://localhost:4000/users/${userId}`,
        {
          gameId: newGame.data.game.id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      dispatch(updateUserData(updatedUser.data));
    } catch (error) {
      throw error;
    }
  };
}
