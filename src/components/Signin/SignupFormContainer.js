import React from "react";
import { connect } from "react-redux";
import { signup } from "../../store/user/actions";
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
    this.setState({
      username: "",
      email: "",
      password: ""
    });
  };
  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    if (Object.keys(this.props.user).length) {
      setTimeout(() => {
        this.props.history.push("/login");
      }, 500);
      return <p>Sign-up successful!</p>;
    }
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

function mapStateToProps(state) {
  return {
    user: { ...state.session.user }
  };
}

export default connect(mapStateToProps, { signup })(SignupFormContainer);
