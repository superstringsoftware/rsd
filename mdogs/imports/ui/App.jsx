import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Shows, ShowEntity } from '../api/shows.js';
import { Dogs, DogEntity } from '../api/dogs.js';
import { People, PersonEntity } from '../api/people.js';
import {Results, ResultEntity} from '../api/results';

import SimpleCollection from './SimpleCollection.jsx';

export const DogsAdminTable = createContainer(() => {
  return {
    entity: DogEntity,
    items: Dogs.find({}, {sort: [ ["Name", "asc"], ["dob", "desc"] ] }).fetch(),
    depItems: {
        Dog: Dogs.find({}).fetch(),
        Person: People.find({}).fetch()
    },
  };
}, SimpleCollection);

export const PeopleAdminTable = createContainer(() => {
  return {
    entity: PersonEntity,
    items: People.find({}, {sort: [ ["name", "asc"] ] }).fetch(),
    depItems: {
    },
  };
}, SimpleCollection);

export const ShowsAdminTable = createContainer(() => {
    return {
        entity: ShowEntity,
        items: Shows.find({}, {sort: [ ["name", "asc"] ] }).fetch(),
        depItems: {
        },
    };
}, SimpleCollection);


export const ResultsAdminTable = createContainer(() => {
    return {
        entity: ResultEntity,
        items: Results.find({}, {sort: [ ["place", "asc"] ] }).fetch(),
        depItems: {
        },
    };
}, SimpleCollection);

// App component - represents the whole app
// class App extends Component
