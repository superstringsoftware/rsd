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

    'click .showLine'(evt) {

        curSh = parseInt(evt.currentTarget.getAttribute("data-showID"));
        Session.set("current-showID", curSh);
        //console.log(Session.get("current-showID"));
    },
});
