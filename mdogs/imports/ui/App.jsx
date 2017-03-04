import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Shows } from '../api/shows.js';
import { Dogs } from '../api/dogs.js';
import { People } from '../api/people.js';

import SimpleCollection from './universal/SimpleCollection.jsx';

export default createContainer(() => {
  return {
    items: People.find({}).fetch(),
    depItems: [Shows.find({}).fetch()],
    collection: Shows,
  };
}, SimpleCollection);

// App component - represents the whole app
// class App extends Component
