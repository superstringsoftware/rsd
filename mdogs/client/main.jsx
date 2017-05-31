import { Dogs } from '../imports/api/dogs.js';

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import { DogsAdminTable, PeopleAdminTable } from '../imports/ui/App.jsx';
import { AdminMenu, AdminMenuComponent } from '../imports/ui/AdminMenu.jsx';
import {ShowsPublicTable} from '../imports/ui/public/showsPage.jsx';

Meteor.startup(() => {
  render(<ShowsPublicTable />, document.getElementById('render-target'));
  render(<AdminMenuComponent />, document.getElementById('admin-menu'));

  //Meteor.subscribe('userData');
});
