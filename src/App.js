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

// import React from "react";
// import { Switch, Route } from "react-router-dom";
// import Catalogue from "./components/Catalogue";
// // import PaymentPage from "./components/PaymentPage";
// import CheckoutPage from "./components/CheckoutPage";
// import Toolbar from "./components/Toolbar";
// import CatalogueByCategories from "./components/CatalogueByCategories";
// import "./App.css";
// import PaymentPage from "./components/PaymentPage";

// export default class App extends React.Component {
//   render() {
//     return (
//       <div className="App">
//         <Toolbar />
//         <Switch>
//           <Route path="/checkout" component={CheckoutPage} />
//           {/* <Route path="/checkout" component={CheckoutPage} /> */}
//           <Route
//             path="/categories/:id/products"
//             component={CatalogueByCategories}
//           />
//           <Route path="/payment" component={PaymentPage} />
//           <Route component={Catalogue} />
//         </Switch>
//       </div>
//     );
//   }
// }
