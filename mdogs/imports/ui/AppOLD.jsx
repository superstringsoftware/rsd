import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Shows, ShowEntity } from '../api/shows.js';
import { Dogs, DogEntity } from '../api/dogs.js';
import { People, PersonEntity } from '../api/people.js';
import {Results, ResultEntity} from '../api/results';

import {ResultsShows} from './ResultsShows.jsx';

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
        items: (Shows.find({}).fetch()).sort( function(a,b) {
            if (simpleStringToDate(a.date) > simpleStringToDate(b.date)) return -1;
            else if (simpleStringToDate(a.date) < simpleStringToDate(b.date)) return 1;
                 else return 0;
        }),
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

export const ShowsSelection = createContainer(() => {
    return {
        entity: ShowEntity,
        items: Shows.find({}, {sort: [ ["name", "asc"] ] }).fetch(),

    };
}, ResultsShows);

// App component - represents the whole app
// class App extends Component

// ugly hack for sorting by date with a string representation
function simpleStringToDate(str) {
  x = str.split(".");
  d = new Date(parseInt(x[2]), parseInt(x[1]) - 1, parseInt(x[0]));
  // console.log(str, " = ", d);
  return d;
}
