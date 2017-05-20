import { Shows } from '../../api/shows.js';

import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

export class ShowsPublicTableView extends Component {
  constructor(props) {
      super(props);
      console.log(props);
  }

  renderItems() {
      return this.props.shows.map((item) => (
          <tr key={item._id}>
            <td>{item.date}</td>
            <td>{item.name}</td>
            <td>{item.place}</td>
          </tr>
      ));
  }

  render() {
    return (
        <div className="row">
          <div className="col-md-12">
            <header>
                <h1>Список выставок с результатами</h1>
            </header>

            <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Название</th>
                    <th>Место</th>
                  </tr>
                </thead>
                <tbody>
                    {this.renderItems()}
                </tbody>
            </table>
          </div>
        </div>
    );
  }
}


export const ShowsPublicTable = createContainer(() => {
    return {
        shows: Shows.find({}, {sort: [ ["name", "asc"] ] }).fetch(),

    };
}, ShowsPublicTableView);
