import React from 'react'
import './BookInfo.css'
import { Link } from 'react-router-dom';

const BookInfo = ({ book }) => {
  return (
    <section className="book-info">
      <img className="book-image" alt={book.title} src={book.book_image} />
      <div className="title-and-author text-box">
        <h1>{book.title}</h1>
        <h3>{book.author}</h3>
      </div>
      <div className="description text-box">
        <p>{book.description}</p>
      </div>
      <div className="button-container">
        <button className="add-to-reading-list">Read</button>
        <a href={book.amazon_product_url} target="_blank"><button className="purchase">Purchase</button></a>
      </div>
    </section>
  )
}

export default BookInfo
