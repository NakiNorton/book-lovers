import React, { Component } from 'react'
import './Books.css'
import {fetchAllBooks} from '../../API'
import Book from '../Book/Book'

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
    return <Book book={book} />
    })
  }

  render() {
    let bookCards = this.displayBooks()
    return (
      
      <section>
        <h1>Books!</h1>
        <div className="books-container">{this.state.books && bookCards}</div>
      </section>
    )
  }
}

export default Books;