import React, { Component } from 'react'
import './App.css';
import Books from '../Books/Books'
import Nav from '../Nav/Nav'

class App extends Component {
  constructor() {
    super();
    this.state = {
      lists: {
        'hardcover-fiction': true,
        'celebrities': true
      }
    }
  }

  createBookLists = () => {
    const lists = this.state.lists;
    const listsKeys = Object.keys(lists);
    const allBooks = listsKeys.map(list => {
      if(lists[list]) {
        return (
          <Books key={list} id={list} list={list} />
        )
      }
    })
    return allBooks
  }

  render() {
    return (
      <div className="App">
        <Nav />
        {this.createBookLists()}
      </div>
    );
  }
}

export default App;
 