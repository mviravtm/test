import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@plasma-platform/isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import B2K from '@plasma-platform/plasma-quark/lib/Buttons/types/B2K';
import Config from 'Config/';

import fbLike from 'Images/fbLike.png';
import mailIllustration from 'Images/mailIllustration.png';
import styles from './AuthSuccess.pcss';

/**
 * @namespace AuthSuccess
 */

/**
 * AuthSuccess
 * @memberof AuthSuccess
 * @class AuthSuccess
 * @type {Object}
 * @description Component for rendering authorization success state.
 * @return {ReactComponent}
 * @example <AuthSuccess />
 */
class AuthSuccess extends Component {
  static propTypes = {
    formValues: PropTypes.objectOf(PropTypes.any),
    userProfileId: PropTypes.number,
    userProfileToken: PropTypes.string,
    userProfileInfoById: PropTypes.objectOf(PropTypes.any),
    requestForRegistrationEmail: PropTypes.func,
    addNewUser: PropTypes.func,
    isUserProfileInitialized: PropTypes.bool,
    firstFbUser: PropTypes.bool,
  };

  static contextTypes = {
    t: PropTypes.func,
  };

  static defaultProps = {
    formValues: {
      userEmail: '',
      userEmailInvalid: false,
      userEmailValid: false,
      registeredFB: false,
      expiredLink: false,
    },
    userProfile: {},
    userProfileId: 0,
    userProfileToken: '',
    userProfileInfoById: {},
    isUserProfileInitialized: false,
    requestForRegistrationEmail: () => {},
    addNewUser: () => {},
    firstFbUser: false,
  };

  state = {
    userEmail: this.props.formValues.userEmail
      || this.props.userProfileInfoById.login,
    error: false,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.isUserProfileInitialized !== nextProps.isUserProfileInitialized) {

      this.setState({
        userEmail: nextProps.formValues.userEmail,
      }, () => {
        const {userEmail} = this.state;

        if (nextProps.userProfileId) {
          // user exist
          if (nextProps.userProfileInfoById.emailConfirmed) {
            this.props.requestForRegistrationEmail(userEmail); // authorization email
          } else {
            this.props.requestForRegistrationEmail(userEmail); // confirm email
          }
        } else {
          // add new user
          this.props.addNewUser(this.state.userEmail);
        }
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      (this.props.userProfileId !== nextProps.userProfileId)
      || (this.props.formValues.userEmail !== nextProps.formValues.userEmail)
      || (this.props.formValues.userEmailInvalid !== nextProps.formValues.userEmailInvalid)
      || (this.props.formValues.userEmailValid !== nextProps.formValues.userEmailValid)
      || (this.props.formValues.registeredFB !== nextProps.formValues.registeredFB)
      || (this.props.formValues.expiredLink !== nextProps.formValues.expiredLink)
      || (this.state.userEmail !== nextState.userEmail)
      || (this.props.firstFbUser !== nextProps.firstFbUser)
      || (this.props.userProfileToken !== nextProps.userProfileToken)
    );
  }

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  /**
   * Success message if user already registered
   */
  renderMessageAlreadyRegistered = () => {
    const { t } = this.context;
    const { userEmail } = this.state;

    return (
      <div className={styles.AuthSuccess__describe}>
        <p className={styles.AuthSuccess__describeText}>
          {t('Welcome back!')}
        </p>
        <p className={styles.AuthSuccess__describeText}
          dangerouslySetInnerHTML={{ // eslint-disable-line
            __html: t('Please check <span class="AuthSuccess__describeText--mail">{{userEmail}}</span> and follow the link in email to log in.', {
              userEmail,
            })
          }}
        />
      </div>
    )
  };

  /**
   * Success message if new user
   */
  renderMessageNewUser = () => {
    const { t } = this.context;
    const { userEmail } = this.state;

    return (
      <div className={styles.AuthSuccess__describe}>
        <p className={styles.AuthSuccess__describeText}>
          {t('Welcome to TemplateMonster family!')}
        </p>
        <p className={styles.AuthSuccess__describeText}
           dangerouslySetInnerHTML={{ // eslint-disable-line
             __html: t('Please check <span class="AuthSuccess__describeText--mail">{{userEmail}}</span> and follow the link in email to confirm your account and log in to the site.', {
               userEmail,
             })
           }}
        />
      </div>
    )
  };

  /**
   * Message if expired link from email
   */
  renderMessageExpiredLink = () => {
    const { t } = this.context;
    const { userEmail } = this.state;

    return (
      <div className={styles.AuthSuccess__describe}>
        <p className={styles.AuthSuccess__describeText}>
          {t('Unfortunately, the link you followed has already expired :(')}
        </p>
        <p className={styles.AuthSuccess__describeText}
           dangerouslySetInnerHTML={{ // eslint-disable-line
             __html: t('But we’ve sent you the new one! Please check <span class="AuthSuccess__describeText--mail">{{userEmail}}</span> and follow the new link.', {
               userEmail,
             })
           }}
        />
      </div>
    )
  };

  /**
   * Message if users fb not linked with TM-account
   */
  renderMessageNotLinkedAccounts = () => {
    const { t } = this.context;
    const { userEmail } = this.state;

    return (
      <div className={styles.AuthSuccess__describe}>
        <p className={styles.AuthSuccess__describeText}
           dangerouslySetInnerHTML={{ // eslint-disable-line
             __html: t('We already have the account <span class="AuthSuccess__describeText--mail">{{userEmail}}</span>', {
               userEmail,
             })
           }}
        />
        <p className={styles.AuthSuccess__describeText}>
          {t('So, in case you want to link your email with your Facebook account, please follow the link in email we’ve just sent you.')}
        </p>
      </div>
    )
  };

  /**
   * Render main content
   */
  renderContent = () => {
    const { t } = this.context;
    const {
      userProfileId,
      userProfileToken,
      formValues: {
        registeredFB,
        expiredLink,
      },
    } = this.props;

    const alreadyRegisteredUser = userProfileId && !registeredFB && !expiredLink;
    const newUser = !userProfileId && !registeredFB && !expiredLink;
    const newFbUser = userProfileId && registeredFB && !expiredLink;
    const notLinkedAccount = registeredFB && !userProfileToken && !expiredLink;

    return (
      <div className={styles.AuthSuccess__bg}>

        <img className={styles.AuthSuccess__image} src={mailIllustration} alt={'Mail'} />

        <h2 className={styles.AuthSuccess__title}>
          {t('Check Your Mailbox')}
        </h2>


        {((alreadyRegisteredUser || newFbUser) && !notLinkedAccount) && this.renderMessageAlreadyRegistered()}
        {newUser && this.renderMessageNewUser()}
        {expiredLink && this.renderMessageExpiredLink()}
        {notLinkedAccount && this.renderMessageNotLinkedAccounts()}
      </div>
    )
  };

  /**
   * Render fb content
   */
  renderContentFB = () => {
    const { t } = this.context;
    const { userEmail } = this.state;

    return (
      <div className={styles.AuthSuccess__wrap}>
        <div className={classNames(
          styles.AuthSuccess__bg,
          styles['AuthSuccess__bg--fb'],
        )}>
          <img className={styles.AuthSuccess__image} src={fbLike} alt="Like"/>

          <h2 className={classNames(
            styles.AuthSuccess__title,
            styles['AuthSuccess__title--fb'],
          )}>
            {t('Welcome to Monsters Family!')}
          </h2>

          <p className={styles.AuthSuccess__describeText}
             dangerouslySetInnerHTML={{ // eslint-disable-line
               __html: t('We’ve used your email <span class="AuthSuccess__describeText--mail">{{userEmail}} </span>' +
                 'from Facebook to create account on TemplateMonster, so you can log in with the email now!', {
                 userEmail,
               })
             }}
          />
        </div>

        <B2K
          className={styles.AuthSuccess__button}
          type='link'
          href={Config.cabinetURL}
        >
          {t('Proceed to Your Account')}
        </B2K>
      </div>
    )
  };

  render() {
    const {
      userProfileToken,
    } = this.props;

    const { error } = this.state;

    if (error === true) return null;

    return (
      <div className={classNames(
        styles.AuthSuccess,
        {
          [styles['AuthSuccess--fb']]: userProfileToken,
        },
      )}>
        {
          userProfileToken
            ? this.renderContentFB()
            : this.renderContent()
        }
      </div>
    )
  }
}

export default withStyles(styles)(AuthSuccess);
