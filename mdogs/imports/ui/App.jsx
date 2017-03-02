import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Shows } from '../api/shows.js';
import { Dogs } from '../api/dogs.js';

import SimpleCollection from './universal/SimpleCollection.jsx';

export default createContainer(() => {
  return {
    items: Dogs.find({}).fetch(),
  };
}, SimpleCollection);

// App component - represents the whole app
// class App extends Component
