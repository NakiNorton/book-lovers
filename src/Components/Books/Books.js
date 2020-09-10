import React, { Component } from 'react'
import './Books.css'
import {fetchAllBooks} from '../../API'
import Book from '../Book/Book'
import BookInfo from '../BookInfo/BookInfo'
import { Route, Switch } from 'react-router-dom';

class Books extends Component {
  constructor() {
    super()
    this.state = {
      books: []
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
      console.log(book.primary_isbn10)
    return <Book book={book} />
    })
  }

  render() {
    let bookCards = this.displayBooks()
    return (
      <section>
        <h1>Books!</h1>
        <div className="books-container">{this.state.books && bookCards}</div>
        <Switch>
          <Route
            path='/:bookId'
            render={({ match }) => {
              const bookClicked = this.state.books.find((book) => book.primary_isbn10 == parseInt(match.params.bookId))
              console.log(match.params.bookId)
              console.log(bookClicked)
              return <BookInfo book={bookClicked} />
            }}
          />
        </Switch>
      </section>
    )
  }
}

export default Books;
