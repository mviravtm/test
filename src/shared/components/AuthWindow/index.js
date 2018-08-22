import { connect } from 'react-redux';

import {
  getIsUserProfileInitialized,
  getUserProfileId,
} from 'Selectors';

import AuthWindow from './AuthWindow';

export default connect((state) => ({
  isUserProfileInitialized: getIsUserProfileInitialized(state),
  userProfileId: getUserProfileId(state),
}))(AuthWindow);
