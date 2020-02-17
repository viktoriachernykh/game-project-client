import request from "superagent";
const baseUrl = "http://localhost:4000";

export const NEW_USER = "NEW_USER";
export const JWT = "JWT";

function signupSuccess(payload) {
  return {
    type: NEW_USER,
    payload
  };
}

export const signup = (username, email, password) => dispatch => {
  const data = {
    username: username,
    email: email,
    password: password
  };
  request
    .post(`${baseUrl}/users`)
    .send(data)
    .then(response => {
      dispatch(signupSuccess(response.body));
    })
    .catch(console.error);
};

function loginSuccess(payload) {
  return {
    type: JWT,
    payload
  };
}
export const login = (username, password) => dispatch => {
  console.log("3", password);
  const data = {
    username: username,
    password: password
  };
  console.log(" data test", data);

  request
    .post(`${baseUrl}/login`)
    .send(data)
    .then(response => {
      dispatch(loginSuccess(response.body));
    })
    .catch(console.error);
};
