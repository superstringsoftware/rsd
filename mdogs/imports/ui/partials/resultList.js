import { Template } from 'meteor/templating';

import './resultList.html';
import './_result.html';

import { Results } from '../../api/results.js';

Template.resultList.helpers({

  results() {
      var tt = Session.get("current-showID");
      //console.log ("Session is " + tt + " and type is " + (typeof tt));
      res = Results.find({"showID": tt}, { sort: { createdAt: -1 } });
      //console.log(res);
      return res;
  }

});


Template.resultList.events({

    'click .resultLine'(evt) {

        let curDog = parseInt(evt.currentTarget.getAttribute("data-dogID"));
        Session.set("current-dogID", curDog);

        //curSh = Shows.findOne{}

        FlowRouter.go('showDogRoute', { _id: curDog });
        //console.log(Session.get("current-dogID"));
    },

});
