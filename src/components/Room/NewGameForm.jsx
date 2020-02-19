import React, { Component } from "react";
import { connect } from "react-redux";

class NewGameForm extends Component {
  state = {
    maxPlayers: 0
  };

  onChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.maxPlayers, this.props.token);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            type="number"
            value={this.state.maxPlayers}
            onChange={this.onChange}
            name="maxPlayers"
            placeholder="Enter Maximum Players"
          />
          <button type="submit">Create game</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.session.jwt
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NewGameForm);
