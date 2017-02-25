import { Template } from 'meteor/templating';

import './showsList.html';
import './_show.html';

import { Shows } from '../../api/shows.js';

Template.showsList.helpers({

  shows() {
      res = Shows.find({}, { sort: { createdAt: -1 } });
      return res;
  }

});


Template.showsList.events({


});
