import React from 'react';
import ReactDOM from 'react-dom';
import './Book.css'
import { Link } from 'react-router-dom';


const Book = ({ book, addBook }) => {
  return (
    <section className="book-card-section">
        <h1>{book.title}</h1>
        <h3>{book.author}</h3>
        <h3>Ranking: {book.rank}</h3>
        <Link to={`/${book.primary_isbn10}`}>
          <img className="Book-card-image" alt={book.title} src={book.book_image} />
        </Link>
        <button id={book.primary_isbn10} onClick={addBook} className="reading-list-button active">
          Reading List
        </button>
    </section>
  )
}

export default Book
