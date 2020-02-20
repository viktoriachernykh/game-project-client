import request from "superagent";
const baseUrl = "http://localhost:4000";

export const NEW_USER = "NEW_USER";
export const SET_SESSION = "user/SET_JWT_AND_USER_DATA";
export const LOGOUT_USER = "user/LOGOUT_USER";
export const UPDATE_USER = "user/UPDATE_USER";

export function logout() {
  return {
    type: LOGOUT_USER
  };
}

function signupSuccess(payload) {
  return {
    type: NEW_USER,
    payload
  };
}

export function updateUserData(userData) {
  return {
    type: UPDATE_USER,
    payload: userData
  };
}

export const signup = (username, email, password) => {
  return dispatch => {
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
};

function loginSuccess(jwt, userData) {
  return {
    type: SET_SESSION,
    payload: {
      jwt,
      user: userData
    }
  };
}
export const login = (username, password) => dispatch => {
  const data = {
    username: username,
    password: password
  };

  request
    .post(`${baseUrl}/login`)
    .send(data)
    .then(response => {
      const jwt = response.body.jwt;
      const user = response.body.userData;
      dispatch(loginSuccess(jwt, user));
    })
    .catch(console.error);
};
