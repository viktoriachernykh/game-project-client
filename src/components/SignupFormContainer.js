import React from "react";
import { connect } from "react-redux";
import { signup } from "../actions";
import SignupForm from "./SignupForm";

class SignupFormContainer extends React.Component {
  state = { username: "", email: "", password: "" };

  onSubmit = event => {
    event.preventDefault();
    // console.log(this.state.email, this.state.password);
    this.props.signup(
      // this.state.values
      this.state.username,
      this.state.email,
      this.state.password
    );
  };
  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <SignupForm
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        values={this.state}
        text="Signup"
      />
    );
  }
}

export default connect(null, { signup })(SignupFormContainer);
