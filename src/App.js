import React, { Component } from "react";
import store from "./store/index";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";
import LobbyContainer from "./components/Lobby/LobbyContainer";
import Tetris from "./components/tetris/Tetris";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Route exact path="/" component={LobbyContainer} />
          <Route path="/games/:id" component={Tetris} />
        </div>
      </Provider>
    );
  }
}

export default App;
