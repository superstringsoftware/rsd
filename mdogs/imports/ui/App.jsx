import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Shows } from '../api/shows.js';
import Show from './Show.jsx';

// App component - represents the whole app
class App extends Component {

    constructor(props) {
      super(props);
      this.state = {tableClass: "table table-striped table-hover"};
    }

  renderShows() {
      return this.props.shows.map((show) => (
        <Show key={show._id} show={show} />
      ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
        </header>

        <table className={this.state.tableClass}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Organizer</th>
                    <th>Date</th>
                    <th>Place</th>
                </tr>
            </thead>
            <tbody>
                {this.renderShows()}
            </tbody>
        </table>

      </div>
    );
  }
}


export default createContainer(() => {
  return {
    shows: Shows.find({}).fetch(),
  };
}, App);
