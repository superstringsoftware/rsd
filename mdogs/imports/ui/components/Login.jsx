
import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

import { Meteor } from 'meteor/meteor'

export default class LoginComponent extends Component {
  constructor(props) {
      super(props);
      //console.log("Initializing One Dog page");
      //console.log(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleLogout = this.handleLogout.bind(this);
  }

  handleSubmit(event) {
    //console.log(this);
    //alert('A name was submitted: ' + this.input.value + ' pwd: ' + this.pswd.value);
    event.preventDefault();
    Meteor.loginWithPassword(this.input.value, this.pswd.value);

  }

  handleLogout(event) {
    //console.log(this);
    Meteor.logout();

  }


  render() {
    //console.log("Rendering results");
    const u = Meteor.user();
    //console.log(u);
    return (

        <div className="content">

          <div className="row">
            <div className="col-md-8 col-md-offset-2">

              <form onSubmit={this.handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="inputEmail4" className="col-form-label">Email</label>
              <input type="email" className="form-control" id="inputEmail4" placeholder="Email"  ref={(input) => this.input = input} />

            </div>
            <div className="form-group col-md-6">
              <label for="inputPassword4" className="col-form-label">Password</label>
              <input type="password" className="form-control" id="inputPassword4" placeholder="Password"  ref={(pswd) => this.pswd = pswd} />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">Sign in</button>
          <button type="submit" className="btn btn-danger" onClick={this.handleLogout}>Sign out</button>
        </form>


            </div>
          </div>
        </div>

      )


  }
}
