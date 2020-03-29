import React, { Component } from 'react';
import  FirstComponent from './Components/learning-examples/FirstComponent';
import  SecondComponent from './Components/learning-examples/SecondComponent';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello world
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <FirstComponent />
        <SecondComponent />
      </header>
    </div>
  );
}

export default App;
