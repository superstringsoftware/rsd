import { Dogs } from '../imports/api/dogs.js';

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import { DogsAdminTable, PeopleAdminTable } from '../imports/ui/App.jsx';
import AdminMenu from '../imports/ui/AdminMenu.jsx';

Meteor.startup(() => {
  render(<PeopleAdminTable />, document.getElementById('render-target'));
  render(<AdminMenu />, document.getElementById('admin-menu'));
});
