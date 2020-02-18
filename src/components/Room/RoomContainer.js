import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import NewGameForm from "./NewGameForm";
import NewMessageForm from "./NewMessageForm";
import { createBoard } from "../tetris/game-helper-files/createBoard";

class RoomContainer extends React.Component {
  onSubmit = async maxPlayers => {
    const url = `http://localhost:4000/games`;

    try {
      console.log("I was submitted");
      console.log("maxPlayers test", maxPlayers);
      console.log("Room id test", this.props.room.id);

      const emptyBoard = createBoard();

      console.log("new board for db", emptyBoard);
      const newGame = await axios.post(url, {
        maxPlayers,
        roomId: this.props.room.id,
        boardState: emptyBoard
      });

      console.log("New game test", newGame);

      //create a post request to create a game

      //include an empty board, max players and room id

      // response will the game, set to room container state
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
          <NewMessageForm
            resource="message"
            field="text"
            roomId={this.props.room.id}
          />
          {paragraphs}
        </aside>
        <section>
          <NewGameForm onSubmit={this.onSubmit} />
        </section>
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
