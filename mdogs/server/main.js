import { Meteor } from 'meteor/meteor';
import '../imports/api/results.js';
import '../imports/api/shows.js';
import '../imports/api/dogs.js';
import '../imports/api/people.js';

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.publish('userData', function() {
    return Meteor.users.find ({}, { fields: {securityProfile: 1} });
  }

)
});
