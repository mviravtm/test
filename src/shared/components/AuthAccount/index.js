import { connect } from 'react-redux';
import {getFormValues, reduxForm} from 'redux-form';
import { Cookie } from "Utils";
import Config from "Config";

import {
  requestUserEmailExistInformation,
  signInExternalAuth,
} from 'Actions';

import {
  getIsUserProfileFetching,
} from 'Selectors';

import AuthAccount from './AuthAccount';

export default connect((state) => ({
  formValues: getFormValues('authAccountEmail')(state),
  userProfileFetching: getIsUserProfileFetching(state),
}), {
  requestUserEmailExistInformation,
  signInExternalAuth,
})(reduxForm({
  form: 'authAccountEmail',
  initialValues: {
    userEmail: Cookie.getItem('lgn', Config.cookiesRoot) || '',
    userEmailInvalid: false,
    userEmailValid: !!Cookie.getItem('lgn', Config.cookiesRoot),
  }

})(AuthAccount));
