import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Person, PersonTable} from './Person';

const testPeople = [
  {name: 'Anton', city: 'Zug', contact: 'aantich@gmail.com', link: ''},
  {name: 'Maria', city: 'Moscow', contact: '', link: 'http://google.com'}
];

class App extends Component {
  render() {
    return (
        <div>
        <h1>
          Hello
        </h1>
        <PersonTable persons={testPeople} />
        </div>

    );
  }
}

export default App;
