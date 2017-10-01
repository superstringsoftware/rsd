import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import { Shows, ShowEntity } from '../../../api/shows.js';

import SimpleCollection from '../../SimpleCollection.jsx';

export default ShowsAdminTable = withTracker(() => {
  const resHandle = Meteor.subscribe('admin.shows');
  const resHandle1 = Meteor.subscribe('admin.people');
  const loading = !resHandle.ready() && !resHandle1.ready();

  return {
    entity: ShowEntity,
    items: loading ? [] : (Shows.find({}).fetch()).sort( function(a,b) {
        if (simpleStringToDate(a.date) > simpleStringToDate(b.date)) return -1;
        else if (simpleStringToDate(a.date) < simpleStringToDate(b.date)) return 1;
             else return 0;
    }),
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
