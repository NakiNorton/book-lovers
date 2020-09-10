import React, { Component } from 'react'
import './Books.css'
import {fetchAllBooks} from '../../API'
import Book from '../Book/Book'
import BookInfo from '../BookInfo/BookInfo'
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'

class Books extends Component {
  constructor() {
    super()
    this.state = {
      // books: [],
      toReadList: [],
    }
  }
  // async componentDidMount() {
  //   try{
  //     const books = await fetchAllBooks()
  //     console.log(books.results.books)
  //     setBooks(books.results.books)
  //   }
  //   catch (error) {
  //     alert(error)
  //   }
  // }

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
    return this.props.books.map(book => { 
      return <Book book={book} addBook={this.handleClick}/>
    })
  }

  render() {
    const { books } = this.props
    let bookCards = this.displayBooks()
    return (
      <Switch>
        <Route
          exact
          path='/'
          render= {() => {
            return <section>
                <h1>Books!</h1>
                <div className="books-container">{this.state.books && bookCards}</div>
              </section>
          }}
        />
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
    )
  }
}

export const mapStateToProps = ({ books }) => ({
  books
})

export default connect(mapStateToProps)(Books);
