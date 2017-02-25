import { Template } from 'meteor/templating';

import './result.html';

import { Results } from '../api/results.js';

Template.result.events({
    

  'click .toggle-checked'() {

  // Set the checked property to the opposite of its current value
  Results.update(this._id, {
      $set: { checked: ! this.checked },
  });
  },

'click .delete'() {

  Results.remove(this._id);

 },

});
