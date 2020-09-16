import configureStore from 'redux-mock-store';
import React from 'react';
import App from './App';
import { screen, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
// import { setBooks, setList } from '../../actions'
import { fetchBooks } from '../../API'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
const middlewares = [thunk];
jest.mock('../../API');

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
   
    fetchBooks.mockResolvedValue(fetchedBooks);
    
    const store = mockStore({
      books: fetchedBooks,
      readingList: [],
      lists: {
        'hardcover-fiction': 
        [
          '1234567890', 
          '1357924680', 
          '0246813579'
        ],
        'health':
          [
            '123456789780',
            '1357924680',
            '0246813579'
          ]
      }
    })

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    )
  })

  it.skip('should render the Book component when app loads', async () => {
    
    const pageHeading = screen.getByText('Browse books')

    const title1 = await waitFor(() => screen.getByText('WHERE THE CRAWDADS SING'))
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

  it('should render the Navigation component when app loads', () => {

    const homeLink = screen.getByText('HOME')
    const readingListLink = screen.getByText('READING LIST')

    expect(homeLink).toBeInTheDocument();
    expect(readingListLink).toBeInTheDocument();
  })
})


