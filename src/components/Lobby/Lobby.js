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
      <div key={room.id}>
        <Link to={`/room/${room.id}`}>
          <button
            style={{ display: "block" }}
            onClick={() => {
              return this.pick(room.id);
            }}>
            {room.name}
          </button>
        </Link>
      </div>
    ));

    return (
      <div>
        <h1>Lobby </h1>
        {this.props.token ? (
          <div>
            <h2>Welcome, {this.props.user.username}!</h2>
            Create a new room:
            <NewRoomForm resource="room" />
            <h3>Click a room to check it out!</h3>
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
