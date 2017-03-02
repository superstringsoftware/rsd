import { Template } from 'meteor/templating';

import '../imports/ui/body.js';
import { Dogs } from '../imports/api/dogs.js';

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../imports/ui/App.jsx';
import ShowsUI from '../imports/ui/ShowsUI.jsx'

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});

Template.registerHelper("dogNameFromID",
  (dogID) => {
      //console.log ( (typeof dogID) + " " + dogID)
      let dg = Dogs.findOne({"ID": dogID});
      //console.dir(dg);
      return dg.Name;
 });


Template.registerHelper("dogFromID",
   (dogID) => {
       //console.log ( (typeof dogID) + " " + dogID)
       return Dogs.findOne({"ID": dogID});
});

Template.registerHelper("getCurrentDog",
    () => {
        dogID = Session.get("current-dogID");
        return Dogs.findOne({"ID": dogID});
});
