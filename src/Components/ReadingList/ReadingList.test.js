import React from 'react';
import { screen, render } from '@testing-library/react';
import ReadingList from '../ReadingList/ReadingList'
import { MemoryRouter } from 'react-router-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from '../../reducers';

describe('ReadingList component', () => {
  let readingList;
  beforeEach(() => {
    readingList = [
      {
        'description': 'In a quiet town...',
        'title': 'WHERE THE CRAWDADS SING',
        'author': 'Delia Owens',
        'book_image': 'https://s1.nyt.com/du/books/images/9780735219090.jpg',
        'amazon_product_url': 'https://www.amazon.com/Where-Crawdads-Sing-Delia-Owens/dp/0735219095?tag=NYTBS-20',
      }
    ]
  })

  it('should display the correct content when rendered', () => {
    const store = createStore(rootReducer);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ReadingList toReadList={readingList} />
        </MemoryRouter>
      </Provider>
    )
    
    const pageHeading = screen.getByText('My Library') 
    expect(pageHeading).toBeInTheDocument();
  })

  it('should display books saved to the reading list', () => {
    const store = createStore(rootReducer);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ReadingList toReadList={readingList} />
        </MemoryRouter>
      </Provider>
    )

    const bookTitle = screen.getByAltText('WHERE THE CRAWDADS SING')
    expect(bookTitle).toBeInTheDocument();
  })
})

describe('ReadingList component', () => {
  it('should display a message if there are no books to display', () => {
    const store = createStore(rootReducer);
    const readingList = [];

    render(
      <Provider store = { store } >
        <MemoryRouter>
          <ReadingList toReadList={readingList} />
        </MemoryRouter>
      </Provider>
    )

    const message = screen.getByText('You haven\'t added any books to your reading list yet.')
    expect(message).toBeInTheDocument();
  })
})