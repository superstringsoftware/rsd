import { Template } from 'meteor/templating';

import './resultList.html';
import './_result.html';

import { Results } from '../../api/results.js';

Template.resultList.helpers({

  results() {
      res = Results.find({}, { sort: { createdAt: -1 } });
      console.log(res);
      return res;
  }

});


Template.resultList.events({


});
