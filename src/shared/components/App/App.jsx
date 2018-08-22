import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Switch, Route } from 'react-router-dom';
import Auth from 'shared/pages/Auth/';
import Page2 from 'shared/pages/Page2/';

export class App extends Component {
  static propTypes = {
    i18n: PropTypes.shape({
      changeLanguage: PropTypes.func.isRequired,
    }).isRequired,
    t: PropTypes.func.isRequired,
  };

  static childContextTypes = {
    i18n: PropTypes.shape({
      changeLanguage: PropTypes.func.isRequired,
    }).isRequired,
    t: PropTypes.func,
  };

  static defaultProps = {
    children: null,
  };

  getChildContext() {
    return {
      t: this.props.t,
      i18n: this.props.i18n,
    };
  }

  onRequestChangeAppLocale = (localeCode = 'en') => {
    this.props.i18n.changeLanguage(localeCode);
  };

  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Auth} />
          <Route exact path='/page2/' component={Page2} />
        </Switch>
      </div>
    );
  }
}

export default translate()(App);