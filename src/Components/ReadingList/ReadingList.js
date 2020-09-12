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
          <div class='tear1 tear'></div>
          <div class='tear2 tear'></div>
          <div class='face'>
            <div class='eyebrow'>︶</div>
            <div class='eyebrow'>︶</div>
            <div class='eye'></div>
            <div class='eye'></div>
            <div class='mouth'></div>
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

// export const mapStateToProps = ({ readingList }) => ({
//   readingList,
// })

// export const mapDispatchToProps = dispatch => (
//   bindActionCreators({
//     setBooks
//   }, dispatch)
// )

// export default connect(mapStateToProps)(ReadingList);

export default ReadingList