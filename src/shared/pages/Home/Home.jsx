import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@plasma-platform/isomorphic-style-loader/lib/withStyles';
import { Link } from 'react-router-dom';

import styles from './Home.pcss';

const Home = (props, context) => {
  const { t } = context;

  return (
    <div className={styles.Home}>
      <Link
        aria-label="Account"
        className={styles.Home__linkAuth}
        to="/"
      >
        {t('Account')}
      </Link>
    </div>
  )
};

Home.contextTypes = {
  t: PropTypes.func,
};

export default withStyles(styles)(Home);
