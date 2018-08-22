import { connect } from 'react-redux';
import { getFormValues, change } from 'redux-form';

import {
  signInExternalAuth,
} from 'Actions';

import AuthAccountFB from './AuthAccountFB';

export default connect((state) => ({
  formValues: getFormValues('authAccountEmail')(state),
}), {
  change,
  signInExternalAuth,
})(AuthAccountFB);