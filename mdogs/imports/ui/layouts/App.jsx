import React, { PropTypes } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Meteor } from 'meteor/meteor';
//import Public from '../pages/Public';
//import Authenticated from '../pages/Authenticated';
import Header from './Header'
import Main from './Main'
//import Index from '../pages/Index';
//import Documents from '../pages/Documents';
//import NewDocument from '../pages/NewDocument';
//import EditDocument from '../containers/EditDocument';
//import ViewDocument from '../containers/ViewDocument';
//import Login from '../pages/Login';
//import RecoverPassword from '../pages/RecoverPassword';
//import ResetPassword from '../pages/ResetPassword';
//import Signup from '../pages/Signup';
//import NotFound from '../pages/NotFound';

export default App = appProps => (
  <div>
    <Header />
    <Main />


      {/*
      <Switch>
        <Route exact name="index" path="/" component={Index} />
        <Public path="/signup" component={Signup} {...appProps} />
        <Public path="/login" component={Login} {...appProps} />
        <Route name="recover-password" path="/recover-password" component={RecoverPassword} />
        <Route name="reset-password" path="/reset-password/:token" component={ResetPassword} />
        <Route component={NotFound} />
      </Switch>*/}
    </div>
);
