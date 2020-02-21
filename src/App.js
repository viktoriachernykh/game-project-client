import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { fetchActions } from "./store/room/actions";
import LobbyContainer from "./components/Lobby/LobbyContainer";
import RoomContainer from "./components/Room/RoomContainer";
import Tetris from "./components/tetris/Tetris";
import Header from "./components/Header/Header";
import SignupFormContainer from "./components/Signin/SignupFormContainer";
import LoginFormContainer from "./components/Login/LoginFormContainer";
import Logout from "./components/Logout/Logout";
import { baseUrl } from "./baseURL";

class App extends Component {
  stream = new EventSource(`${baseUrl}/stream`);
  componentDidMount() {
    this.stream.onmessage = event => {
      // console.log("action", event);
      const action = JSON.parse(event.data);
      this.props.fetchActions(action);
    };
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={LobbyContainer} />
          <Route exact path="/login" component={LoginFormContainer} />
          <Route exact path="/signup" component={SignupFormContainer} />
          <Route exact path="/logout" component={Logout} />
          <Route path="/room/:id" component={RoomContainer} />
          <Route path="/games/:id" component={Tetris} />
        </Switch>
      </div>
    );
  }
}

export default connect(null, { fetchActions })(App);

// export default App;
