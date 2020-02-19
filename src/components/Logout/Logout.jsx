import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../../store/user/actions";

class Logout extends Component {
  logout = () => {
    this.props.logout();
  };

  render() {
    if (!this.props.token) {
      setTimeout(() => {
        this.props.history.push("/login");
      }, 1000);
      return <div>Log out successful!</div>;
    }
    return (
      <div>
        <h1>Logout</h1>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.session.jwt
});

const mapDispatchToProps = { logout };

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
