import React, { Component } from 'react';
import withStyles from '@plasma-platform/isomorphic-style-loader/lib/withStyles';
import { Link } from 'react-router-dom';

import cat1 from 'Images/1.jpg';
import cat2 from 'Images/2.jpg';
import cat3 from 'Images/3.jpg';
import cat4 from 'Images/4.jpg';
import cat5 from 'Images/5.jpg';
import cat6 from 'Images/6.jpg';
import cat7 from 'Images/7.jpg';
import cat8 from 'Images/8.jpg';
import cat9 from 'Images/9.jpg';

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

        <ul className={styles.Gallery__images}>
          <li className={styles.Gallery__imageItem}>
            <img src={cat1} alt="catImage" className={styles.Gallery__image}/>
          </li>
          <li className={styles.Gallery__imageItem}>
            <img src={cat2} alt="catImage" className={styles.Gallery__image}/>
          </li>
          <li className={styles.Gallery__imageItem}>
            <img src={cat3} alt="catImage" className={styles.Gallery__image}/>
          </li>
          <li className={styles.Gallery__imageItem}>
            <img src={cat4} alt="catImage" className={styles.Gallery__image}/>
          </li>
          <li className={styles.Gallery__imageItem}>
            <img src={cat5} alt="catImage" className={styles.Gallery__image}/>
          </li>
          <li className={styles.Gallery__imageItem}>
            <img src={cat6} alt="catImage" className={styles.Gallery__image}/>
          </li>
          <li className={styles.Gallery__imageItem}>
            <img src={cat7} alt="catImage" className={styles.Gallery__image}/>
          </li>
          <li className={styles.Gallery__imageItem}>
            <img src={cat8} alt="catImage" className={styles.Gallery__image}/>
          </li>
          <li className={styles.Gallery__imageItem}>
            <img src={cat9} alt="catImage" className={styles.Gallery__image}/>
          </li>
        </ul>
      </div>
    )
  }
}

export default withStyles(styles)(Home);
