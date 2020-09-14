import React, { Component } from 'react'
import './App.css';
import Books from '../Books/Books'
import Nav from '../Nav/Nav'
import { fetchBooks } from '../../API';
import { connect } from 'react-redux'
import { setBooks, setList } from '../../actions';
import { bindActionCreators } from 'redux';

class App extends Component {
  constructor() {
    super();
    this.state = {
      lists: {
        'celebrities': true,
        'food-and-fitness': true,
        'hardcover-fiction': true,
        'games-and-activities': true,
        'health': true,
      }
    }
  }

  componentDidMount() {
    const { setBooks, setList } = this.props
    const allListUrls = Object.keys(this.state.lists)
    try {
      allListUrls.map(async url => {
        const response = await fetchBooks(url);
        setBooks(response.results.books);
        const books = response.results.books;
        console.log('books after setBooks', books)
        return setList(url, books.map(book => book.primary_isbn10));
      })
    }
    catch ({ message }) {
      alert(message)
    }
  }

  filterBooks = (listName) => {
    const listOfIds = this.props.lists[listName]
    const filteredBooks = this.props.books.filter(book => listOfIds.includes(book.primary_isbn10))
    console.log('filtered books from filterBooks', filteredBooks)
    return filteredBooks;
  }

  createBookLists = () => {
    const listUrls = this.props.lists;
    const listsKeys = Object.keys(listUrls);
    const listBooks = listsKeys.map(listName => {
      const filteredBooks = this.filterBooks(listName)
      console.log('filtered books from createBookLists', filteredBooks)
      if(filteredBooks.length > 0) {
        return (
          <Books key={listName} id={listName} listName={listName} filteredBooks={filteredBooks}/>
        )
      }
    })
    return listBooks
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

export const mapStateToProps = ({ books, lists }) => ({
  books,
  lists
})

export const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setBooks,
    setList
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(App);
 