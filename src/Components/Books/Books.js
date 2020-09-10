import React, { Component } from 'react'
import './Books.css'
import {fetchAllBooks} from '../../API'
import Book from '../Book/Book'

class Books extends Component {
  constructor() {
    super()
    this.state = {
      books: [],
      toReadList: [],
    }
  }

  componentDidMount() {
    fetchAllBooks()
      .then(data => {
        console.log(data)
        this.setState({books: data.results.books})
      })
      .catch(error => alert(error.message))
  }

  changeButtonStyling(id) {
    const allButtons = document.querySelectorAll('.reading-list-button')
    const foundButton = Array.from(allButtons).find(button => button.id === id)
    if(foundButton.classList.contains('active')) {
      foundButton.classList.remove('active')
      foundButton.classList.add('inactive')
    } else if (foundButton.classList.contains('inactive')) {
      foundButton.classList.remove('inactive')
      foundButton.classList.add('active')
    }
  }

  handleClick = (event) => {
    const id = event.target.id;
    const foundBook = this.state.books.find(book => book.primary_isbn10 === id);
    const isOnList = this.state.toReadList.includes(foundBook)

    if(!isOnList) {
      this.setState( { toReadList: [...this.state.toReadList, foundBook] } )
      this.changeButtonStyling(id)
    } else {
      const newList = this.state.toReadList.filter(book => book !== foundBook)
      this.setState( { toReadList: newList } )
      this.changeButtonStyling(id)
    }
  }

  displayBooks() {
    return this.state.books.map(book => { 
      return <Book book={book} addBook={this.handleClick}/>
    })
  }

  render() {
    let bookCards = this.displayBooks()
    return (
      
      <section>
        <h1>Books!</h1>
        <div className="books-container">{this.state.books && bookCards}</div>
      </section>
    )
  }
}

export default Books;