export const readingList = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TO_READING_LIST':
      console.log(action.readingList)
      return ( [...state, action.book] )
    case 'REMOVE_FROM_READING_LIST':
      const newReadingList = state.filter(book => {
        return action.id !==book.primary_isbn10
      })
      return newReadingList
    default:
      return state
  }
}