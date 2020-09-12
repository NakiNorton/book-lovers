import React from 'react';
import './ReadingListBook.css'
import { removeFavorite } from '../../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

const ReadingListBook = ({ title, image, id, removeFavorite }) => {
  const handleRemoveClick = (event) => {
    removeFavorite(event.target.id)
  }

  return (
    <article className='book-card'>
      <img className="card-image" alt={title} src={image} />
      <button className='remove-book' id={id} onClick={(event) => handleRemoveClick(event)}>Remove</button>
    </article>
  )
}

export const mapDispatchToProps = dispatch => (
  bindActionCreators({ removeFavorite }, dispatch)
)

export default connect(null, mapDispatchToProps)(ReadingListBook);