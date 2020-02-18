import React, { Component } from "react";
import LoginFormContainer from "../Login/LoginFormContainer";
import SignupFormContainer from "../Signin/SignupFormContainer";
import RoomContainer from "../Room/RoomContainer";
import Form from "../Room/Form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { chooseRoom } from "../../store/room/actions";

class Lobby extends Component {
  pick = id => {
    const currentRoom = this.props.rooms.find(room => room.id === id);
    console.log("what am io", currentRoom);
    this.props.chooseRoom(currentRoom);
  };

  render() {
    const roomButtons = this.props.rooms.map(room => (
      <button
        key={room.id}
        onClick={() => {
          return this.pick(room.id);
        }}
      >
        <Link to={`/room/${room.id}`}>{room.name}</Link>
      </button>
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
            <Form resource="room" field="name" />
            <Form resource="message" field="text" roomId={this.props.room.id} />
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
