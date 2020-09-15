import React from 'react';
import './ReadingListBook.css'
import { removeFavorite } from '../../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ReadingListBook = ({ title, image, id, removeFavorite }) => {

  return (
    <article className='reading-list-book-card'>
      <Link to={`/${id}`}>
        <img className="card-image" alt={title} src={image} />
      </Link>
      <button className='remove-book' onClick={() => removeFavorite(id)}>Remove</button>

    </article>
  )
}

ReadingListBook.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  id: PropTypes.string,
  removeFavorite: PropTypes.func
}

export const mapDispatchToProps = dispatch => (
  bindActionCreators({ removeFavorite }, dispatch)
)

export default connect(null, mapDispatchToProps)(ReadingListBook);