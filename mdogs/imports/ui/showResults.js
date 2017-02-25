import { Template } from 'meteor/templating';

import './showResults.html';
import './result.html';
import './result.js';

import { Results } from '../api/results.js';

Template.showResults.helpers({

  results() {
      return Results.find({}, { sort: { createdAt: -1 } });
  }

});


Template.showResults.events({
    'submit .new-task'(event) {

    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    // Insert a task into the collection
    Results.insert({
        text,
        createdAt: new Date(), // current time
    });

    // Clear form
    target.text.value = '';

  },


});
