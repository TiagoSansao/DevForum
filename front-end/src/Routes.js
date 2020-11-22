import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import MainPage from './pages/MainPage';
import Topic from './pages/Topic';
import Register from './pages/Register';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import CreateTopic from './pages/CreateTopic';
import Settings from './pages/Settings';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={MainPage} />
        <Route path='/topics/:topicId' component={Topic} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/user/:user' component={UserProfile} />
        <Route path='/create' component={CreateTopic} />
        <Route path='/settings' component={Settings} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
