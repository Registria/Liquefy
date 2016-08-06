import React, { Component } from 'react';
import LiquidAnalyzer from './LiquidAnalyzer'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Liquefy</h2>
        </div>
        <LiquidAnalyzer />
      </div>
    );
  }
}

export default App;
