import configureStore from 'redux-mock-store';
import React from 'react';
import App from './App';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { fetchAllBooks } from '../../API'
import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';
// // const middlewares = [thunk];
jest.mock('../../API');

// const mockStore = configureMockStore(middlewares);
// import ReadingListBook from '../ReadingListBook/ReadingListBook'
// import { readingList } from '../../reducers/ReadingList';
// import { rootReducer } from '../../reducers';
// import { setBooks } from '../../actions'
// import configureMockStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('App Component', () => {
  let fetchedBooks;
  beforeEach(() => {
    fetchedBooks = [
      {
        'rank': 1,
        'description': 'In a quiet town...',
        'title': 'WHERE THE CRAWDADS SING',
        'author': 'Delia Owens',
        'book_image': 'https://s1.nyt.com/du/books/images/9780735219090.jpg',
        'amazon_product_url': 'https://www.amazon.com/Where-Crawdads-Sing-Delia-Owens/dp/0735219095?tag=NYTBS-20',
      },
      {
        'rank': 12,
        'description': 'The 16th book in the Chief Inspector Gamache series.',
        'title': 'ALL THE DEVILS ARE HERE',
        'author': 'Louise Penny',
        'book_image': 'https://s1.nyt.com/du/books/images/9781250145239.jpg',
        'amazon_product_url': 'https://www.amazon.com/dp/1250145236?tag=NYTBSREV-20&tag=NYTBS-20',
      }
    ]

    fetchAllBooks.mockResolvedValue(fetchedBooks);

    const store = mockStore({
      books: fetchedBooks
    })
  
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    )
  })

  it('should render the Book component when app loads', async () => {
    const pageHeading = screen.getByText('Books!')

    const title1 = screen.getByText('WHERE THE CRAWDADS SING')
    const author1 = screen.getByText('by Delia Owens')
    const image1 = screen.getByAltText('WHERE THE CRAWDADS SING')

    const title2 = screen.getByText('ALL THE DEVILS ARE HERE')
    const author2 = screen.getByText('by Louise Penny')
    const image2 = screen.getByAltText('ALL THE DEVILS ARE HERE')

    expect(pageHeading).toBeInTheDocument();
    expect(title1).toBeInTheDocument();
    expect(image1).toBeInTheDocument();
    expect(author1).toBeInTheDocument();
    expect(title2).toBeInTheDocument();
    expect(image2).toBeInTheDocument();
    expect(author2).toBeInTheDocument();
  })

  it('should render the Navigation component when app loads', async () => {

    const homeLink = screen.getByText('HOME')
    const readingListLink = screen.getByText('READING LIST')

    expect(homeLink).toBeInTheDocument();
    expect(readingListLink).toBeInTheDocument();
  })
})


