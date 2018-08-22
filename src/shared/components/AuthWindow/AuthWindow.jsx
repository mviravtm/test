import React, {Component} from 'react';
import PropTypes from "prop-types";
import withStyles from '@plasma-platform/isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';

import AuthAccount from 'Components/AuthAccount/';
import AuthSuccess from 'Components/AuthSuccess/';

import styles from './AuthWindow.pcss';

/**
 * @namespace AuthWindow
 */

/**
 * AuthWindow
 * @memberof AuthWindow
 * @class AuthWindow
 * @type {Object}
 * @description Component for rendering authorization form page.
 * @return {ReactComponent}
 * @example <AuthWindow />
 */
class AuthWindow extends Component {
  static propTypes = {
    isUserProfileInitialized: PropTypes.bool.isRequired,
    userProfileId: PropTypes.number,
  };

  static defaultProps = {
    userProfileId: 0,
  };

  state = {
    successEmail: this.props.isUserProfileInitialized,
    isToken: false,
    error: false,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      successEmail: nextProps.isUserProfileInitialized,
    });

    if (nextProps.userProfileId) {
      this.setState({
        isToken: true,
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      (this.state.successEmail !== nextState.successEmail)
      || (this.props.isUserProfileInitialized !== nextProps.isUserProfileInitialized)
    );
  }

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  render() {
    const {
      successEmail,
      error,
    } = this.state;

    if (error === true) return null;

    return (
      <main className={classNames(
        styles.AuthWindow,
        styles['AuthWindow--flipped'],
      )}>
        <div className={classNames(
          styles.AuthWindow__animation,
          {
            [styles['AuthWindow__animation--flipped']]: successEmail,
          }
        )}>
          <AuthAccount back={successEmail}/>
          <AuthSuccess />
        </div>
      </main>
    )
  }
}

export default withStyles(styles)(AuthWindow);
