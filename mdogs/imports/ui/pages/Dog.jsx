
import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import { Dogs } from '../../api/dogs.js';
import { People } from '../../api/people.js';

class SimpleDog extends Component {
  constructor(props) {
      super(props);
      //console.log("Initializing One Dog page");
      //console.log(props);
  }

  render() {
    var dog = Dogs.findOne({_id: this.props.id});
    //console.log(dog);
    if (!dog) dog = {};
    return (<a href={'/dogs/' + this.props.id}>{dog.Name}</a>);
  }
}

class DogPage extends Component {
  constructor(props) {
      super(props);
      //console.log("Initializing One Dog page");
      //console.log(props);
  }

  render() {
    //console.log("Rendering results");
    //console.log(this.props);
    var dog = Dogs.findOne({_id: this.props.id});
    //console.log(dog);
    if (!dog) dog = {};
    return (

      <div className="content">

        <div className="row">

          <div className="col-md-4 col-md-offset-2">
            <div className="bs-component">
              <div className="panel panel-info">
                <div className="panel-heading">
                  <h3 className="panel-title">отец</h3>
                </div>
                <div className="panel-body">
                  <SimpleDog id={dog.fatherID} />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="bs-comonent">
              <div className="panel panel-danger">
                <div className="panel-heading">
                  <h3 className="panel-title">мать</h3>
                </div>
                <div className="panel-body">
                  <SimpleDog id={dog.motherID} />
                </div>
              </div>


            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <div className="panel panel-default">
              <div className="panel-heading"><strong>{dog.Name}</strong></div>
              <div className="panel-body">
                окрас: {dog.color} <br/>
                пол: {dog.sex} <br/>
                дата рождения: {dog.dob}
              </div>
            </div>
          </div>
        </div>
      </div>



    );
  }
}


// Ok, we have to build a pretty complex thing here because need to sort results
// first by sex, then by class
export const DogPageComponent = withTracker((params) => {
    const id = params.match.params.id;
    var mid = new Mongo.ObjectID(id); // need this due to mess with ObjectIDs vs Strings
    //console.log("Running results with id ", mid);
    const resHandle = Meteor.subscribe('dogInfo', mid);
    const loading = !resHandle.ready();

  return {
    dogs: loading ? [] : Dogs.find({}).fetch(),
    people: loading ? [] : People.find({}).fetch(),
    id: mid
  };


}) (DogPage);
