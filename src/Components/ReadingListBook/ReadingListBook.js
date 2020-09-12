import React from 'react';
import './ReadingListBook.css'

const ReadingListBook = ({ title, image, id, removeBook }) => {

  return (
    <article className='book-card'>
      <img className="card-image" alt={title} src={image} />
      <button className='remove-book' id={id} onClick={removeBook}>Remove</button>
    </article>
  )
}

export default ReadingListBook