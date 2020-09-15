import React from 'react';
import ReactDOM from 'react-dom';
import './Book.css'
import '../BookInfo/BookInfo.css'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const Book = ({ book, addBook }) => {
  return (
    <section className="book-card">
        <div className="card-header">
          <h3 className="card-text">#{book.rank}</h3>

          <button id={book.primary_isbn10} onClick={addBook} className="add-to-reading-list active">Read</button>
        </div>
        <Link to={`/${book.primary_isbn10}`}>
          <img className="Book-card-image" alt={book.title} src={book.book_image} />
        </Link>
        <h1 className="card-text title-text">{book.title}</h1>
        <h4 className="card-text author-text">by {book.author}</h4>
    </section>
  )
}

Book.propTypes = {
  book: PropTypes.object,
  addBook: PropTypes.func
}

export default Book
