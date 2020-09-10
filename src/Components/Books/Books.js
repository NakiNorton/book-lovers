import React, { Component } from 'react'
import './Books.css'
import {fetchAllBooks} from '../../API'
import Book from '../Book/Book'

class Books extends Component {
  constructor() {
    super()
    this.state = {
      books: [],
      toReadList: [],
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

  handleClick = (event) => {
    const id = event.target.id;
    const foundBook = this.state.books.find(book => book.primary_isbn10 === id);
    const isFavorite = this.state.toReadList.includes(foundBook)

    if(!isFavorite) {
      this.setState( { toReadList: [...this.state.toReadList, foundBook] } )
    } else {
      const newList = this.state.toReadList.filter(book => book !== foundBook)
      this.setState( { toReadList: newList } )
    }
  }

  displayBooks() {
    return this.state.books.map(book => {
    return <Book book={book} addBook={this.handleClick} />
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