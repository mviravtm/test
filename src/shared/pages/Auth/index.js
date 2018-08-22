import { connect } from 'react-redux';

import { getFormValues } from 'redux-form';

import {getUserProfile} from "Actions";

import {
  getUserProfileToken,
  getInitializeUser,
  getIsUserAuthorizied,
} from 'Selectors';

import Auth from './Auth';

export default connect((state) => ({
  formValues: getFormValues('authAccountEmail')(state),
  userProfileToken: getUserProfileToken(state),
  initializeUser: getInitializeUser(state),
  isUserAuthorizied: getIsUserAuthorizied(state),
}), {
  getUserProfile,
})(Auth);
