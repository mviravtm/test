import React, { Component } from 'react';
import withStyles from '@plasma-platform/isomorphic-style-loader/lib/withStyles';
import { Link } from 'react-router-dom';

import styles from './Home.pcss';

class Home extends Component {
  state = {
    error: false,
  };

  render() {

    return (
      <div className={styles.Home}>
        <Link
          className={styles.Home__link}
          id="galleryLink"
          to={`/gallery/`}
        >
          Gallery Page
        </Link>
      </div>
    )
  }
}

export default withStyles(styles)(Home);
