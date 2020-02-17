import React from "react";
import { connect } from "react-redux";
import Home from "./Home";

class ProductsContainer extends React.Component {
  render() {
    return <Home user={this.props.user} token={this.props.token} />;
  }
}

function mapStateToProps(state) {
  return { user: state.session.user, token: state.session.jwt };
}

export default connect(mapStateToProps)(ProductsContainer);
