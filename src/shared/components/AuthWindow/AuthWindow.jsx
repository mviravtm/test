import React, {Component} from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import withStyles from '@plasma-platform/isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';

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
      error,
    } = this.state;

    if (error === true) return null;

    return (
      <main className={classNames(
        styles.AuthWindow,
        styles['AuthWindow--flipped'],
      )}>
        <Link
          className={styles.AuthWindow__link}
          id="page2"
          to={`/page2/`}
        >Page2 </Link>
      </main>
    )
  }
}

export default withStyles(styles)(AuthWindow);
