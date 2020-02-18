import React, { Component } from "react";
import LoginFormContainer from "../Login/LoginFormContainer";
import SignupFormContainer from "../Signin/SignupFormContainer";
import RoomContainer from "../Room/RoomContainer";

export default class Lobby extends Component {
  render() {
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
            <RoomContainer />
          </div>
        )}
      </div>
    );
  }
}
