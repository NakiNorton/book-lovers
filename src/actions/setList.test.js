import * as actions from '../actions';

describe('actions', () => {
  it('should have a type of SET_LIST', () => {
      const listName = 'hardcover-fiction';
      const idNumbers = ['1234567890', '1357924680', '0246813579'];
      const expectedAction = {
          type: 'SET_LIST',
            listName: 'hardcover-fiction',
            idNumbers: ['1234567890', '1357924680', '0246813579']
      }

      const result = actions.setList(listName, idNumbers)

      expect(result).toEqual(expectedAction)
  }) 
})