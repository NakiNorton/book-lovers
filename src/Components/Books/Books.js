import React, { Component } from 'react'
import './Books.css'
import { fetchAllBooks } from '../../API'
import Book from '../Book/Book'
import ReadingList from '../ReadingList/ReadingList'
import Search from '../Search/Search'
import BookInfo from '../BookInfo/BookInfo'
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import { setBooks, addFavorite } from '../../actions';
import { bindActionCreators } from 'redux';

class Books extends Component {
  constructor() {
    super()
    this.state = {
      foundBooks: [],
    }
  }

  async componentDidMount() {
    const { setBooks } = this.props;
    try {
      const books = await fetchAllBooks()
      setBooks(books.results.books)
    }
    catch ({ message }) {
      alert(message);
    }
  }

  changeButtonStyling(id) {
    const allButtons = document.querySelectorAll('.reading-list-button')
    const foundButton = Array.from(allButtons).find(button => button.id === id)
    if (foundButton.classList.contains('active')) {
      foundButton.classList.remove('active')
      foundButton.classList.add('inactive')
    } else if (foundButton.classList.contains('inactive')) {
      foundButton.classList.remove('inactive')
      foundButton.classList.add('active')
    }
  }

  handleClick = (event) => {
    const { addFavorite } = this.props;
    const id = event.target.id;
    const foundBook = this.props.books.find(book => book.primary_isbn10 === id);
    const isOnList = this.props.readingList.includes(foundBook)

    if (!isOnList) {
      addFavorite(foundBook) 
      this.changeButtonStyling(id)
    } else {
      this.changeButtonStyling(id)
    }
  }

  displayBooks() {
    return this.props.books.map(book => {
      return <Book book={book} addBook={this.handleClick} />
    })
  }

  searchBooks = (search) => {
    let findBooks = this.props.books.filter(book => {
      if (book.title.includes(search) || book.author.includes(search)) {
        this.setState({ foundBooks: [book] })
      }
    })
    console.log(this.state.foundBooks)
    return findBooks;
  }

  render() {
    const { books, readingList } = this.props
    let bookCards = this.displayBooks()
    return (
      <Switch>
        <Route exact path='/favorites' render={() =>
          <ReadingList toReadList={readingList} /> } 
        />
        <Route exact path='/'render= {() => {
          return (
            <section>
              <h1 className="browse-books">Browse Books</h1>
              <Search searchBooks={this.searchBooks}/>
              <section className="found-book-cards" alt="found-book-cards">
                { this.state.foundBooks ? 
                  this.state.foundBooks.map(foundBook => {
                    return (
                      <>
                        <h1>{foundBook.title}</h1><h3>{foundBook.author}</h3><h3>Ranking: {foundBook.rank}</h3><img className="Book-card-image" alt="Book cover" src={foundBook.book_image} /> 
                      </>
                    )
                  }) : 
                  <h1>Search For Book by Title or Author</h1>
                }
              </section>
              <div className="books-list">
                <h3 className="books-list-name">**Insert List Name**</h3>
                <div className="books-container">{books && bookCards}</div>
              </div>
            </section>
          )
        }} />
        <Route exact path='/:bookId' render={({ match }) => {
          const bookClicked = books.find((book) => book.primary_isbn10 == parseInt(match.params.bookId))
          return <BookInfo book={bookClicked} />
        }} />
      </Switch>
    )
  }
}

export const mapStateToProps = ({ books, readingList }) => ({
  books,
  readingList
})

export const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setBooks,
    addFavorite
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Books);