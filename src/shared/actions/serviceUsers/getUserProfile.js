import { normalize } from 'normalizr';
import { getUserProfileInfo } from 'Selectors';
import * as types from 'Types';
import schemas from 'Schemas';

import { usersService } from './index';

/**
 * Get info for user
 * @returns {Function}
 */
export const getUserProfile = () => async (dispatch, getState) => {
  const currentState = getState();
  const currentProfileData = getUserProfileInfo(currentState) || {};

  if (currentProfileData.isInitialized || currentProfileData.isFetching) {
    return currentProfileData;
  }

  dispatch({ type: types.GET_USER_PROFILE_REQUEST });

  try {
    const response = await usersService.getProfile();

    dispatch({
      type: types.GET_USER_PROFILE_SUCCESS,
      payload: normalize(response, schemas.USER),
    });

    return response;
  } catch (error) {
    dispatch({
      type: types.GET_USER_PROFILE_FAILURE,
      payload: error.message,
    });

    throw new Error(error);
  }
};

export default getUserProfile;
