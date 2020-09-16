import React from 'react';
import { connect } from 'react-redux'
import ReadingListBook from '../ReadingListBook/ReadingListBook'
import './ReadingList.css'
import PropTypes from 'prop-types'

const ReadingList = ({ readingList }) => {

  const booksToRead = readingList.map(book => {
    return <ReadingListBook
      title={book.title}
      image={book.book_image}
      id={book.primary_isbn10}
      key={book.primary_isbn10}
    />
  })

  return (
    <section className='ReadingList'>
      <h1 className='page-title'>My Library</h1>
      {readingList.length === 0 &&
      <section>
        <h3 className='no-books-msg'>You haven't added any books to your reading list yet. </h3>
        <section aria-label='animation of crying face'
        className='ani-container'>
          <div className='tear1 tear'></div>
          <div className='tear2 tear'></div>
          <div className='face'>
            <div className='eyebrow'>︶</div>
            <div className='eyebrow'>︶</div>
            <div className='eye'></div>
            <div className='eye'></div>
            <div className='mouth'></div>
          </div>
        </section> 
        </section>
      }
      <section className="reading-list-section">
        {booksToRead}
      </section>
    </section>
  )
}

ReadingList.propTypes = {
  readingList: PropTypes.array
}

export const mapStateToProps = ({ readingList }) => ({
  readingList
})

export default connect(mapStateToProps)(ReadingList);