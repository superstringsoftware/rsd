import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Shows } from '../api/shows.js';
import { Dogs, DogEntity } from '../api/dogs.js';
import { People, PersonEntity } from '../api/people.js';

import SimpleCollection from './universal/SimpleCollection.jsx';

export default createContainer(() => {
  return {
    entity: DogEntity,
    items: Dogs.find({}).fetch(),
    depItems: {
        Dog: Dogs.find({}).fetch(),
        Person: People.find({}).fetch()
    },
  };
}, SimpleCollection);

// App component - represents the whole app
// class App extends Component
