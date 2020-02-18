import React from "react";
import Form from "./Form";
import { connect } from "react-redux";

class ChatContainer extends React.Component {
  pick = (name, id) => {
    this.setState({
      channel: name,
      channelId: id
    });
  };

  render() {
    console.log("this.props from ChatContainer render ", this.props);
    const channelButtons = this.props.channels.map(channel => (
      <button
        key={channel.id}
        onClick={() => this.pick(channel.name, channel.id)}
      >
        {channel.name}
      </button>
    ));

    const channel = this.props.channels.find(
      channel => channel.name === this.props.channel
    );

    const paragraphs = channel
      ? channel.messages.map(message => <p key={message.id}>{message.text}</p>)
      : null;

    return (
      <div>
        <Form resource="channel" field="name" />

        <Form
          resource="message"
          field="text"
          channelId={this.props.channelId}
        />

        {channelButtons}

        {paragraphs}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.session.user,
    token: state.session.jwt,
    channels: state.channels.channels
    // channel: state.channels.channel
  };
}

export default connect(mapStateToProps)(ChatContainer);
