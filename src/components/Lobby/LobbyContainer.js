import React from "react";
import { connect } from "react-redux";
import Lobby from "./Lobby";

class LobbyContainer extends React.Component {
  render() {
    return <Lobby user={this.props.user} />;
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(LobbyContainer);
