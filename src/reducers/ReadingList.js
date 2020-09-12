export const readingList = (state = [], action) => {
  switch (action.type) {
    case 'SET_READING_LIST':
      return ( [...state, action.readingList] )
    default:
      return state
  }
}