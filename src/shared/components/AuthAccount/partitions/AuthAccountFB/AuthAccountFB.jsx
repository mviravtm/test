import React, { Component } from 'react';
import withStyles from '@plasma-platform/isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import FacebookAuth from 'react-facebook-auth';
import Config from "Config/";
import N2E from '@plasma-platform/plasma-quark/lib/Notifications/types/N2E';
import BF4 from '@plasma-platform/plasma-quark/lib/Buttons/types/BF4';

import styles from './AuthAccountFB.pcss';

/**
 * @namespace AuthAccountFB
 */

/**
 * AuthAccountFB
 * @memberof AuthAccountFB
 * @class AuthAccountFB
 * @type {Object}
 * @description Component for rendering facebook login for authorization page.
 * @return {ReactComponent}
 * @example <AuthAccountFB />
 */
class AuthAccountFB extends Component {
  static propTypes = {
    change: PropTypes.func.isRequired,
    successEmail: PropTypes.func,
  };

  static contextTypes = {
    t: PropTypes.func,
  };

  static defaultProps = {
    successEmail: () => {},
  };

  state = {
    errorEmail: false,
    error: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      (this.state.errorEmail !== nextState.errorEmail)
    );
  }

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  /**
   * Popover if closed fb-popup
   */
  fbHideErrorPopover = () => {
    this.setState({
      errorEmail: false,
    }, () => {
      window.removeEventListener('click', this.fbHideErrorPopover);
    });
  };

  /**
   * Facebook authorization
   * @param {object} response - callback from fb
   */
  fbAuth = (response) => {
    const { change } = this.props;

    if (response.accessToken) {
      if (change) {
        change('authAccountEmail', 'userEmail', response.email);
        change('authAccountEmail', 'userEmailValid', true);
        change('authAccountEmail', 'userEmailInvalid', false);
        change('authAccountEmail', 'registeredFB', true);

        // mocks for test user without email
        const email = response.email === 'fake_tnqzdoh_user@tfbnw.net' ? '' : response.email;

        this.props.successEmail(!email, email && response.accessToken);
      }
    } else {
      this.setState({
        errorEmail: true,
      }, () => {
        window.addEventListener('click', this.fbHideErrorPopover);
      });
    }
  };

  /**
   * Render fb button
   * @param onClick
   * @returns {*}
   */
  renderFbButton = ({ onClick }) => {
    const { t } = this.context;
    const { errorEmail } =this.state;

    return (
      <div className={styles.AuthAccountFB}>
        <BF4
          className={styles.AuthAccountFB__button}
          id="loginFacebook"
          onClick={onClick}
        >
          {t('Continue with Facebook')}
        </BF4>

        <N2E
          className={styles.AuthAccountFB__notification}
          show={errorEmail}
        >
          <p className={styles.AuthAccountFB__notificationText}>
            {t('Oh no! Looks like you didn’t provide the access to get your email from Facebook. Please do it or try to enter with email.')}
          </p>

        </N2E>
      </div>
    )
  };

  render() {
    const { error } = this.state;

    if (error === true) return null;

    return (
      <FacebookAuth
        appId={Config.facebookAppId}
        callback={this.fbAuth}
        component={this.renderFbButton}
      />
    )
  }
}

export default withStyles(styles)(AuthAccountFB);
