import React from 'react';
import { connect } from 'react-redux'
import ReadingListBook from '../ReadingListBook/ReadingListBook'
import './ReadingList.css'

const ReadingList = ({ toReadList }) => {

  const booksToRead = toReadList.map(book => {
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
      {toReadList.length === 0 &&
      <section>
        <h3 className='no-books-msg'>You haven't added any books to your reading list yet. </h3>
        <div className='ani-container'>
          <div className='tear1 tear'></div>
          <div className='tear2 tear'></div>
          <div className='face'>
            <div className='eyebrow'>︶</div>
            <div className='eyebrow'>︶</div>
            <div className='eye'></div>
            <div className='eye'></div>
            <div className='mouth'></div>
          </div>
        </div> 
        </section>
        }
      <section className="reading-list-section">
        {booksToRead}
      </section>
    </section>
  )
}

export default ReadingList