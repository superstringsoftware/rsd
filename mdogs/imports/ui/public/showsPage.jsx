import { Shows } from '../../api/shows.js';

import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import {ResultsPublicTable} from './resultsPage.jsx';

class ShowLineComponent extends Component {
  constructor(props) {
      super(props);

      this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    //id = new Mongo.ObjectID(this.props.item._id);
    id = this.props.item._id;

    //console.log(id);
    render(<ResultsPublicTable id={id} />, document.getElementById('render-target'));
  }

  render() {
    return (
      <tr onClick={this.handleClick}>
        <td>{this.props.item.date}</td>
        <td>{this.props.item.rank}</td>
        <td>{this.props.item.name}</td>
        <td>{this.props.item.organizer}</td>

      </tr>
    );
  }
}

export class ShowsPublicTableView extends Component {
  constructor(props) {
      super(props);
      //console.log(props);
  }

  renderItems() {
      return this.props.shows.map((item) => (
        <ShowLineComponent key={item._id} item={item} />
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
                    <th>Ранг</th>
                    <th>Название</th>
                    <th>Организатор</th>
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
