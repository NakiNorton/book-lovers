import React, { Component } from 'react'
import './App.css';
import Books from '../Books/Books'
import Nav from '../Nav/Nav'
import Search from '../Search/Search'
import BookInfo from '../BookInfo/BookInfo'
import ReadingList from '../ReadingList/ReadingList'
import './App.css'
import { fetchBooks } from '../../API';
import { connect } from 'react-redux'
import { setBooks, setList, addFavorite } from '../../actions';
import { bindActionCreators } from 'redux';
import { Route, Switch, Link } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      foundBooks: [],
      listPaths: {
        'celebrities': true,
        'food-and-fitness': true,
        'hardcover-fiction': true,
        'games-and-activities': true,
        'health': true,
      }
    }
  }

  componentDidMount() {
    const { setBooks, setList } = this.props
    const allListUrls = Object.keys(this.state.listPaths)
    try {
      allListUrls.map(async url => {
        const response = await fetchBooks(url);
        const books = response.results.books;
        const newBooks = books.map(book => {
          book.listName = url
          return book
        })
        setBooks(newBooks);
        return setList(url, newBooks.map(book => book.primary_isbn10));
      })
    }
    catch ({ message }) {
      alert(message)
    }
  }

  filterBooks = (listName) => {
    const listOfIds = this.props.lists[listName]
    const filteredBooks = this.props.books.filter(book => {
      return listOfIds.includes(book.primary_isbn10) && book.listName === listName
    })
    return filteredBooks;
  }

  createBookLists = () => {
    const listUrls = this.props.lists;
    const listsKeys = Object.keys(listUrls);
    const listBooks = listsKeys.map(listName => {
      const filteredBooks = this.filterBooks(listName)
      return (
        <Books key={listName} id={listName} listName={listName} filteredBooks={filteredBooks} addBook={this.handleClick}/>
      )
    })
    return listBooks
  }

  searchBooks = (search) => {
    const titleSearch = search.toUpperCase()
    const authorSearch = search.charAt(0).toUpperCase() + search.slice(1).toLowerCase() 
    let findBooks = this.props.books.forEach(book => {
      if (book.title.includes(titleSearch) || book.author.includes(authorSearch)) {
        this.setState({ foundBooks: [book] })
      }
    })
    return findBooks;
  }

  changeButtonStyling(id) {
    const allButtons = document.querySelectorAll('.add-to-reading-list')
    const foundButton = Array.from(allButtons).find(button => button.id === id)
    if (foundButton.classList.contains('active')) {
      foundButton.classList.remove('active')
      foundButton.classList.add('inactive')
    } else if (foundButton.classList.contains('inactive')) {
      foundButton.classList.remove('inactive')
      foundButton.classList.add('active')
    }
  }

  handleClick = (event) => {
    const { addFavorite, readingList, books } = this.props;
    const id = event.target.id;
    const foundBook = books.find(book => book.primary_isbn10 === id);
    const isOnList = readingList.includes(foundBook)

    if (!isOnList) {
      addFavorite(foundBook) 
      this.changeButtonStyling(id)
    } else {
      this.changeButtonStyling(id)
    }
  }

  render() {
    const { readingList, books } = this.props
    return (
      <div className="App">
          <Nav />
          <Switch>
            <Route exact path={'/'} render={() => {
              return (<>
                <h1 className='browse-books'>Browse books</h1>
                <Search searchBooks={this.searchBooks}/>
                <section className="found-book-cards" alt="found-book-cards">
                  { this.state.foundBooks ? 
                    this.state.foundBooks.map(foundBook => {
                      return (
                        <>
                          <h1 className='found-book'>{foundBook.title}</h1>
                          <h3 className='found-book author'>{foundBook.author}</h3>
                          <Link to={`/${foundBook.primary_isbn10}`}>
                            <img className="card-image" alt={foundBook.title} src={foundBook.book_image} />
                          </Link>
                        </>
                      )
                    }) : 
                    <h1 className='search-prompt'>Search For Book by Title or Author</h1>
                  }
                </section>
                {this.createBookLists()}
              </>)
            }}
            />
            <Route exact path='/favorites' render={() =>  
              <ReadingList readingList={readingList} /> 
            } />
            <Route exact path='/:bookId' render={({ match }) => {
              const bookClicked = books.find((book) => book.primary_isbn10 === parseInt(match.params.bookId))
              return <BookInfo book={bookClicked} addBook={this.handleClick} /> }}
            />
          </Switch>
      </div>
    );
  }
}

export const mapStateToProps = ({ books, readingList, lists }) => ({
  books,
  readingList,
  lists
})

export const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setBooks,
    setList,
    addFavorite
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(App);
 