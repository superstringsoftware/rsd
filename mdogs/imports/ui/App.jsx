import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Shows } from '../api/shows.js';
import { Dogs, DogEntity } from '../api/dogs.js';
import { People, PersonEntity } from '../api/people.js';

import SimpleCollection from './SimpleCollection.jsx';

export var DogsAdminTable = createContainer(() => {
  return {
    entity: DogEntity,
    items: Dogs.find({}, {sort: [ ["Name", "asc"], ["dob", "desc"] ] }).fetch(),
    depItems: {
        Dog: Dogs.find({}).fetch(),
        Person: People.find({}).fetch()
    },
  };
}, SimpleCollection);

export var PeopleAdminTable = createContainer(() => {
  return {
    entity: PersonEntity,
    items: People.find({}, {sort: [ ["name", "asc"] ] }).fetch(),
    depItems: {
    },
  };
}, SimpleCollection);

// App component - represents the whole app
// class App extends Component
