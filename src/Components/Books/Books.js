import React, { Component } from 'react'
import './Books.css'
import {fetchAllBooks} from '../../API'

class Books extends Component {
  constructor() {
    super()
    this.state = {
      books: []
    }
  }

  componentDidMount() {
    fetchAllBooks()
      // .then(data => console.log(data))
      .then(data => this.setState({books: data}))
      .catch(error => alert(error.message))
  }

  render() {
    return (
      <section>Books!</section>
    )
  }
}

export default Books;