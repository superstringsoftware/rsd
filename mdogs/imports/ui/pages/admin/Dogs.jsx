import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import { Dogs, DogEntity } from '../../../api/dogs.js';
import { People, PersonEntity } from '../../../api/people.js';

import SimpleCollection from '../../SimpleCollection.jsx';

export default DogsAdminTable = withTracker(() => {
  const resHandle = Meteor.subscribe('admin.dogs');
  const loading = !resHandle.ready();

  return {
    entity: DogEntity,
    items: loading ? [] : Dogs.find({}, {sort: [ ["Name", "asc"], ["dob", "desc"] ] }).fetch(),
    depItems: loading ? {Dog: [], Person: []} : {
        Dog: Dogs.find({}).fetch(),
        Person: People.find({}).fetch()
    },
  };
}) (SimpleCollection);
