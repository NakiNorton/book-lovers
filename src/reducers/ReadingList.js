export const readingList = (state = [], action) => {
  console.log('state:', state)
  console.log('action:', action)
  switch (action.type) {
    case 'SET_READING_LIST':
      
      return { ...state, readingList: action.readingList }


    default:
      return state
  }
}