import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookInfo from './BookInfo.js'
import { MemoryRouter } from 'react-router-dom';



describe('Book Info Component', () => {
  let book;
  beforeEach(() => {
    book = {
      "description": "In a quiet town...",
      "title": "WHERE THE CRAWDADS SING",
      "author": "Delia Owens",
      "book_image": "https://s1.nyt.com/du/books/images/9780735219090.jpg",
      "amazon_product_url": "https://www.amazon.com/Where-Crawdads-Sing-Delia-Owens/dp/0735219095?tag=NYTBS-20",
    }
  })

  it('Should have the correct content when rendered', () => {

    const mockAddBook = jest.fn()

    render(
      <MemoryRouter>
        <BookInfo 
        book={book} 
        addBook={mockAddBook}
        />
      </MemoryRouter>
    )

    const image = screen.getByRole('img', { name: 'WHERE THE CRAWDADS SING' })
    const title = screen.getByRole('heading', { name: 'WHERE THE CRAWDADS SING' });
    const author = screen.getByRole('heading', { name: 'Delia Owens' })
    const description = screen.getByText('In a quiet town...')
    const readButton = screen.getByRole('button', { name: 'Read' })
    const purchaseButton = screen.getByRole('button', { name: 'Purchase' })

    expect(image).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(author).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(readButton).toBeInTheDocument();
    expect(purchaseButton).toBeInTheDocument();
  })

  it('Should fire the correct function when read button is clicked', () => {
    
    const mockAddBook = jest.fn()
    
    render(
      <MemoryRouter>
        <BookInfo
          book={book}
          addBook={mockAddBook}
        />
      </MemoryRouter>
    )

    const readButton = screen.getByRole('button', { name: 'Read' })

    fireEvent.click(readButton)

    expect(mockAddBook).toBeCalledTimes(1);
  })
})
