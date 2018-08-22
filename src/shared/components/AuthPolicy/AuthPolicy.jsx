import React, {Component} from 'react';
import PropTypes from "prop-types";
import withStyles from '@plasma-platform/isomorphic-style-loader/lib/withStyles';
import Config from 'Config/';

import styles from './AuthPolicy.pcss';

/**
 * @namespace AuthPolicy
 */

/**
 * AuthPolicy
 * @memberof AuthPolicy
 * @class AuthPolicy
 * @type {Object}
 * @description Component for rendering policy for authorization page.
 * @return {ReactComponent}
 * @example <AuthPolicy />
 */
class AuthPolicy extends Component {
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

    return (
      <div className={styles.AuthPolicy}>
        {t('By clicking the button you agree to the')}
        <a href={`${Config.templateMonsterURL}privacy-policy.php`} className={styles.AuthPolicy__link}>
          {t('Policy')}
        </a>
        {t('and')}
        <a href={`${Config.templateMonsterURL}terms.php`} className={styles.AuthPolicy__link}>
          {t('Terms')}
        </a>
      </div>
    )
  }
}

export default withStyles(styles)(AuthPolicy);
