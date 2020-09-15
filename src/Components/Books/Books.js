import React, { Component } from 'react'
import './Books.css'
import { fetchBooks } from '../../API'
import Book from '../Book/Book'
import PropTypes from 'prop-types';

import BookInfo from '../BookInfo/BookInfo'
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import { setBooks, addFavorite, setList } from '../../actions';
import { bindActionCreators } from 'redux';

class Books extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      foundBooks: [],
    }
  }

  componentDidMount() {
    this.setState({ books: this.props.filteredBooks })
  }

  componentDidUpdate(prevProps) {
    if(this.props.filteredBooks !== prevProps.filteredBooks) {
      this.setState({ books: this.props.filteredBooks })
    }
  }

  displayBooks() {
    return this.state.books.map(book => {
      return <Book book={book} addBook={this.handleClick}/>
    })
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
    const { addFavorite, readingList, books } = this.props;
    const id = event.target.id;
    const foundBook = books.find(book => book.primary_isbn10 === id);
    const isOnList = readingList.includes(foundBook)

    if (!isOnList) {
      addFavorite(foundBook) 
      this.changeButtonStyling(id)
    } else {
      this.changeButtonStyling(id)
    }
  }

  render() {
    const { books } = this.props
    let bookCards = this.displayBooks()
    console.log(bookCards)
    return (
      <section>
        <div className="books-list">
          <h3 className="books-list-name">{this.props.id}</h3>
          <div className="books-container">{books && bookCards}</div>
        </div>
      </section>
    )
  }
}

Books.propTypes = {
  readingList: PropTypes.array,
  books: PropTypes.array,
  lists: PropTypes.array,
  filteredBooks: PropTypes.array,
}

export const mapStateToProps = ({ books, lists, readingList }) => ({
  books,
  lists,
  readingList
})

export const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setBooks,
    addFavorite,
    setList
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Books);