import React, { Component } from 'react'
import './Books.css'
import {fetchAllBooks} from '../../API'
import Book from '../Book/Book'
import Search from '../Search/Search'
import BookInfo from '../BookInfo/BookInfo'
import { Route, Switch } from 'react-router-dom';

class Books extends Component {
  constructor() {
    super()
    this.state = {
      books: [],
      foundBooks: [],
      toReadList: [],
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

  changeButtonStyling(id) {
    const allButtons = document.querySelectorAll('.reading-list-button')
    const foundButton = Array.from(allButtons).find(button => button.id === id)
    if(foundButton.classList.contains('active')) {
      foundButton.classList.remove('active')
      foundButton.classList.add('inactive')
    } else if (foundButton.classList.contains('inactive')) {
      foundButton.classList.remove('inactive')
      foundButton.classList.add('active')
    }
  }

  handleClick = (event) => {
    const id = event.target.id;
    const foundBook = this.state.books.find(book => book.primary_isbn10 === id);
    const isOnList = this.state.toReadList.includes(foundBook)

    if(!isOnList) {
      this.setState( { toReadList: [...this.state.toReadList, foundBook] } )
      this.changeButtonStyling(id)
    } else {
      const newList = this.state.toReadList.filter(book => book !== foundBook)
      this.setState( { toReadList: newList } )
      this.changeButtonStyling(id)
    }
  }

  displayBooks() {
    return this.state.books.map(book => { 
      return <Book book={book} addBook={this.handleClick}/>
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
      <Switch>
        <Route exact path='/'render= {() => {
            return (
            <section>
              <h1>Books!</h1>
              <Search searchBooks={this.searchBooks}/>
              <div className="books-container">{this.state.books && bookCards}</div>
            </section>
            )
          }
          }
        />
        <Route path='/:bookId' render={({ match }) => {
            const bookClicked = this.state.books.find((book) => book.primary_isbn10 == parseInt(match.params.bookId))
            console.log(match.params.bookId)
            console.log(bookClicked)
            return <BookInfo book={bookClicked} />
          }}
        />
      </Switch>
    )
  }
}

export default Books;
