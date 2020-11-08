import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import MainPage from './pages/MainPage';
import Topic from './pages/Topic';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={MainPage} />
        <Route path='/topics/:topicId' component={Topic} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
