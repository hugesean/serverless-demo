import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Characters from './components/characters/Characters.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Characters {...this.props}/>
      </div>
    );
  }
}

export default App;
