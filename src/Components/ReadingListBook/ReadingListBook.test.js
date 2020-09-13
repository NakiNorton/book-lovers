import React from 'react';
import { screen, render, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import ReadingListBook from '../ReadingListBook/ReadingListBook'
import { MemoryRouter } from 'react-router-dom';
import { removeFavorite } from '../../actions'

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from '../../reducers';

import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);


describe('ReadingListBook component', () => {
  it('should display the correct content when rendered', () => {
    const store = createStore(rootReducer);

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

    const bookTitle = screen.getByAltText('WHERE THE CRAWDADS SING')
    const removeButton = screen.getByRole('button', {name: 'Remove'})
  
    expect(bookTitle).toBeInTheDocument();
    expect(removeButton).toBeInTheDocument();
  })
})

describe('My Connected React-Redux Component', () => {
  let store;
  
  beforeEach(() => {
    store = mockStore({
      myState: 'sample text',
    });

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

  it('should invoke a function to remove book when button is clicked', () => {
      const removeButton = screen.getByRole('button', { name: 'Remove' })
      fireEvent.click(removeButton)

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    // expect(store.dispatch).toHaveBeenCalledWith(
    //   removeFavorite({ payload: "015489213" })
    //   );
    })
})


  