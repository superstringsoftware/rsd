import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import { People, PersonEntity } from '../../../api/people.js';

import SimpleCollection from '../../SimpleCollection.jsx';

export default PeopleAdminTable = withTracker(() => {
  const resHandle = Meteor.subscribe('admin.people');
  const loading = !resHandle.ready();

  return {
    entity: PersonEntity,
    items: loading ? [] : People.find({}, {sort: [ ["name", "asc"] ] }).fetch(),
    depItems: {
    },
  };
}) (SimpleCollection);
