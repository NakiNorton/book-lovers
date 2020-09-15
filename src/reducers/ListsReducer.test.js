import { lists } from './Lists';

describe('Lists Reducer', () => {
    it('Should return the initial state', () => {
        const expected = {
            'celebrities': [],
            'food-and-fitness': [],
            'hardcover-fiction': [],
            'health': [],
            'games-and-activities': [],
        }

        const result = lists(undefined, {})

        expect(result).toEqual(expected)
    })
})