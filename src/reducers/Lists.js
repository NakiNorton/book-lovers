export const lists = (state = {}, action) => {
    switch(action.type) {
        case 'SET_LIST':
            console.log(action)
            state[action.listName] = action.idNumbers;
            return state
        default:
            return state
    }
}