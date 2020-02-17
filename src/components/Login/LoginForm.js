import React from "react";

export default function CreateForm(props) {
  return (
    <div>
      <form onSubmit={event => props.onSubmit(event)}>
        username:
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={props.onChange}
          value={props.values.username}
        />
        {/* email:
        <input
          type="text"
          name="email"
          placeholder="email"
          onChange={props.onChange}
          value={props.values.email}
        /> */}
        <br />
        password:
        <input
          type="text"
          name="password"
          placeholder="password"
          onChange={props.onChange}
          value={props.values.password}
        />
        <br />
        <input type="submit" value={props.text} />
      </form>
    </div>
  );
}
