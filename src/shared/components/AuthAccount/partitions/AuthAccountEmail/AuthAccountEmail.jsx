import React, { Component } from 'react';
import withStyles from '@plasma-platform/isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import classNames from 'classnames';
import F4 from '@plasma-platform/plasma-quark/lib/Fields/types/F4';
import N2E from '@plasma-platform/plasma-quark/lib/Notifications/types/N2E';
import Icon from '@plasma-platform/plasma-quark/lib/Icon';

import smallLogo from 'Images/smallLogo.svg';

import styles from './AuthAccountEmail.pcss';
import './icons/authEmail.svg';
import './icons/invalidMail.svg';

const ExpiredLinkUser = 'expiredLink@gmail.com';

/**
 * @namespace AuthAccountEmail
 */

/**
 * AuthAccountEmail
 * @memberof AuthAccountEmail
 * @class AuthAccountEmail
 * @type {Object}
 * @description Component for rendering email fields for authorization page.
 * @return {ReactComponent}
 * @example <AuthAccountEmail />
 */
class AuthAccountEmail extends Component {
  static propTypes = {
    formValues: PropTypes.objectOf(PropTypes.any),
    change: PropTypes.func.isRequired,
    checkEmail: PropTypes.func.isRequired,
    enterEmail: PropTypes.func.isRequired,
    isUserProfileInitialized: PropTypes.bool,
  };

  static contextTypes = {
    t: PropTypes.func,
  };

  static defaultProps = {
    formValues: {
      userEmail: '',
      userEmailInvalid: false,
    },
    isUserProfileInitialized: false,
  };

  constructor(props) {
    super(props);

    this.accountEmail = React.createRef();
  }

  state = {
    focus: true,
    defaultAvatar: true,
    showAvatar: true,
    userEmail: this.props.formValues.userEmail,
    errorEmail: this.props.formValues.userEmailInvalid,
    errorEmailEmpty: false,
    error: false,
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.formValues.userEmailValid) {
      this.setState({
        errorEmail: nextProps.formValues.userEmailInvalid,
        focus: true,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      (this.state.focus !== nextState.focus)
      || (this.state.userEmail !== nextState.userEmail)
      || (this.state.errorEmail !== nextState.errorEmail)
      || (this.state.errorEmailEmpty !== nextState.errorEmailEmpty)
      || (this.props.formValues.userEmail !== nextProps.formValues.userEmail)
      || (this.props.formValues.userEmailInvalid !== nextProps.formValues.userEmailInvalid)
      || (this.props.isUserProfileInitialized !== nextProps.isUserProfileInitialized)
    );
  }

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  /**
   * On change email field
   * @param {string} userEmail - users email
   */
  handleEmailChange = (userEmail) => {
    if (userEmail === ExpiredLinkUser) {
      this.props.change('authAccountEmail', 'expiredLink', true);
    }
    
    const validate = /^(.{1,64})@(\S+)\.(.{2,})/gi.test(userEmail);
    
    this.setState({
      userEmail,
      errorEmail: false,
      focus: true,
    }, () => {
      this.props.enterEmail(userEmail);

      this.props.change('authAccountEmail', 'userEmail', userEmail);
      this.props.change('authAccountEmail', 'userEmailValid', validate);
      this.props.change('authAccountEmail', 'userEmailInvalid', false);
    });
  };

  /**
   * Check on correct email
   */
  checkEmail = () => {
    const {
      userEmail,
      errorEmail,
    } = this.state;

    if (!errorEmail) {
      this.props.checkEmail(userEmail);
    }

    this.setState({
      errorEmail: false,
      focus: false,
    });
  };

  render() {
    const { t } = this.context;
    const {
      defaultAvatar,
      showAvatar,
      userEmail,
      errorEmail,
      correctMail,
      errorEmailEmpty,
      focus,
      error,
    } = this.state;

    const { isUserProfileInitialized } = this.props;

    if (error === true) return null;

    return (
      <div className={styles.AuthAccountEmail} ref={this.accountEmail}>
        <Field
          containerClassName={styles.AuthAccountEmail__field}
          name="email"
          type="email"
          component={() => (
            <F4
              className={styles.AuthAccountEmail__email}
              name="email"
              placeholder={t('Your Email')}
              icon="authEmail"
              focused={focus}
              value={userEmail}
              onChange={this.handleEmailChange}
              onBlur={this.checkEmail}
              invalid={errorEmail}
              disabled={isUserProfileInitialized}
            >
              {
                errorEmail &&
                  <Icon
                    className={styles['AuthAccountEmail__email--invalid']}
                    icon="invalidMail"
                  />
              }
              <N2E
                className={styles.AuthAccountEmail__notification}
                show={errorEmail}
              >
                <p className={styles.AuthAccountEmail__notificationText}>
                  {errorEmailEmpty ?
                    (
                      <span className={styles['AuthAccountEmail__notificationText--inside']}>
                        {t('Oh no! Looks like you don"t have entered email.')}
                      </span>
                    ) : (
                      <span className={styles['AuthAccountEmail__notificationText--inside']}>
                        {t('Oh no! Looks like you have entered incorrect email.')}
                      </span>
                    )
                  }
                  <span className={styles['AuthAccountEmail__notificationText--inside']}>
                    {t('Please check it and try again.')}
                  </span>
                </p>
              </N2E>
            </F4>
          )}
        />

        {
          correctMail &&
          <img
            className={classNames(
              styles.AuthAccountEmail__avatar,
              {
                [styles['AuthAccountEmail__avatar--show']]: showAvatar,
              }
            )}
            src={defaultAvatar ? smallLogo : ''}
            alt="User Avatar"
          />
        }
      </div>
    )
  }
}

export default withStyles(styles)(AuthAccountEmail);
