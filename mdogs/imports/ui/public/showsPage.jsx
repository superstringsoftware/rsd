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
    render(<TotalResultsTable id={id} />, document.getElementById('render-target'));
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

class TotalResultsTable extends Component {
  constructor(props) {
      super(props);
      //console.log(props);
  }

  showPublicShows(event) {
      render(<ShowsPublicTable />, document.getElementById('render-target'));
  }

  render() {
    return (
      <div>
      <div className="row">
        <div className="col-md-12">
          <a href="#" onClick={this.showPublicShows}>Назад к списку выставок</a>
          <header>
              <h4>Кобели</h4>
          </header>
          <ResultsPublicTable id={this.props.id} sex='male' />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <header>
              <h4>Суки</h4>
          </header>
          <ResultsPublicTable id={this.props.id} sex='female' />
        </div>
      </div>
    </div>

    )
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
                <h3>Список выставок с результатами</h3>
                <p>кликните на выставке для просмотра результатов</p>
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
