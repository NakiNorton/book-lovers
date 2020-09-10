import React, { Component } from 'react'
import './App.css';
import Books from '../Books/Books'
import Nav from '../Nav/Nav'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom';
import { setBooks } from '../../actions';
import {fetchAllBooks} from '../../API';
import { bindActionCreators } from 'redux';

class App extends Component {
  async componentDidMount() {
    const { setBooks } = this.props;
    try {
      const books = await fetchAllBooks()
      console.log(books.results.books)
      console.log(setBooks)
      setBooks(books.results.books)
    }
    catch ({ message }) {
      alert(message);
    }
  }

  render() {
    return (
      <div className="App">
        <Nav />
       <h1>Hiyas</h1>
       <Books />
      </div>
    );
  }
}

export const mapStateToProps = ({ books }) => ({
  books,
})

export const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setBooks
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(App);
 