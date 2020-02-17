import React, { Component } from "react";
import LoginFormContainer from "../Login/LoginFormContainer";
import SignupFormContainer from "../Signin/SignupFormContainer";

export default class Lobby extends Component {
  render() {
    return (
      <div>
        <h1>Home Page</h1>

        {!this.props.user && (
          <div>
            <LoginFormContainer />
            <SignupFormContainer />
          </div>
        )}
        {this.props.user && (
          <div>
            <h1>Welcome, {this.props.user.username}!</h1>
            <p>hey hey hey</p>
          </div>
        )}
      </div>
    );
  }
}
