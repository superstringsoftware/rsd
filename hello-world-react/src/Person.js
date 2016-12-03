import React, { Component } from 'react';


class Person extends Component {
  render() {
    return (
      <tr>
          <td>{this.props.name}</td>
          <td>{this.props.city}</td>
          <td>{this.props.contact}</td>
          <td>{this.props.link}</td>
      </tr>
    );
  }
}

class PersonTable extends Component {
  render() {
    var rows=[];
    this.props.persons.forEach(function(p) {
     rows.push(<Person name={p.name} city={p.city} contact={p.contact} link={p.link} />);
   });
  console.log(rows);
    return (
      <table className="table table-striped">
        <thead>
          <tr>
          <th>Name</th>
          <th>City</th>
          <th>Contact</th>
          <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}

export {Person, PersonTable};
