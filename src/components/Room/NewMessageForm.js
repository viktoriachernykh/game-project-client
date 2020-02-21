import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { baseUrl } from "../../baseURL";

class Form extends React.Component {
  state = {
    value: ""
  };

  onSubmit = async event => {
    event.preventDefault();

    const url = `${baseUrl}/${this.props.resource}`;

    try {
      const data = {
        [this.props.field]: this.state.value
      };

      if (this.props.resource === "message") {
        data.roomId = this.props.roomId;
      }
      await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${this.props.token}`
        }
      });

      this.clear();
    } catch (error) {
      console.log(error);
    }
  };

  onChange = event => {
    const { value } = event.target;

    this.setState({ value });
  };

  clear = () => {
    this.setState({ value: "" });
  };

  render() {
    const placeholder = `new ${this.props.resource}`;

    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          value={this.state.value}
          placeholder={placeholder}
          onChange={this.onChange}
        />

        <button>submit</button>

        <button type="button" onClick={this.clear}>
          Clear
        </button>
      </form>
    );
  }
}
function mapStateToProps(state) {
  return {
    token: state.session.jwt
  };
}

export default connect(mapStateToProps)(Form);
