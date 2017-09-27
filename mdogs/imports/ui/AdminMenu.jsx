import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

import { createContainer } from 'meteor/react-meteor-data';

import {PeopleAdminTable, DogsAdminTable, ShowsAdminTable, ResultsAdminTable, ShowsSelection} from './AppOLD.jsx';
import { ResultsShows } from './ResultsShows.jsx';

import {ShowsPublicTable, ShowsPublicTableView} from './public/showsPage.jsx';

class AdminMenu extends Component {
    constructor(props) {
        super(props);
        //console.log(props);
    }

    showPublicShows(event) {
        render(<ShowsPublicTable />, document.getElementById('render-target'));
    }

    showPeople(event) {
        render(<PeopleAdminTable />, document.getElementById('render-target'));
    }

    showDogs(event) {
        render(<DogsAdminTable />, document.getElementById('render-target'));
    }

    showShows(event) {
        render(<ShowsAdminTable />, document.getElementById('render-target'));
    }

    showResults(event) {
        render(<ShowsSelection />, document.getElementById('render-target'));
    }

    render() {
        var ret;
        var user = this.props.user;
        //console.log(user);
        if ( (user != undefined) && (user.securityProfile != undefined) && (user.securityProfile.primaryRole === 'administrator')  ) {
          ret = <ul className="nav navbar-nav">
            <li>
              <a href="#" onClick={this.showPublicShows}>Результаты выставок</a>
            </li>
            <li>
              <a href="#" onClick={this.showDogs}>Dogs</a>
            </li>
            <li>
              <a href="#" onClick={this.showPeople}>People</a>
            </li>
              <li>
                  <a href="#" onClick={this.showShows}>Shows</a>
              </li>

              <li>
                  <a href="#" onClick={this.showResults}>Results</a>
              </li>
          </ul>
        }
        else ret = <ul className="nav navbar-nav"><li>
          <a href="#" onClick={this.showPublicShows}>Результаты выставок</a>
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
