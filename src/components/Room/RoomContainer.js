import React from "react";
import { useRef } from "react";
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
    try {
      const roomId = this.props.match.params.id;
      await axios.get(`http://localhost:4000/room/${roomId}`);
    } catch (error) {
      throw error;
    }
  };

  onSubmit = async maxPlayers => {
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
      await axios.patch(
        `http://localhost:4000/games/${this.props.room.game.id}`,
        {
          status: "started"
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
    try {
      this.props.joinCurrentGame(
        this.props.token,
        this.props.user.gameId,
        this.props.user.id
      );
    } catch (error) {
      throw error;
    }
  };

  render() {
    const room = this.props.room;
    const game = this.props.room.game;

    const playerWithControl = room.game ? game.playerWithControl : null;
    const userId = this.props.user.id;

    const paragraphs =
      Object.keys(room).length !== 0
        ? room.messages.map(message => <p key={message.id}>{message.text}</p>)
        : null;

    return (
      <div>
        <Link to="/">Back to lobby</Link>
        {room.game && this.props.user.gameId !== game.id && (
          <GameControlButton
            text="JOIN GAME"
            callback={() => {
              this.joinGame();
              console.log("game join button pressed");
            }}
          />
        )}
        <aside className="chatWindow">
          <NewMessageForm resource="message" field="text" roomId={room.id} />
          {paragraphs}
          {!room.game && <NewGameForm onSubmit={this.onSubmit} />}
        </aside>
        <section>
          {room.game && playerWithControl === userId ? (
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
              score={game.score}
              level={game.level}
              rows={game.rows}
            />
          ) : null}
        </section>
        {room.game && playerWithControl !== userId ? (
          <WithoutControlTetris
            token={this.props.token}
            gameId={game.id}
            boardState={room.game.boardState}
            gameStarted={game.gameStarted}
            gameStatus={game.status}
            callbackGameStart={() =>
              this.props.gameStart(game.id, this.props.token)
            }
            score={game.score}
            level={game.level}
            rows={game.rows}
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
