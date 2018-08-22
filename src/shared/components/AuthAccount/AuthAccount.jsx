import React, { Component } from 'react';
import withStyles from '@plasma-platform/isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import B2K from '@plasma-platform/plasma-quark/lib/Buttons/types/B2K';
import L3 from '@plasma-platform/plasma-quark/lib/Loaders/types/L3';

import fbLike from 'Images/fbLike.png';
import AuthPolicy from 'Components/AuthPolicy/';
import AuthAccountEmail from './partitions/AuthAccountEmail/';
import AuthAccountFB from './partitions/AuthAccountFB/';
import styles from './AuthAccount.pcss';
import './icons/continue.svg';

/**
 * @namespace AuthAccount
 */

/**
 * AuthAccount
 * @memberof AuthAccount
 * @class AuthAccount
 * @type {Object}
 * @description Component for rendering form authorization page.
 * @return {ReactComponent}
 * @example <AuthAccount />
 */
class AuthAccount extends Component {
  static propTypes = {
    requestUserEmailExistInformation: PropTypes.func.isRequired,
    signInExternalAuth: PropTypes.func.isRequired,
    formValues: PropTypes.objectOf(PropTypes.any),
    change: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    userProfileFetching: PropTypes.bool,
    back: PropTypes.bool,
  };

  static contextTypes = {
    t: PropTypes.func,
  };

  static defaultProps = {
    formValues: {
      userEmail: '',
      userEmailInvalid: false,
      userEmailValid: false,
    },
    userProfileFetching: false,
    back: false,
  };

  constructor(props) {
    super(props);

    this.userEmail = '';
  }

  state = {
    userEmail: '',
    errorEmail: false,
    errorEmailEmpty: false,
    isDisabled: false,
    fbNoEmail: false,
    error: false,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      userEmail: nextProps.formValues.userEmail,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      (this.state.userEmail !== nextState.userEmail)
      || (this.state.errorEmail !== nextState.errorEmail)
      || (this.state.errorEmailEmpty !== nextState.errorEmailEmpty)
      || (this.state.isDisabled !== nextState.isDisabled)
      || (this.state.fbNoEmail !== nextState.fbNoEmail)
      || (this.props.formValues.userEmail !== nextProps.formValues.userEmail)
      || (this.props.formValues.userEmailInvalid !== nextProps.formValues.userEmailInvalid)
      || (this.props.formValues.userEmailValid !== nextProps.formValues.userEmailValid)
      || (this.props.userProfileFetching !== nextProps.userProfileFetching)
      || (this.props.back !== nextProps.back)
    );
  }

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  enterEmail = (email) => {
    this.userEmail = email;
  };

  handleSubmit = () => {
    this.checkEmail(this.userEmail, true);
  };

  /**
   * Check on correct email
   * @param {string} userEmail - users email
   * @param click
   */
  checkEmail = (userEmail, click) => {
    const { change, formValues } = this.props;

    if (formValues.userEmailValid) {
      this.setState({
        userEmail,
      }, () => {
        if (change) {
          change('userEmailInvalid', false);
          this.successEmail();
        }
      });
    } else if (formValues.userEmail.length === 0) {
      if (change) {
        change('userEmailInvalid', click);
      }
    } else if (change) {
      change('userEmailInvalid', true);
    }
  };

  /**
   * Success email
   * @param {bool} statusFailed - if failed auth
   * @param {string} fbToken - token from fb
   */
  successEmail = (statusFailed, fbToken) => {
    if (statusFailed) {
      // facebook auth: user don't have email
      this.setState({
        fbNoEmail: true,
      });
    } else {
      this.props.requestUserEmailExistInformation(this.state.userEmail);
      if (fbToken) {
        this.props.signInExternalAuth('facebook', fbToken);
      }
    }
  };

  /**
   * Render forms content
   */
  renderContent = () => {
    const { t } = this.context;

    const {
      userEmail,
    } = this.state;

    return (
      <div className={styles.AuthAccount__form}>
        <h2 className={styles.AuthAccount__title}>
          {t('Enter Your Account')}
        </h2>

        <AuthAccountFB
          email={userEmail}
          successEmail={this.successEmail}
        />

        <div className={styles.AuthAccount__line}>
          <span className={styles.AuthAccount__lineText}>{t('or')}</span>
        </div>

        <AuthAccountEmail
          checkEmail={this.checkEmail}
          enterEmail={this.enterEmail}
        />
      </div>
    )
  };

  /**
   * Render forms content fb
   */
  renderContentFB = () => {
    const { t } = this.context;

    return (
      <div className={styles.AuthAccount__form}>
        <img className={styles.AuthAccount__image} src={fbLike} alt="Like"/>

        <h2 className={classNames(
          styles.AuthAccount__title,
          styles['AuthAccount__title--fb'],
        )}>
          {t('Please Enter Your Email')}
        </h2>

        <p className={styles.AuthAccount__describe}>
          {t('We’ve used your Facebook data to create account on TemplateMonster, ' +
            'but unfortunately there are no email address. Please enter your email to complete registration:')}
        </p>

        <AuthAccountEmail
          checkEmail={this.checkEmail}
          enterEmail={this.enterEmail}
        />
      </div>
    )
  };

  render() {
    if (this.state.error === true) return null;

    const { t } = this.context;

    const {
      handleSubmit,
      formValues,
      userProfileFetching,
      back,
    } = this.props;

    const {
      fbNoEmail,
    } = this.state;

    const textButton = fbNoEmail
      ? t('Complete Registration')
      : t('Continue with Email');

    return (
     <div className={classNames(
       styles.AuthAccount,
       {
         [styles['AuthAccount--back']]: back,
       },
     )}>
       <form
         className={styles.AuthAccount__authForm}
         onSubmit={handleSubmit(this.handleSubmit)}
       >
         {
           fbNoEmail
             ? this.renderContentFB()
             : this.renderContent()
         }
         <B2K
           id="loginEmail"
           className={classNames(
             styles.AuthAccount__button,
             {
               [styles['AuthAccount__button--disabled']]: (!formValues.userEmailValid || userProfileFetching),
             },
           )}
           type="submit"
           icon="continue"
           disabled={!formValues.userEmailValid || userProfileFetching}
         >
           {userProfileFetching ? (
             <L3 />
           ) : (
             textButton
           )}
         </B2K>
       </form>

       <AuthPolicy/>
     </div>
    )
  }
}

export default withStyles(styles)(AuthAccount);
