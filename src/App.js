import React, { Component } from "react";
import { Container } from '@material-ui/core';
import { connect } from "react-redux";
import { IntlProvider } from "react-intl";

import Routes from "./Routes";
import locales from "./translations/translation.json";
import AppTopBar from "./components/AppBar";
import Notification from "./components/Notification";

import { selectLanguage } from './selectors/localization';
import { selectNotifications } from './selectors/notifications';

class App extends Component {
  render() {
    const { lang, notifications } = this.props
   
    return (
      <IntlProvider locale={lang} key={lang} messages={locales[lang]}>
        <div className="App">
            <AppTopBar />
            <Container fixed>
              <Routes />
            </Container>
            {notifications.map(notification => <Notification {...notification} key={notification.id} />)}
        </div>
      </IntlProvider>
    );
  }
}

const mapStateToProps = state => ({
  lang: selectLanguage(state),
  notifications: selectNotifications(state),
});

export default connect(mapStateToProps)(App);
