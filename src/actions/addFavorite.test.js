import * as actions from '../actions';

describe('actions', () => {
  it('should have a type of ADD_TO_READING_LIST', () => {

    const book = [{
      'description': 'In a quiet town...',
      'title': 'WHERE THE CRAWDADS SING',
      'author': 'Delia Owens'
    }];
    const expectedAction = {
      type: 'ADD_TO_READING_LIST',
      book: [{
        'description': 'In a quiet town...',
        'title': 'WHERE THE CRAWDADS SING',
        'author': 'Delia Owens'
      }]
    }

    const result = actions.addFavorite(book);

    expect(result).toEqual(expectedAction);
  });
});
