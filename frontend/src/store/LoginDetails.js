// LoginDetails.js

const initialState = {
  loginResponse: null,
};

export const loginDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_LOGIN_RESPONSE":
      return { ...state, loginResponse: action.payload };
    // Other cases...
    default:
      return state;
  }
};

export const saveLoginResponse = (response) => ({
  type: "SAVE_LOGIN_RESPONSE",
  payload: response,
});
