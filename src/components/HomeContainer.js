import React from "react";
import { connect } from "react-redux";
import Home from "./Home";

class ProductsContainer extends React.Component {
  render() {
    return <Home user={this.props.user} />;
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(ProductsContainer);
