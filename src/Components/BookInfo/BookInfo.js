import React from 'react'
import './BookInfo.css'

const BookInfo = ({ book }) => {
  return (
    <section className="book-info">
      <img className="Book-card-image" alt="Book cover" src={book.book_image} />
      <div className="title-and-author">
        <h1>{book.title}</h1>
        <h3>{book.author}</h3>
      </div>
      <div className="description">
        <p>{book.description}</p>
      </div>
      <button>Add to Reading List</button>
      <a href={book.amazon_product_url} target="_blank"><button>Purchase here!</button></a>
    </section>
  )
}

export default BookInfo
