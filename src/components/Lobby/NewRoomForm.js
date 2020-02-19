import React from "react";
import axios from "axios";
import { connect } from "react-redux";

class Form extends React.Component {
  state = {
    name: "",
    maxPlayers: 0
  };

  onSubmit = async event => {
    event.preventDefault();

    const url = `http://localhost:4000/${this.props.resource}`;

    try {
      const data = {
        name: this.state.name
        // maxPlayers: this.state.maxPlayers
      };
      await axios.post(url, data);

      this.clear();
    } catch (error) {
      console.log(error);
    }
  };

  onChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  clear = () => {
    this.setState({ value: "" });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          value={this.state.name}
          name="name"
          placeholder="Enter the name of the room"
          onChange={this.onChange}
        />
        <br />
        <button>submit</button>
        <button type="button" onClick={this.clear}>
          Clear
        </button>
      </form>
    );
  }
}

export default connect()(Form);
