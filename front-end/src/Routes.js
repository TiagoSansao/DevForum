import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import MainPage from './pages/MainPage';
import Topic from './pages/Topic';
import Register from './pages/Register';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={MainPage} />
        <Route path='/topics/:topicId' component={Topic} />
        <Route path='/register' component={Register} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
