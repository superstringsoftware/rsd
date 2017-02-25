import { Template } from 'meteor/templating';

import '../imports/ui/body.js';
import { Dogs } from '../imports/api/dogs.js';

Template.registerHelper("dogNameFromID",
  (dogID) => {
      //console.log ( (typeof dogID) + " " + dogID)
      let dg = Dogs.findOne({"ID": dogID});
      //console.dir(dg);
      return dg.Name;
 });
