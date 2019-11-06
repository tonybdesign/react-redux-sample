import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';
import App from './App';
import { register } from './serviceWorker';
import { setLanguage } from './actions/localizationActions';

import './index.css';

const target = document.getElementById('root');

if (!Intl.PluralRules) {
  require('@formatjs/intl-pluralrules/polyfill');
  require('@formatjs/intl-pluralrules/dist/locale-data/en');
  require('@formatjs/intl-pluralrules/dist/locale-data/pl');
}

if (!Intl.RelativeTimeFormat) {
  require('@formatjs/intl-relativetimeformat/polyfill');
  require('@formatjs/intl-relativetimeformat/dist/locale-data/en');
  require('@formatjs/intl-relativetimeformat/dist/locale-data/pl');
}

const language = (navigator.languages && navigator.languages[0])
    || navigator.language
    || navigator.userLanguage;

// Split locales with a region code
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

store.dispatch(setLanguage(languageWithoutRegionCode || language));

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  target,
);

register();
