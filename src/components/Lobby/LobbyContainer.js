import React from "react";
import { connect } from "react-redux";
import Lobby from "./Lobby";

class LobbyContainer extends React.Component {
  render() {
    return <Lobby user={this.props.user} token={this.props.token} />;
  }
}

function mapStateToProps(state) {
  return { user: state.session.user, token: state.session.jwt };
}

export default connect(mapStateToProps)(LobbyContainer);
