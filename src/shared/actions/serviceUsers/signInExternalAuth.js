import Config from 'Config';
import * as types from "Types";
import { usersService } from './index';

export const signInExternalAuth = (client, fbToken) => async (dispatch) => {
  dispatch({ type: types.POST_SIGNIN_AUTH_REQUEST });

  try {
    const response = await usersService.signinSignupViaAuthClient({ clientName: client, token: fbToken, scope: Config.scopes});

    dispatch({
      type: types.POST_SIGNIN_AUTH_SUCCESS,
      payload: response.token.access_token,
    });
  } catch (error) {
    dispatch({
      type: types.POST_SIGNIN_AUTH_FAILURE,
      payload: error.message,
    });
  }
};

export default signInExternalAuth;
