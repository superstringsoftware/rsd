import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

import { createContainer } from 'meteor/react-meteor-data';

//import {PeopleAdminTable, DogsAdminTable, ShowsAdminTable, ResultsAdminTable, ShowsSelection} from './AppOLD.jsx';
import { ResultsShows } from './pages/admin/ResultsShows.jsx';

import {ShowsPublicTable, ShowsPublicTableView} from './public/showsPage.jsx';

class AdminMenu extends Component {
    constructor(props) {
        super(props);
        //console.log(props);
    }

    render() {
        var ret;
        var user = this.props.user;
        //console.log(user);
        if ( (user != undefined) && (user.securityProfile != undefined) && (user.securityProfile.primaryRole === 'administrator')  ) {
          ret = <ul className="nav navbar-nav">

            <li>
              <a href="/">Результаты выставок</a>
            </li>
            <li>
              <a href="/admin/dogs">Dogs</a>
            </li>
            <li>
              <a href="/admin/people">People</a>
            </li>
              <li>
                  <a href="/admin/shows">Shows</a>
              </li>

              <li>
                  <a href="/admin/results">Results</a>
              </li>
          </ul>
        }
        else ret = <ul className="nav navbar-nav"><li>
          <a href="/">Результаты выставок</a>
        </li></ul>

        return ret;
    }
}

export const AdminMenuComponent = createContainer( ()=> {
    const user = Meteor.user();
    const userDataHandle = Meteor.subscribe('userData');
    return {
      user,
    };
}, AdminMenu);
