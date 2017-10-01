import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import { Results, ResultEntity } from '../../../api/results.js';

import SimpleCollection from '../../SimpleCollection.jsx';

export default ResultsAdminTable = withTracker(() => {
  const resHandle = Meteor.subscribe('admin.results');
  const resHandle1 = Meteor.subscribe('admin.people');
  const loading = !resHandle.ready() && !resHandle1.ready();

  return {
    entity: ResultEntity,
    items: loading ? [] : Results.find({}, {sort: [ ["place", "asc"] ] }).fetch(),
    depItems: {
    },
  };
}) (SimpleCollection);


// ugly hack for sorting by date with a string representation
function simpleStringToDate(str) {
  x = str.split(".");
  d = new Date(parseInt(x[2]), parseInt(x[1]) - 1, parseInt(x[0]));
  // console.log(str, " = ", d);
  return d;
}
