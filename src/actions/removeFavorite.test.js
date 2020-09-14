import * as actions from '../actions';

describe('actions', () => {
  it('should have a type of REMOVE_FROM_READING_LIST', () => {

    const id = '015489213';

    const expectedAction = {
      type: 'REMOVE_FROM_READING_LIST',
      id: id
    }

    const result = actions.removeFavorite(id);

    expect(result).toEqual(expectedAction);
  });
});