import React, { Component } from "react";
import LoginFormContainer from "../Login/LoginFormContainer";
import SignupFormContainer from "../Signin/SignupFormContainer";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { chooseRoom } from "../../store/room/actions";
import NewRoomForm from "./NewRoomForm";

class Lobby extends Component {
  pick = id => {
    const currentRoom = this.props.rooms.find(room => room.id === id);
    this.props.chooseRoom(currentRoom);
  };

  render() {
    const roomButtons = this.props.rooms.map(room => (
      <Link to={`/room/${room.id}`}>
        <button
          key={room.id}
          onClick={() => {
            return this.pick(room.id);
          }}>
          {room.name}{" "}
        </button>
      </Link>
    ));

    return (
      <div>
        <h1>Lobby </h1>

        {!this.props.token && (
          <div>
            <LoginFormContainer />
            <SignupFormContainer />
          </div>
        )}
        {this.props.token && (
          <div>
            <h1>Welcome, {this.props.user.username}!</h1>
            WATCH GAME JOIN GAME CREATE NEW GAME
            <NewRoomForm resource="room" field="name" />
            {roomButtons}
          </div>
        )}
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

export default connect(mapStateToProps, { chooseRoom })(Lobby);
