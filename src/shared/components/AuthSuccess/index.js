import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';

import {
  requestForRegistrationEmail,
  addNewUser,
} from 'Actions';

import {
  getIsUserProfileInitialized,
  getUserProfileId,
  getUserProfileInfobyId,
  getUserProfileToken,
} from 'Selectors';

import AuthSuccess from './AuthSuccess';

export default connect((state) => ({
  formValues: getFormValues('authAccountEmail')(state),
  isUserProfileInitialized: getIsUserProfileInitialized(state),
  userProfileId: getUserProfileId(state),
  userProfileToken: getUserProfileToken(state),
  userProfileInfoById: getUserProfileInfobyId(state, getUserProfileId(state)),
}), {
  requestForRegistrationEmail,
  addNewUser,
})(AuthSuccess);
