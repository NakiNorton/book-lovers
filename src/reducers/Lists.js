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
            const newState = {...state};
            newState[action.listName] = action.idNumbers;
            return newState
        default:
            return state
    }
}