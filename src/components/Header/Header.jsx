import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div>
        <h1 style={{ display: "inline-block" }}>What up game title</h1>
        <audio controls autoplay loop>
          <source src="/music/6.mp3" type="audio/mpeg" />
        </audio>
        {this.props.token ? (
          <nav style={{ display: "inline-block" }}>
            <Link to="/">Lobby</Link>
            <Link to="/logout">Log out</Link>
          </nav>
        ) : (
          <nav style={{ display: "inline-block" }}>
            <Link to="/login">Log in</Link>
            <Link to="/signup">Sign up</Link>
          </nav>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.session.jwt
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
