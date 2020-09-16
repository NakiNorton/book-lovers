import React from 'react'
import './BookInfo.css'
import PropTypes from 'prop-types'

const BookInfo = ({ book, addBook }) => {
  return (
    <>
      <h1 className="book-details">Book Details</h1>
      <section className="book-info">
        <img className="book-image" alt={book.title} src={book.book_image} />
        <div className="title-and-author text-box">
          <h1>{book.title}</h1>
          <h3>{book.author}</h3>
        </div>
        <div className="description text-box">
          <p className="desciption-text">{book.description}</p>
        </div>
        <div className="button-container">
          <button className="add-to-reading-list active" id={book.primary_isbn10} onClick={addBook}>Read</button>
          <a href={book.amazon_product_url} target="_blank" className=""><button className="purchase">Purchase</button></a>
        </div>
      </section>
    </>
  )
}

BookInfo.propTypes = {
  book: PropTypes.object
}

export default BookInfo
