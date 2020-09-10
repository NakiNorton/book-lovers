import React from 'react';
import ReactDOM from 'react-dom';
import './Book.css'


const Book = ({book}) => {
  return (
    <section class="book-card-section">
        <h1>{book.title}</h1>
        <h3>{book.author}</h3>
        <h3>Ranking: {book.rank}</h3>
        <img className="Book-card-image" alt="Book cover" src={book.book_image} />
    </section>
  )
}

export default Book