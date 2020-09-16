import React from 'react';
import { screen, render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import ReadingListBook from '../ReadingListBook/ReadingListBook'
import { MemoryRouter } from 'react-router-dom';
import { removeFavorite } from '../../actions'
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('ReadingListBook component', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      readingList: [
        {
          'description': 'In a quiet town...',
          'title': 'WHERE THE CRAWDADS SING',
          'author': 'Delia Owens',
          'book_image': 'https://s1.nyt.com/du/books/images/9780735219090.jpg',
          'amazon_product_url': 'https://www.amazon.com/Where-Crawdads-Sing-Delia-Owens/dp/0735219095?tag=NYTBS-20',
        }
      ]
    })

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ReadingListBook
            title={'WHERE THE CRAWDADS SING'}
            image={'https://s1.nyt.com/du/books/images/9780735219090.jpg'}
            id={'015489213'}
            key={'015489213'}
          />
        </MemoryRouter>
      </Provider>
    )
  })

 it('should display the correct content when rendered', () => {
    const bookTitle = screen.getByAltText('WHERE THE CRAWDADS SING')
    const removeButton = screen.getByRole('button', {name: 'Remove'})
  
    expect(bookTitle).toBeInTheDocument();
    expect(removeButton).toBeInTheDocument();
  })

  it('should invoke redux action to remove book from store when button is clicked', () => {
    const id = "015489213"
    const removeButton = screen.getByRole('button', { name: 'Remove' })
    fireEvent.click(removeButton)

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(removeFavorite(id));
  })
})
  