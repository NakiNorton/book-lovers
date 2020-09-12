import * as actions from '../actions';

describe('actions', () => {
  it('should have a type of SET_BOOKS', () => {
    // setup
    const books = [123, 456, 789];
    const expectedAction = {
      type: 'SET_BOOKS',
      books: [123, 456, 789]
    }

    // execution
    const result = actions.setBooks(books);

    // assertion
    expect(result).toEqual(expectedAction);
  });
});

// https://frontend.turing.io/lessons/module-3/testing-redux.html