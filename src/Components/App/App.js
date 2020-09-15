import React, { Component } from 'react'
import './App.css';
import Books from '../Books/Books'
import Nav from '../Nav/Nav'
import Search from '../Search/Search'
import BookInfo from '../BookInfo/BookInfo'
import ReadingList from '../ReadingList/ReadingList'
import { fetchBooks } from '../../API';
import { connect } from 'react-redux'
import { setBooks, setList, addFavorite } from '../../actions';
import { bindActionCreators } from 'redux';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      lists: {
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
    const allListUrls = Object.keys(this.state.lists)
    try {
      allListUrls.map(async url => {
        const response = await fetchBooks(url);
        setBooks(response.results.books);
        const books = response.results.books;
        return setList(url, books.map(book => book.primary_isbn10));
      })
    }
    catch ({ message }) {
      alert(message)
    }
  }

  filterBooks = (listName) => {
    const listOfIds = this.props.lists[listName]
    const filteredBooks = this.props.books.filter(book => listOfIds.includes(book.primary_isbn10))
    return filteredBooks;
  }

  createBookLists = () => {
    const listUrls = this.props.lists;
    const listsKeys = Object.keys(listUrls);
    const listBooks = listsKeys.map(listName => {
      const filteredBooks = this.filterBooks(listName)
      if(filteredBooks.length > 0) {
        return (
          <Books key={listName} id={listName} listName={listName} filteredBooks={filteredBooks} addBook={this.handleClick} />
        )
      }
    })
    return listBooks
  }

  searchBooks = (search) => {
    let findBooks = this.props.books.filter(book => {
      if (book.title.includes(search) || book.author.includes(search)) {
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
                <h1>Books!</h1>
                <Search searchBooks={this.searchBooks}/>
                <section className="found-book-cards" alt="found-book-cards">
                  { this.state.foundBooks ? 
                    this.state.foundBooks.map(foundBook => {
                      return (
                        <>
                          <h1>{foundBook.title}</h1><h3>{foundBook.author}</h3><h3>Ranking: {foundBook.rank}</h3><img className="Book-card-image" alt="Book cover" src={foundBook.book_image} /> 
                        </>
                      )
                    }) : 
                    <h1>Search For Book by Title or Author</h1>
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
              const bookClicked = books.find((book) => book.primary_isbn10 == parseInt(match.params.bookId))
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
 