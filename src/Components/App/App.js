import React, { Component } from 'react'
import './App.css';
import Books from '../Books/Books'
import Nav from '../Nav/Nav'
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Nav />
     <h1>Hiyas</h1>
     <Books />
    </div>
  );
}

export default App;
