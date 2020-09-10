import React, { Component } from 'react'
import './Books.css'
import {fetchAllBooks} from '../../API'
import Book from '../Book/Book'
import Search from '../Search/Search'

class Books extends Component {
  constructor() {
    super()
    this.state = {
      books: [],
      searchedBooks: []
    }
  }

  componentDidMount() {
    fetchAllBooks()
      .then(data => {
        console.log(data)
        this.setState({books: data.results.books})
      })
      .catch(error => alert(error.message))
  }

  displayBooks() {
    return this.state.books.map(book => {
    return <Book book={book} />
    })
  }

  searchBooks = (search) => {
    console.log("HERE", search)
    // let split = search.split('')
    // console.log("split", split)
    let searchCase = search;

    let foundBooks = this.state.books.filter(book => {
      if (book.title.includes(searchCase) || book.author.includes(searchCase)) {
        this.setState({searchedBooks: book})
      }
    })
    console.log("found", this.state.searchedBooks)
    console.log("foundBooks",foundBooks)
    return foundBooks;
  }

  render() {
    let bookCards = this.displayBooks()
    return (
      <section>
        <h3>{this.state.searchedBooks}/></h3>
        <h1>Books!</h1>
        <Search searchBooks={this.searchBooks}/>
        <div className="books-container">{this.state.books && bookCards}</div>
      </section>
    )
  }
}

export default Books;