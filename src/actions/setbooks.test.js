import * as actions from '../actions';

describe('actions', () => {
  it('should have a type of SET_BOOKS', () => {
    const books = [123, 456, 789];
    const expectedAction = {
      type: 'SET_BOOKS',
      books: [123, 456, 789]
    }

    const result = actions.setBooks(books);

    expect(result).toEqual(expectedAction);
  });
});