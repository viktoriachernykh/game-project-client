import React from "react";
import Form from "./Form";
import { connect } from "react-redux";
import { chooseRoom } from "../../store/room/actions";

class RoomContainer extends React.Component {
  pick = id => {
    const currentRoom = this.props.rooms.find(room => room.id === id);
    console.log("what am io", currentRoom);
    this.props.chooseRoom(currentRoom);
    // this.setState({
    //   room: currentRoom.name,
    //   roomId: currentRoom.id
    // });
  };

  render() {
    console.log("this.props from RoomContainer render ", this.props);
    const roomButtons = this.props.rooms.map(room => (
      <button
        key={room.id}
        onClick={() => {
          return this.pick(room.id);
        }}
      >
        {room.name}
      </button>
    ));

    const room = this.props.room;

    const paragraphs =
      Object.keys(room).length !== 0
        ? room.messages.map(message => <p key={message.id}>{message.text}</p>)
        : null;

    return (
      <div>
        <Form resource="room" field="name" />

        <Form resource="message" field="text" roomId={this.props.room.id} />

        {roomButtons}

        {paragraphs}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.session.user,
    token: state.session.jwt,
    rooms: state.rooms.rooms,
    room: state.rooms.room
  };
}

export default connect(mapStateToProps, { chooseRoom })(RoomContainer);
