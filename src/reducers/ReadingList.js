export const readingList = (state = [], action) => {
  console.log('state 1:', state)
  console.log('action:', action)
  switch (action.type) {
    case 'SET_READING_LIST':
      
      return ( [...state, action.readingList] )


    default:
      return state
  }
}