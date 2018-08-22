import { normalize } from 'normalizr';
import * as types from 'Types';
import schemas from 'Schemas';

import { usersService } from './index';

export const requestUserEmailExistInformation = userMail => async (dispatch) => {
  dispatch({ type: types.GET_USER_EMAIL_INFO_REQUEST });

  try {
    const response = await usersService.requestUserEmailExistInformation({ email: userMail });

    dispatch({
      type: types.GET_USER_EMAIL_INFO_SUCCESS,
      payload: normalize(response, schemas.USER),
    });
  } catch (error) {
    dispatch({
      type: types.GET_USER_EMAIL_INFO_FAILURE,
      payload: error.message,
    });
  }
};

export default requestUserEmailExistInformation;
