import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

import {PeopleAdminTable, DogsAdminTable} from './App.jsx';

export default class AdminMenu extends Component {
    constructor(props) {
        super(props);
    }

    showPeople(event) {
        render(<PeopleAdminTable />, document.getElementById('render-target'));
    }

    showDogs(event) {
        render(<DogsAdminTable />, document.getElementById('render-target'));
    }

    render() {

        return (
            <ul className="nav navbar-nav">
              <li>
                <a href="#" onClick={this.showDogs}>Dogs</a>
              </li>
              <li>
                <a href="#" onClick={this.showPeople}>People</a>
              </li>
            </ul>
        );
    }
}
