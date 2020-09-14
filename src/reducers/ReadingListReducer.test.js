import { readingList } from './ReadingList';

describe('ReadingListReducer', () => {
  it('Should return the initial state', () => {
  
    const expected = [];
    const result = readingList(undefined, {});
    expect(result).toEqual(expected)
  })
})
