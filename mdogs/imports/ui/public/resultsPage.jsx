//import { Results } from '../../api/results.js';
import { Dogs } from '../../api/dogs.js';
import { Shows } from '../../api/shows.js';

import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

class ResultLineComponent extends Component {
  constructor(props) {
      super(props);

      this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log("Clicked " + this.props.item._id);
  }

  render() {
    //console.log("Rendering item!");
    //const dogID = this.props.item.dogID;
    //console.log(this.props.item);
    //console.log(dogID);

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
    );

  }
}

export class ResultsPublicTableView extends Component {
  constructor(props) {
      super(props);
      //console.log("Initializing results table");
      //console.log(props);
  }

  renderItems() {
      return this.props.results.map((item) => (
        <ResultLineComponent key={item._id} item={item} />
      ));
  }

  render() {
    //console.log("Rendering results");
    //console.log(this.props);
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


const Results = new Mongo.Collection('PublicResults');

// Ok, we have to build a pretty complex thing here because need to sort results
// first by sex, then by class
export const ResultsPublicTable = withTracker(({ id, sex }) => {
    var mid = new Mongo.ObjectID(id); // need this due to mess with ObjectIDs vs Strings
    //console.log("Running results with id ", mid);
    const resHandle = Meteor.subscribe('results.public', mid);
    const loading = !resHandle.ready();

    if (!loading) {
      //console.log("Sub is ready! loading...");
      const results = Results.find({}).fetch();
      //console.log(results);
      var boys = [];
      results.forEach( function (res, index) {
        //console.log(res);
        if (res.dogSex == sex) boys.push(res);
      });

      //console.log("Results:");
      //console.log(boys);
      return {
          results: boys,
          show: Shows.findOne(mid)

      };
    }
    else return {results: []};


}) (ResultsPublicTableView);
