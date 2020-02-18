import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchActions } from "./store/chat/actions";
import LobbyContainer from "./components/Lobby/LobbyContainer";
import RoomContainer from "./components/Room/RoomContainer";
import Tetris from "./components/tetris/Tetris";

class App extends Component {
  stream = new EventSource("http://localhost:4000/stream");
  componentDidMount() {
    this.stream.onmessage = event => {
      // console.log("action", event);
      const action = JSON.parse(event.data);
      console.log("event.data from App", action);
      this.props.fetchActions(action);
    };
  }

  render() {
    return (
      <div>
        <Route exact path="/" component={LobbyContainer} />
        <Route path="/room/:id" component={RoomContainer} />
        <Route path="/games/:id" component={Tetris} />
      </div>
    );
  }
}

export default connect(null, { fetchActions })(App);

// export default App;
