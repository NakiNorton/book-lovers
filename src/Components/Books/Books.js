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
      foundBooks: []
    }
  }

  componentDidMount() {
    fetchAllBooks()
      .then(data => {
        // console.log(data)
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
    let findBooks = this.state.books.filter(book => {
      if (book.title.includes(search) || book.author.includes(search)) {
        this.setState({foundBooks: [book]})
      }
    })
    return findBooks;
  }

  // <section className="found-book-cards" alt="found-book-cards">
  //       {this.state.foundBooks.length > 0 ?
  //         this.state.foundBooks.map(foundBook => {
  //           return <h1>{foundBook.title}</h1><h3>{foundBook.author}</h3><h3>Ranking: {foundBook.rank}</h3><img className="Book-card-image" alt="Book cover" src={book.book_image} />
  //           }) : <h1>Search For Book by Title or Author</h1>
  //        }
  //     </section>

  render() {
    let bookCards = this.displayBooks()
    return (
      <section>
        <h1>Books!</h1>
      <Search searchBooks={this.searchBooks}/>
        <div className="books-container">{this.state.books && bookCards}</div>
      </section>
    )
  }
}

export default Books;