import React from 'react'
import '@testing-library/jest-dom'
import { screen, render, waitFor, fireEvent } from '@testing-library/react'
import Book from './Book'
import { MemoryRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from '../../reducers';

describe('Book Component', () => {
  it('should render book information',() => {
    const book1 = {
      rank: 1 ,
      primary_isbn10: "1250145236",
      title: "ALL THE DEVILS ARE HERE",
      book_image: "https://s1.nyt.com/du/books/images/9781250145239.jpg",
      author: "Louise Penny"
    }
    const store = createStore(rootReducer);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Book book={book1}/>
        </MemoryRouter>
      </Provider>
    )

    const bookRank = screen.getByText("1", { exact: false })
    // const bookIsbn = screen.getByText("href=/1250145236", {exact: false})
    const bookTitle = screen.getByText("ALL THE DEVILS ARE HERE")
    const bookImg = screen.getByAltText("ALL THE DEVILS ARE HERE", { exact: false })
    const bookAuthor = screen.getByText("Louise Penny")
    const addBookButton = screen.getByRole("button", {name: "Reading List"})

    expect(bookRank).toBeInTheDocument();
    // expect(bookIsbn).toBeInTheDocument();
    expect(bookTitle).toBeInTheDocument();
    expect(bookImg).toBeInTheDocument();
    expect(bookAuthor).toBeInTheDocument();
    expect(addBookButton).toBeInTheDocument();
  })

  it('Reading List button should be able to fire', () => {
    const book1 = {
      rank: 1 ,
      primary_isbn10: "1250145236",
      title: "ALL THE DEVILS ARE HERE",
      book_image: "https://s1.nyt.com/du/books/images/9781250145239.jpg",
      author: "Louise Penny"
    }
    const store = createStore(rootReducer);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Book book={book1}/>
        </MemoryRouter>
      </Provider>
    )
    
    const addBookButton = screen.getByRole("button", {name: "Reading List"})
    fireEvent.click(addBookButton)
  })
})