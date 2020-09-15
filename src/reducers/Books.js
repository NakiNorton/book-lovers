export const books = (state = [], action) => {
    switch(action.type) {
        case 'SET_BOOKS':
            const newState = [...state, ...action.books]
            return newState
        default: 
            return state
    }
}