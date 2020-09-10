import React from 'react';
import ReactDOM from 'react-dom';
import './Book.css'


const Book = ({book}) => {
  return (
    <section>
      <h1>{book.rank}</h1>
    </section>
  )
}

export default Book