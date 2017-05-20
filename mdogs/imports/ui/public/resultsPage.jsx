import { Results } from '../../api/results.js';
import { Dogs } from '../../api/dogs.js';

import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

class ResultLineComponent extends Component {
  constructor(props) {
      super(props);

      this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log("Clicked " + this.props.item._id);
  }

  render() {
    const dogID = this.props.item.dogID;
    //console.log(this.props.item);
    //console.log(dogID);
    const dog = Dogs.findOne(dogID);
    if (dog != undefined)
      return (

        <tr onClick={this.handleClick}>
          <td>{dog.Name}</td>
          <td>{this.props.item.class}</td>
          <td>{this.props.item.mark}</td>
          <td>{this.props.item.place}</td>
        </tr>
      );
    else return(<tr></tr>);
  }
}

export class ResultsPublicTableView extends Component {
  constructor(props) {
      super(props);
      //console.log(props);
  }

  renderItems() {
      return this.props.results.map((item) => (
        <ResultLineComponent key={item._id} item={item} />
      ));
  }

  render() {
    return (
        <div className="row">
          <div className="col-md-12">
            <header>
                <h1>Список результатов</h1>
            </header>

            <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Кличка</th>
                    <th>Класс</th>
                    <th>Оценка</th>
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


export const ResultsPublicTable = createContainer(({ id }) => {
    return {
        results: Results.find({showID: id}).fetch(),

    };
}, ResultsPublicTableView);
