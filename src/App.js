import React, { Component } from 'react';
import './App.css';
import Board from './components/Board'


class App extends Component {
  render() {
    return (
      <div className="App">
          <Board length="10" width="10"/>
      </div>
    );
  }
}

export default App;
