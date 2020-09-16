import React from 'react';
import { screen, render } from '@testing-library/react';
import ReadingList from '../ReadingList/ReadingList'
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from '../../reducers';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('ReadingList component', () => {
  it('should display the page heading', () => {
    const store = createStore(rootReducer);
    
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ReadingList />
        </MemoryRouter>
      </Provider>
    )
    
    const pageHeading = screen.getByText('My Library') 
    expect(pageHeading).toBeInTheDocument();
  })

  it('should render books saved to the reading list', () => {
    let store = mockStore({
      readingList: [
        {
          'description': 'In a quiet town...',
          'title': 'WHERE THE CRAWDADS SING',
          'author': 'Delia Owens',
          'book_image': 'https://s1.nyt.com/du/books/images/9780735219090.jpg',
          'amazon_product_url': 'https://www.amazon.com/Where-Crawdads-Sing-Delia-Owens/dp/0735219095?tag=NYTBS-20',
        }
      ]})
 
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ReadingList />
        </MemoryRouter>
      </Provider>
    )

    const bookCoverImg = screen.getByAltText('WHERE THE CRAWDADS SING')
    expect(bookCoverImg).toBeInTheDocument();
  })
})

describe('ReadingList component', () => {
  it('should display a message if there are no books to display', () => {
    const store = createStore(rootReducer);
   
    render(
      <Provider store = { store } >
        <MemoryRouter>
          <ReadingList />
        </MemoryRouter>
      </Provider>
    )

    const message = screen.getByText('You haven\'t added any books to your reading list yet.')
    const animation = screen.getByLabelText('animation of crying face')
    expect(message).toBeInTheDocument();
    expect(animation).toBeInTheDocument();
  })
})