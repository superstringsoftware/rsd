import { Meteor } from 'meteor/meteor';

import { Shows } from '../imports/api/shows.js';
import { Results } from '../imports/api/results.js';
import { Dogs } from '../imports/api/dogs.js';
import { People } from '../imports/api/people.js';


Meteor.startup(() => {
  // code to run on server at startup
  Meteor.publish('userData', function() {
    return Meteor.users.find ({}, { fields: {securityProfile: 1} });
  })
});

// publishing all shows
Meteor.publish('shows.all', function() {
  return Shows.find({});
});

// publishing all dogs for admin
Meteor.publish('admin.dogs', function() {
  return Dogs.find({});
});


// this is publishing a custom Collection 'PublicResults' with results combined with dog names
Meteor.publish('results.public', function(id) {
  const results = Results.find({showID: id}, {sort: [ ["class", "asc"], ["place", "asc"] ] }).fetch();

  _self = this;
  results.forEach( function (res, index) {
    var dog = Dogs.findOne(res.dogID);
    //console.log(dog);
    if (dog != undefined) {
      res.dogName = dog.Name;
      res.dogSex = dog.sex;
      _self.added('PublicResults', res._id, res);
      //console.log("Added: ", res);
    }
  });

  this.ready();
  //console.log("results.public is ready");
});

// publishing information on a specific dog, combining with owners etc
Meteor.publish('dogInfo', function(id) {
  const dog = Dogs.findOne({_id: id});
  return [
    Dogs.find({_id: {$in: [id, dog.fatherID, dog.motherID]}}),
    People.find({_id: {$in: [dog.breederID, dog.cobreederID, dog.ownerID, dog.coOwnerID]}})
  ];
  //console.log(dog);

});
