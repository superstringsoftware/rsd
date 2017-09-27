import { Meteor } from 'meteor/meteor';

import { Shows } from '../imports/api/shows.js';

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.publish('userData', function() {
    return Meteor.users.find ({}, { fields: {securityProfile: 1} });
  })
});

Meteor.publish('shows.all', function() {
  return Shows.find({});
});
