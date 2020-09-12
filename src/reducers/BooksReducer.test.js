import { books } from './Books';

describe('BooksReducer', () => {
  it('Should return the initial state', () => {
    // setup
    const expected = [];

    // execution
    const result = books(undefined, {});

    // assertion
    expect(result).toEqual(expected)

  })
})

// https://frontend.turing.io/lessons/module-3/testing-redux.html