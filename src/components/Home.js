import React, { Component } from "react";
import LoginFormContainer from "./LoginFormContainer";
import SignupFormContainer from "./SignupFormContainer";

export default class Products extends Component {
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
