import request from "superagent";
const baseUrl = "http://localhost:4000";

// export const ALL_PRODUCTS = "ALL_PRODUCTS";
// export const NEW_PRODUCT = "NEW_PRODUCT";
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

// export const createProduct = data => (dispatch, getState) => {
//   const state = getState();
//   const { user } = state;
//   request
//     .post(`${baseUrl}/products`)
//     .set("Authorization", `Bearer ${user}`)
//     .send(data)
//     .then(response => {
//       dispatch(newImage(response.body));
//     })
//     .catch(console.error);
// };

// export const createProduct = (data, token) => dispatch => {
//   // console.log("data", data);
//   // console.log("token", token.jwt);
//   request
//     .post(`${baseUrl}/addproduct`)
//     .set("Authorization", `Bearer ${token.jwt}`)
//     .send(data)
//     .then(response => {
//       dispatch(newImage(response.body));
//     })
//     .catch(console.error);
// };

// function allProducts(payload) {
//   return {
//     type: ALL_PRODUCTS,
//     payload
//   };
// }
// export const getProducts = () => (dispatch, getState) => {
//   const state = getState();
//   // console.log("state from actions", state); // {products: Array(0)}
//   const { products } = state;
//   if (!products.length) {
//     request(`${baseUrl}/products`)
//       .then(response => {
//         dispatch(allProducts(response.body));
//       })
//       .catch(console.error);
//   }
// };
