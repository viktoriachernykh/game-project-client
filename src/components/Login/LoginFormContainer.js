import React from "react";
import { connect } from "react-redux";
import { login } from "../../store/user/actions";
import LoginForm from "./LoginForm";

class LoginFormContainer extends React.Component {
  state = { username: "", password: "" };

  onSubmit = event => {
    event.preventDefault();
    this.props.login(
      // this.state.username,
      this.state.username,
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
      <LoginForm
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        values={this.state}
        text="Login"
      />
    );
  }
}

export default connect(null, { login })(LoginFormContainer);
