import React, { Component } from 'react'
import './Search.css'
import PropTypes from 'prop-types'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: ''
    }
  }

  changeHandler = (event) => {
    this.setState({search: event.target.value})
  }

  searchBookInput = (event) => {
    event.preventDefault()
    this.props.searchBooks(this.state.search)
    this.setState({search: ''})
  }

  render() {
    return (
      <section className='search-container'>
      <input id='search-books-input' aria-label='search' className='search-input' type='search' placeholder='search for title or author' name='search'
        onChange={this.changeHandler}
        value={this.state.search}
      />
      <button className='search-button' onClick={this.searchBookInput}>Search</button>
      </section>
    )
  }
}

Search.propTypes = {
  searchBooks: PropTypes.func
}

export default Search