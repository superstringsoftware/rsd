import { Results } from '../../api/results.js';
import { Dogs } from '../../api/dogs.js';
import { Shows } from '../../api/shows.js';

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
    if (dog != undefined) {
      mark = "";
      if (this.props.item.mark != "--?--") mark = this.props.item.mark;
      place = "";
      if (this.props.item.place != "--?--") place = this.props.item.place;
      certificate = "";
      if (this.props.item.certificate != "--?--") certificate = this.props.item.certificate;
      // results ugly hack
      result = "";
      if (this.props.item.ageResult != "--?--") result += this.props.item.ageResult;
      if ( (this.props.item.breedResult != "--?--") && (this.props.item.breedResult.length > 0) )
        if (result.length > 0) result += ", " + this.props.item.breedResult;
        else result += this.props.item.breedResult;
      if ( (this.props.item.groupResult != "--?--") && (this.props.item.groupResult.length > 0) )
        if (result.length > 0) result += ", " + this.props.item.groupResult;
        else result += this.props.item.groupResult;
      if ( (this.props.item.bisResult != "--?--") && (this.props.item.bisResult.length > 0) )
        if (result.length > 0) result += ", " + this.props.item.bisResult;
        else result += this.props.item.bisResult;

      return (

        <tr onClick={this.handleClick}>
          <td>{this.props.item.dogName}</td>
          <td>{this.props.item.class}</td>
          <td>{mark}</td>
          <td>{place}</td>
          <td>{certificate}</td>
          <td>
            {result}
          </td>
        </tr>
      ); }
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
            <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Кличка</th>
                    <th>Класс</th>
                    <th>Оценка</th>
                    <th>Место</th>
                    <th>Сертификат</th>
                    <th>Итоговый результат</th>
                  </tr>
                </thead>
                <tbody>
                    {this.renderItems()}
                </tbody>
            </table>

    );
  }
}

// Ok, we have to build a pretty complex thing here because need to sort results
// first by sex, then by class
export const ResultsPublicTable = createContainer(({ id, sex }) => {
    const results = Results.find({showID: id}, {sort: [ ["class", "asc"], ["place", "asc"] ] }).fetch();
    var boys = [];
    results.forEach( function (res, index) {
      var dog = Dogs.findOne(res.dogID);
      //console.log(dog);
      if (dog != undefined) {
        res.dogName = dog.Name;
        if (dog.sex == sex) boys.push(res);
      }
    });

    return {
        results: boys,
        show: Shows.findOne(id)

    };
}, ResultsPublicTableView);
