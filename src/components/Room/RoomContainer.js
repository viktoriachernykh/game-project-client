import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import NewGameForm from "./NewGameForm";
import NewMessageForm from "./NewMessageForm";
import { createBoard } from "../tetris/game-helper-files/createBoard";
import Tetris from "../tetris/Tetris";
import WithoutControlTetris from "../tetris/WithoutControlTetris";
import {
  createNewGame,
  joinCurrentGame,
  gameStart
} from "../../store/game/actions";
import GameControlButton from "../tetris/startButton/StartButton";

class RoomContainer extends React.Component {
  componentDidMount = async () => {
    //get room data with room id (this.props.match.params.id)
    //so if we leave the room and come back, the latest boardState will be fetched

    try {
      const roomId = this.props.match.params.id;
      const roomData = await axios.get(`http://localhost:4000/room/${roomId}`);
    } catch (error) {
      throw error;
    }
  };

  onSubmit = async maxPlayers => {
    const url = `http://localhost:4000/games`;

    try {
      const emptyBoard = createBoard();
      this.props.createNewGame(
        this.props.room.id,
        emptyBoard,
        maxPlayers,
        this.props.token,
        this.props.user.id
      );
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

  joinGame = async () => {
    this.props.user.gameId = this.props.room.game.id;
    // console.log(this.props);
    try {
      // const emptyBoard = createBoard();
      this.props.joinCurrentGame(
        //   this.props.room.id,
        //   emptyBoard,
        //   maxPlayers,
        this.props.token,
        this.props.user.gameId,
        this.props.user.id
      );
      // const joinedUserId = await axios.patch(
      //   "http://localhost:4000/games",
      //   {
      //     status: "started",
      //     id: this.props.room.game.id
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${this.props.token}`
      //     }
      //   }
      // );
    } catch (error) {
      throw error;
    }
  };

  render() {
    // console.log("this.props from RoomContainer render ", this.props);

    const room = this.props.room;
    const game = this.props.room.game;
    // console.log("game", game);
    // console.log("user", this.props.user);

    const paragraphs =
      Object.keys(room).length !== 0
        ? room.messages.map(message => <p key={message.id}>{message.text}</p>)
        : null;

    return (
      <div>
        <Link to="/">Back to lobby</Link>
        {room.game && this.props.user.gameId !== game.id && (
          <GameControlButton
            text="JOIN"
            callback={() => {
              this.joinGame();
              console.log("game join button pressed");
            }}
          />
        )}
        <aside className="chatWindow">
          <NewMessageForm resource="message" field="text" roomId={room.id} />
          {paragraphs}
        </aside>
        <section>
          {room.game ? (
            <Tetris
              token={this.props.token}
              gameId={game.id}
              boardState={game.boardState}
              tellDBToStartGame={this.tellDatabaseToStartGame}
              gameStarted={game.gameStarted}
              gameStatus={game.status}
              callbackGameStart={() =>
                this.props.gameStart(game.id, this.props.token)
              }
            />
          ) : (
            <NewGameForm onSubmit={this.onSubmit} />
          )}
        </section>
        {room.game ? (
          <WithoutControlTetris
            token={this.props.token}
            gameId={game.id}
            boardState={room.game.boardState}
            gameStarted={game.gameStarted}
            gameStatus={game.status}
            callbackGameStart={() =>
              this.props.gameStart(game.id, this.props.token)
            }
          />
        ) : null}
      </div>
    );
  }
}

const mapDispatchToProps = {
  createNewGame,
  joinCurrentGame,
  gameStart
};

function mapStateToProps(state) {
  return {
    user: state.session.user,
    token: state.session.jwt,
    rooms: state.rooms.rooms,
    room: state.rooms.room
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomContainer);
