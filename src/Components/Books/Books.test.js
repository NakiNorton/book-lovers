import React from 'react';
import Books from './Books.js'
import { screen, render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { rootReducer } from '../../reducers/index';
import { Provider } from 'react-redux'
jest.mock('../../API');
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Books Component', () => {
  let fetchedBooks;
  beforeEach(() => {
    fetchedBooks = [
      {
      title: "WHERE THE CRAWDADS SING"
      },
      {
      title: "ALL THE DEVILS ARE HERE"
      },
      {
      title: "TRANSCENDENT KINGDOM"
      }
    ]
  })

  it('Should render book cards', async () => {
    // const store = createStore(rootReducer);
    const store = mockStore({
      books: fetchedBooks
    }

    );

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Books />
        </MemoryRouter>
      </Provider>
    )

    const title1 = await waitFor(() => screen.getByRole('heading', { name: 'WHERE THE CRAWDADS SING' }));
    const title2 = await waitFor(() => screen.getByRole('heading', { name: 'ALL THE DEVILS ARE HERE' }));
    const title3 = await waitFor(() => screen.getByRole('heading', { name: 'TRANSCENDENT KINGDOM' }));
    const readButton = screen.getAllByRole('button', { name: 'Read' })

    expect(title1).toBeInTheDocument();
    expect(title2).toBeInTheDocument();
    expect(title3).toBeInTheDocument();
    expect(readButton).toHaveLength(3);
  })
})
