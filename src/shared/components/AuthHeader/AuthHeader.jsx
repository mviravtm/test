import React, { Component } from 'react';
import withStyles from '@plasma-platform/isomorphic-style-loader/lib/withStyles';
import Config from 'Config/';
import Icon from '@plasma-platform/plasma-quark/lib/Icon';

import styles from './AuthHeader.pcss';
import './icons/logotype.svg';

/**
 * @namespace AuthHeader
 */

/**
 * AuthHeader
 * @memberof AuthHeader
 * @class AuthHeader
 * @type {Object}
 * @description Component for rendering header for authorization page.
 * @return {ReactComponent}
 * @example <AuthHeader />
 */
class AuthHeader extends Component {
  state = {
    error: false,
  };

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  render() {
    const { error } = this.state;

    if (error === true) return null;

    return (
      <header className={styles.AuthHeader}>
        <a href={Config.storefrontURL} className={styles.AuthHeader__logo}>
          <Icon
            className={styles.AuthHeader__img}
            icon="logotype"
          />
        </a>
      </header>
    )
  }
}

export default withStyles(styles)(AuthHeader);
