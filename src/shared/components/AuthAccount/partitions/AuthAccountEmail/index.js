import { connect } from 'react-redux';
import { getFormValues, change } from 'redux-form';

import { getIsUserProfileInitialized } from "Selectors";
import AuthAccountEmail from './AuthAccountEmail';

export default connect((state) => ({
  formValues: getFormValues('authAccountEmail')(state),
  isUserProfileInitialized: getIsUserProfileInitialized(state),
}), {
  change,
})(AuthAccountEmail);