// // import { ALL_CHANNELS, ONE_CHANNEL } from "./actions";
import { ALL_CHANNELS } from "./actions";

const initialState = {
  channels: []
  // channel: "first"
};

export default function(state = initialState, action = {}) {
  // console.log(" Reducer was reached!");
  switch (action.type) {
    case ALL_CHANNELS: {
      console.log("stream goes to reducer?", action.payload);
      // return { ...state, channels: action.payload };
      // this.setState({ channels: payload });
      return {
        ...state,
        channels: action.payload
        // channel: action.payload.map(channel => channel.messages)
      };
    }
    //     // case ONE_CHANNEL: {
    //     // const channels = [...this.state.channels, payload];
    //     // this.setState({ channels });
    //     // }
    default:
      return state;
  }
}
