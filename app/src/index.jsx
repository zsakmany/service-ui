import React from 'react';
import { render } from 'react-dom';
import { Router, matchPath } from 'react-router-dom';
import { createHashHistory } from 'history';
import { userInfoSelector, activeProjectSelector, setActiveProjectAction } from 'controllers/user';
import { fetchProjectAction } from 'controllers/project';
import qhistory from 'qhistory';
import { stringify, parse } from 'qs';
import 'common/polyfills';

import 'reset-css/reset.css';
import 'common/css/fonts/fonts.scss';
import 'common/css/common.scss';
import 'c3/c3.css';

import App from './app';
import store from './store';

if (!process.env.production) {
  const query = parse(location.search, { ignoreQueryPrefix: true });
  const whyDidYouUpdateComponent =
    'whyDidYouUpdateComponent' in query && (query.whyDidYouUpdateComponent || '.*');

  if (whyDidYouUpdateComponent) {
    const { whyDidYouUpdate } = require('why-did-you-update'); // eslint-disable-line global-require
    whyDidYouUpdate(React, { include: new RegExp(whyDidYouUpdateComponent) });
    console.log(
      'Use http://localhost:3000/?whyDidYouUpdateComponent=^Component$# (with regex as query value) to check why certain component rerender.',
    );
  }
}

const queryParseHistory = qhistory(createHashHistory({ hashType: 'noslash' }), stringify, parse);
queryParseHistory.listen((location) => {
  const match = matchPath(location.pathname, '/:projectId');
  const hashProject = match.params.projectId;
  const userProjects = userInfoSelector(store.getState()).assigned_projects;
  if (
    userProjects &&
    Object.prototype.hasOwnProperty.call(userProjects, hashProject) &&
    hashProject !== activeProjectSelector(store.getState())
  ) {
    store.dispatch(setActiveProjectAction(hashProject));
    store.dispatch(fetchProjectAction(hashProject));
  }
});

const rerenderApp = (AppContainer) => {
  render(
    <Router history={queryParseHistory}>
      <AppContainer />
    </Router>,
    document.querySelector('#app'),
  );
};

if (module.hot) {
  module.hot.accept('./app', () => {
    const app = require('./app').default; // eslint-disable-line global-require
    rerenderApp(app);
  });
}
rerenderApp(App);
