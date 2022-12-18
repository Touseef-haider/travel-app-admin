import { LOGIN, SET_PROFILE } from "../actionTypes";
import apiService from "../../services/apiService";

export const Login = (data) => {
  return async (dispatch) => {
    try {
      const response = await apiService.login(data);
      dispatch({
        type: LOGIN.SUCCESS,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: LOGIN.ERROR,
        payload: err?.message,
      });
    }
  };
};
export const RequestLogin = () => {
  return {
    type: LOGIN.REQUEST,
  };
};

export const ResetAuthError = () => {
  return {
    type: LOGIN.RESET,
  };
};

export const SetProfile = (profile) => {
  return {
    type: SET_PROFILE,
    payload: profile,
  };
};
