import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createBrowserHistory as createHistory } from 'history';
import ContextProvider from 'Components/ContextProvider';
import stylesReset from 'reset.css';
import stylesMain from 'Styles/main.pcss';
import store from 'shared/store';
import i18n from 'shared/i18n';
import Root from 'shared/Root';

const history = createHistory();

const method = process.env.NODE_ENV === 'local' ? 'render' : 'hydrate';

stylesReset._insertCss({ base: 'sf' }); // eslint-disable-line
stylesMain._insertCss({ base: 'sf' }); // eslint-disable-line

const context = {
  insertCss: (...styles) => {
    const removeCss = styles.map(x => x._insertCss({ base: 'sf' })); // eslint-disable-line
    return () => {
      removeCss.forEach(f => f());
    };
  },
};

ReactDOM[method](
  <AppContainer>
    <ContextProvider context={context}>
      <Root store={store} history={history} i18n={i18n} />
    </ContextProvider>
  </AppContainer>,
  document.getElementById('root'),
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('shared/Root', () => {
    ReactDOM.render(
      <AppContainer>
        <ContextProvider context={context}>
          <Root store={store} history={history} i18n={i18n} />
        </ContextProvider>
      </AppContainer>,
      document.getElementById('root'),
    );
  });
}
