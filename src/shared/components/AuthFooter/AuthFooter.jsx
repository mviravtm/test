import React, { Component } from 'react';
import withStyles from '@plasma-platform/isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';

import styles from './AuthFooter.pcss';

/**
 * @namespace AuthFooter
 */

/**
 * AuthFooter
 * @memberof AuthFooter
 * @class AuthFooter
 * @type {Object}
 * @description Component for rendering footer for authorization page.
 * @return {ReactComponent}
 * @example <AuthFooter />
 */
class AuthFooter extends Component {
  static contextTypes = {
    t: PropTypes.func,
  };

  state = {
    error: false,
  };

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  render() {
    const { t } = this.context;
    const { error } = this.state;

    if (error === true) return null;

    return (
      <footer className={styles.AuthFooter}>
        <span
          className={styles.AuthFooter__emoji}
          role="img"
          aria-label="emoji"
        >
          &copy;
        </span>
        {t('2018 Web Templates LLC. Всі права захищені')}
      </footer>
    )
  }
}

export default withStyles(styles)(AuthFooter);
