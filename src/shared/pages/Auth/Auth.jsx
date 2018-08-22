import React, { Component } from 'react';
import PropTypes from "prop-types";
import withStyles from '@plasma-platform/isomorphic-style-loader/lib/withStyles';
import L1 from '@plasma-platform/plasma-quark/lib/Loaders/types/L1';
import Config from 'Config';
import {Cookie} from "Utils";

import AuthHeader from 'Components/AuthHeader/';
import AuthWindow from 'Components/AuthWindow/';
import AuthFooter from 'Components/AuthFooter/';

import styles from './Auth.pcss';

/**
 * @namespace Auth
 */

/**
 * Auth
 * @memberof Auth
 * @class Auth
 * @type {Object}
 * @description Component for rendering authorization page.
 * @return {ReactComponent}
 * @example <Auth />
 */
class Auth extends Component {
  static propTypes = {
    userProfileToken: PropTypes.string,
    initializeUser: PropTypes.bool,
    getUserProfile: PropTypes.func.isRequired,
    isUserAuthorizied: PropTypes.bool,
    formValues: PropTypes.shape({
      registeredFB: PropTypes.bool,
    }),
  };

  static defaultProps = {
    userProfileToken: '',
    initializeUser: false,
    isUserAuthorizied: false,
    formValues: {
      registeredFB: false,
    },
  };

  state = {
    error: false,
    locationPage: false,
  };

  componentDidMount() {
    if (Cookie.getItem('access_token', Config.cookiesRoot)) {
      this.props.getUserProfile();
    }
  }

  componentWillReceiveProps(nextProps) {    
    if (nextProps.isUserAuthorizied) {

      this.setState({
        locationPage: true,
      });
    }

    if (nextProps.formValues.registeredFB && nextProps.userProfileToken) {
      Cookie.setItem('access_token', nextProps.userProfileToken, false, '/', Config.cookiesRoot);

      this.setState({
        locationPage: true,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      (this.props.userProfileToken !== nextProps.userProfileToken)
      || (this.props.initializeUser !== nextProps.initializeUser)
      || (this.props.isUserAuthorizied !== nextProps.isUserAuthorizied)
      || (this.props.formValues.registeredFB !== nextProps.formValues.registeredFB)
      || (this.state.error !== nextState.error)
      || (this.state.locationPage !== nextState.locationPage)
    );
  }

  redirectPage = () => {
    window.location.href = Config.cabinetURL;
  };

  render() {
    const { locationPage } = this.state;
    const { initializeUser } = this.props;

    if (locationPage) {
      this.redirectPage();
      return null;
    }

    return (
      initializeUser
        ? <L1 className={styles.Auth__pageLoader} />
        : (
          <div className={styles.Auth}>
            <AuthHeader />
            <AuthWindow />
            <AuthFooter />
          </div>
        )
    )
  }
}

export default withStyles(styles)(Auth);