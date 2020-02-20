import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import NewGameForm from "./NewGameForm";
import NewMessageForm from "./NewMessageForm";
import { createBoard } from "../tetris/game-helper-files/createBoard";
import Tetris from "../tetris/Tetris";
import WithoutControlTetris from "../tetris/WithoutControlTetris";

class RoomContainer extends React.Component {
  componentDidMount = async () => {
    //get room data with room id (this.props.match.params.id)
    //so if we leave the room and come back, the latest boardState will be fetched

    try {
      const roomId = this.props.match.params.id;
      const roomData = await axios.get(`http://localhost:4000/room/${roomId}`);
      console.log("Room data test:", roomData);
    } catch (error) {
      throw error;
    }
  };

  onSubmit = async (maxPlayers, token) => {
    const url = `http://localhost:4000/games`;

    try {
      const emptyBoard = createBoard();
      const newGame = await axios.post(
        url,
        {
          maxPlayers,
          roomId: this.props.room.id,
          boardState: emptyBoard
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      // response will the game, set to room container state CHANGE THIS TO SET TO STORE (state.rooms.room.game)
      this.props.dispatch(newGame.data);
    } catch (error) {
      throw error;
    }
  };

  tellDatabaseToStartGame = async () => {
    try {
      const gameStart = await axios.patch(
        "http://localhost:4000/games",
        {
          status: "started",
          id: this.props.room.game.id
        },
        {
          headers: {
            Authorization: `Bearer ${this.props.token}`
          }
        }
      );
    } catch (error) {
      throw error;
    }
  };

  render() {
    console.log("this.props from RoomContainer render ", this.props);

    const room = this.props.room;

    const paragraphs =
      Object.keys(room).length !== 0
        ? room.messages.map(message => <p key={message.id}>{message.text}</p>)
        : null;

    return (
      <div>
        <Link to="/">Back to lobby</Link>
        <aside className="chatWindow">
          <NewMessageForm resource="message" field="text" roomId={room.id} />
          {paragraphs}
        </aside>
        <section>
          {room.game ? (
            <Tetris
              token={this.props.token}
              gameId={room.game.id}
              boardState={room.game.boardState}
              tellDBToStartGame={this.tellDatabaseToStartGame}
              gameStarted={room.game.gameStarted}
              gameStatus={room.game.status}
            />
          ) : (
            <NewGameForm onSubmit={this.onSubmit} />
          )}
        </section>
        {room.game ? (
          <WithoutControlTetris
            token={this.props.token}
            gameId={room.game.id}
            boardState={room.game.boardState}
          />
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.session.user,
    token: state.session.jwt,
    rooms: state.rooms.rooms,
    room: state.rooms.room
  };
}

export default connect(mapStateToProps)(RoomContainer);
