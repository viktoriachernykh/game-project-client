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
      <Link key={room.id} to={`/room/${room.id}`}>
        <button
          onClick={() => {
            return this.pick(room.id);
          }}>
          {room.name}
        </button>
      </Link>
    ));

    return (
      <div>
        <h1>Lobby </h1>
        {this.props.token ? (
          <div>
            <h2>Welcome, {this.props.user.username}!</h2>
            WATCH GAME JOIN GAME CREATE NEW GAME
            <NewRoomForm resource="room" />
            {roomButtons}
          </div>
        ) : (
          <div>You have to login to view the lobby.</div>
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
