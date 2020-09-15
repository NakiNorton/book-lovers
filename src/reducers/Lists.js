const initState = {
    'celebrities': [],
    'food-and-fitness': [],
    'hardcover-fiction': [],
    'health': [],
    'games-and-activities': [],
}

export const lists = (state = initState, action) => {
    switch(action.type) {
        case 'SET_LIST':
            state[action.listName] = action.idNumbers;
            return state
        default:
            return state
    }
}