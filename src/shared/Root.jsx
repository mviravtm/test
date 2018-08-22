import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import App from 'Components/App/index';

const Root = ({ store, i18n }) => (
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </I18nextProvider>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.object, PropTypes.func])).isRequired,
  i18n: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Root;