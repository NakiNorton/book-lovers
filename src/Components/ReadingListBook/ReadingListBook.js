import React from 'react';
import './ReadingListBook.css'
import { removeFavorite } from '../../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

const ReadingListBook = ({ title, image, id, removeFavorite }) => {

  return (
    <article className='reading-list-book-card'>
      <img className="card-image" alt={title} src={image} />
      <button className='remove-book' onClick={() => removeFavorite(id)}>Remove</button>
    </article>
  )
}

export const mapDispatchToProps = dispatch => (
  bindActionCreators({ removeFavorite }, dispatch)
)

export default connect(null, mapDispatchToProps)(ReadingListBook);